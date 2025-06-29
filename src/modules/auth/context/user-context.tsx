import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../types/user";
import { Response } from "./types";
import { API_BASE_URL } from "../../../settings";
import { POST } from "../../../shared/api/post";
import { useRouter } from "expo-router";

interface IUserContext {
  user: IUser | null;
  login: (email: string, password: string) => void;
  register: (
    email: string,
    password: string,
    code: string,
    name: string,
    surname: string,
    username: string,
  ) => void;
  isAuthenticated: () => boolean;
  updateUser: (updatedUser: IUser) => void;
  refreshUser: () => void;
  setShowWelcomeModal: (value: boolean) => void;
  showWelcomeModal: boolean;
  logout: () => void;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  // refetchLogin: (email: string, password: string) => Promise<IUser | null>;
}

const initialValue: IUserContext = {
  user: null,
  login: async () => { },
  register: async () => { },
  isAuthenticated: () => false,
  updateUser: async () => { },
  refreshUser: async () => { },
  setShowWelcomeModal: () => { },
  showWelcomeModal: false,
  logout: async () => { },
  setUser: () => {},
  // refetchLogin: async () => null,
};

const userContext = createContext<IUserContext>(initialValue);

export function useUserContext() {
  return useContext(userContext);
}

interface IUserContextProviderProps {
  children?: ReactNode;
}

export function UserContextProvider({ children }: IUserContextProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const router = useRouter()

  async function getData(token: string): Promise<IUser | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/user/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Cache-Control": "no-cache",
        },
      });
      const result: Response<IUser> = await response.json();
      console.log(result)
      if (result.status === "error") {
        throw new Error(result.message);
      }
      setUser(result.data);
      
      await AsyncStorage.setItem("user", JSON.stringify(result.data));
      return result.data;
    } catch (error) {
      router.push({
        pathname: "/registration/step-one"
      })
      return null;
    }
  }

  async function login(username: string, password: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/log`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Cache-Control": "no-cache",
        },
        body: JSON.stringify({ username, password }),
      });
      const result: Response<string> = await response.json();
      if (result.status === "error") {
        throw new Error(result.message);
      }
      console.log(result.data)
      await AsyncStorage.setItem("token", result.data);
      await getData(result.data);
    } catch (error) {
      // console.log("[login] Error:", error);
    }
  }


  async function register(
    email: string,
    password: string,
    code: string,
    first_name: string,
    last_name: string,
    username: string,
    // image: string
  ) {
    try {
      const response = await fetch(`${API_BASE_URL}/user/reg`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Cache-Control": "no-cache",
        },
        body: JSON.stringify({ email, password, code, first_name, last_name, username }),
      });
      const result: Response<string> = await response.json();
      if (result.status === "error") {
        throw new Error(result.message);
      }
      AsyncStorage.setItem("token", result.data);
      getData(result.data);

      try {
        const create_start_album = await POST({
          endpoint: `${API_BASE_URL}/albums/create`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${result.data}`,
          },
          token: result.data,
          body: {
            name: "Мої фото",
            topic: "#моїфото",
            created_at: new Date,
            preview_image: "uploads/user.png",
            shown: true,
            autor_id: user?.id,
            images: [{
              image: {
                filename: "uploads/user.png",
                file: "uploads/user.png"
              }
            }],
          },
        });

        if (create_start_album.status === "error") {
          console.log(create_start_album.message + " CREATED!");
          return;
        }
      } catch (err) {
        console.log(err);
      }
    } catch (error) {
      console.log("Registration error:", error);
    }
  }

  async function logout() {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const response = await fetch(`${API_BASE_URL}/user/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (result.status === "error") {
          console.log("[logout] Server error:", result.message);
        }
      }

      await AsyncStorage.multiRemove(["token", "user"]);
      setUser(null);
    } catch (error) {
      console.log("[logout] Error:", error);
      throw error;
    }
  }

  async function updateUser(updatedUser: IUser) {
    try {
      setUser(updatedUser);
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.log("[updateUser] Error:", error);
    }
  }

  async function refreshUser() {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        await getData(token);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log("[refreshUser] Error:", error);
    }
  }

  function isAuthenticated() {
    return !!user;
  }

  useEffect(() => {
    async function checkToken() {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        await getData(token);
      } else {
        router.push({
          pathname: "/registration/step-one"
        })
      }
    }
    checkToken();
  }, []);

  return (
    <userContext.Provider
      value={{
        user,
        login,
        register,
        isAuthenticated,
        updateUser,
        refreshUser,
        showWelcomeModal,
        setShowWelcomeModal,
        logout,
        setUser,
        // refetchLogin,

      }}
    >
      {children}
    </userContext.Provider>
  );
}