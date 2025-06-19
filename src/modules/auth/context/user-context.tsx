import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../types/user";
import { Response } from "./types";
import { API_BASE_URL } from "../../../settings";
import { POST } from "../../../shared/api/post";

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
  refetchLogin: (email: string, password: string) => Promise<IUser | null>;
  refetchLogout: () => Promise<void>;
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
  refetchLogin: async () => null,
  refetchLogout: async () => {},
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

  async function getData(token: string): Promise<IUser | null> {
    try {
      const response = await fetch("http://192.168.1.104:3000/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          // "Cache-Control": "no-cache",
        },
      });
      const result: Response<IUser> = await response.json();
      if (result.status === "error") {
        throw new Error(result.message);
      }
      setUser(result.data);
      await AsyncStorage.setItem("user", JSON.stringify(result.data));
      return result.data;
    } catch (error) {
      console.error("[getData] Error:", error);
      return null;
    }
  }

  async function login(email: string, password: string) {
    try {
      const response = await fetch("http://192.168.1.104:3000/user/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Cache-Control": "no-cache",
        },
        body: JSON.stringify({ email, password }),
      });
      const result: Response<string> = await response.json();
      if (result.status === "error") {
        throw new Error(result.message);
      }
      await AsyncStorage.setItem("token", result.data);
      await getData(result.data);
    } catch (error) {
      console.error("[login] Error:", error);
    }
  }

  async function register(
    email: string,
    password: string,
    code: string,
    name: string,
    surname: string,
    username: string,
    // image: string
  ) {
    try {
      const response = await fetch("http://192.168.1.104:3000/user/reg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Cache-Control": "no-cache",
        },
        body: JSON.stringify({ email, password, code, name, surname, username }),
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
            images: user?.image,
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
      console.error("Registration error:", error);
    }
  }

  async function logout() {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const response = await fetch("http://192.168.1.104:3000/user/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (result.status === "error") {
          console.error("[logout] Server error:", result.message);
        }
      }
      // Clear all session-related data
      await AsyncStorage.multiRemove(["token", "user"]);
      setUser(null);
    } catch (error) {
      console.error("[logout] Error:", error);
      throw error;
    }
  }

  async function refetchLogin(email: string, password: string): Promise<IUser | null> {
    try {
      await AsyncStorage.multiRemove(["token", "user"]); 
      const response = await fetch("http://192.168.1.104:3000/user/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "Cache-Control": "no-cache",
        },
        body: JSON.stringify({ email, password }),
      });
      const result: Response<string> = await response.json();
      if (result.status === "error") {
        throw new Error(result.message);
      }
      await AsyncStorage.setItem("token", result.data);
      return await getData(result.data);
    } catch (error) {
      console.error("[refetchLogin] Error:", error);
      throw error;
    }
  }

  async function refetchLogout(): Promise<void> {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        await fetch("http://192.168.1.104:3000/user/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // "Cache-Control": "no-cache",
          },
        });
      }
      await AsyncStorage.multiRemove(["token", "user"]);
      setUser(null);
    } catch (error) {
      console.error(error)

    }
  }

  async function updateUser(updatedUser: IUser) {
    try {
      setUser(updatedUser);
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("[updateUser] Error:", error);
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
      console.error("[refreshUser] Error:", error);
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
        refetchLogin,
        refetchLogout,
      }}
    >
      {children}
    </userContext.Provider>
  );
}