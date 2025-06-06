import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from "react";
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
    username: string
  ) => Promise<void>;
  isAuthenticated: () => boolean;
  updateUser: (updatedUser: IUser) => void;
  setShowWelcomeModal: (value: boolean) => void;
  showWelcomeModal: boolean;
}

const initialValue: IUserContext = {
  user: null,
  login: (email: string, password: string) => {},
  register: async (
    email: string,
    password: string,
    code: string,
    name: string,
    surname: string,
    username: string
  ) => {},
  isAuthenticated: () => false,
  updateUser: (updatedUser: IUser) => {},
  setShowWelcomeModal: (value: boolean) => {},
  showWelcomeModal: false,
};

const userContext = createContext<IUserContext>(initialValue);

export function useUserContext() {
  return useContext(userContext);
}

interface IUserContextProviderProps {
  children?: ReactNode;
}

export function UserContextProvider(props: IUserContextProviderProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const updateUser = (updatedUser: IUser) => {
    setUser(updatedUser);
  };

  async function getData(token: string) {
    try {
      const response = await fetch("http://192.168.1.104:3000/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const result: Response<IUser> = await response.json();
      console.log(result);
      if (result.status === "error") {
        console.log(result.message);
        return;
      }

      console.log(result.data);
      setUser(result.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  async function login(email: string, password: string) {
    try {
      const response = await fetch("http://192.168.1.104:3000/user/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });
      const result: Response<string> = await response.json();
      console.log(result);

      if (result.status === "error") {
        console.log(result.message);
        return;
      }
      getData(result.data);
      AsyncStorage.setItem("token", result.data);
      // Сохраняем учетные данные для refetchLogin
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userPassword", password);
    } catch (error) {
      console.error("Login error:", error);
    }
  }

  async function register(
    email: string,
    password: string,
    code: string,
    name: string,
    surname: string,
    username: string,
  ) {
    try {
      console.log("111111");
      const response = await fetch("http://192.168.1.104:3000/user/reg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          code: code,
          name: name,
          surname: surname,
          username: username,
        }),
      });

      const result: Response<string> = await response.json();
      if (result.status === "error") {
        console.log(result.message);
        return;
      }
      getData(result.data);
      AsyncStorage.setItem("token", result.data);
      // Сохраняем учетные данные для refetchRegister
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userPassword", password);
      await AsyncStorage.setItem("userCode", code);
      await AsyncStorage.setItem("userName", name);
      await AsyncStorage.setItem("userSurname", surname);
      await AsyncStorage.setItem("userUsername", username);

      try {
        const create_start_album = await POST({
          endpoint: `${API_BASE_URL}/albums/create`,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${result.data}`,
          },
          token: await result.data,
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

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        return;
      }
      getData(token);
    };
    checkToken();
  }, []);

  function isAuthenticated() {
    return user !== null;
  }

  const refetchLogin = useCallback(async (email: string, password: string) => {
    console.log("[refetchLogin] Инициализация повторного входа пользователя");
    try {
      const response = await fetch(`http://192.168.1.104:3000/user/log?timestamp=${Date.now()}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const result: Response<string> = await response.json();
      console.log("[refetchLogin] Результат входа:", result);

      if (result.status === "error") {
        console.log("[refetchLogin] Ошибка сервера:", result.message);
        throw new Error(result.message);
      }
      await getData(result.data);
      await AsyncStorage.setItem("token", result.data);
      await AsyncStorage.setItem("userEmail", email);
      await AsyncStorage.setItem("userPassword", password);
      console.log("[refetchLogin] Токен и учетные данные сохранены, данные пользователя обновлены");
    } catch (error) {
      console.error("[refetchLogin] Ошибка при повторном входе:", error);
      throw error;
    }
  }, []);

  const refetchRegister = useCallback(
    async (
      email: string,
      password: string,
      code: string,
      name: string,
      surname: string,
      username: string
    ) => {
      console.log("[refetchRegister] Инициализация повторной регистрации");
      try {
        const response = await fetch(`http://192.168.1.104:3000/user/reg?timestamp=${Date.now()}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
            code,
            name,
            surname,
            username,
          }),
        });

        const result: Response<string> = await response.json();
        console.log("[refetchRegister] Результат регистрации:", result);

        if (result.status === "error") {
          console.log("[refetchRegister] Ошибка сервера:", result.message);
          throw new Error(result.message);
        }
        await getData(result.data);
        await AsyncStorage.setItem("token", result.data);
        await AsyncStorage.setItem("userEmail", email);
        await AsyncStorage.setItem("userPassword", password);
        await AsyncStorage.setItem("userCode", code);
        await AsyncStorage.setItem("userName", name);
        await AsyncStorage.setItem("userSurname", surname);
        await AsyncStorage.setItem("userUsername", username);

        try {
          console.log("[refetchRegister] Создание стартового альбома");
          const create_start_album = await POST({
            endpoint: `${API_BASE_URL}/albums/create`,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${result.data}`,
            },
            token: result.data,
            body: {
              name: "Мої фото",
              images: user?.image || [],
            },
          });

          if (create_start_album.status === "error") {
            console.log("[refetchRegister] Ошибка создания альбома:", create_start_album.message);
            return;
          }
          console.log("[refetchRegister] Стартовый альбом создан");
        } catch (err) {
          console.log("[refetchRegister] Ошибка при создании альбома:", err);
        }
      } catch (error) {
        console.error("[refetchRegister] Ошибка при повторной регистрации:", error);
        throw error;
      }
    },
    [user?.image]
  );

  const logout = useCallback(async () => {
    console.log("[logout] Инициализация выхода пользователя");
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userEmail");
      await AsyncStorage.removeItem("userPassword");
      await AsyncStorage.removeItem("userCode");
      await AsyncStorage.removeItem("userName");
      await AsyncStorage.removeItem("userSurname");
      await AsyncStorage.removeItem("userUsername");
      setUser(null);
      console.log("[logout] Токен и учетные данные удалены, пользователь сброшен");
    } catch (error) {
      console.error("[logout] Ошибка при выходе:", error);
      throw error;
    }
  }, []);

  const refetchLogout = useCallback(async () => {
    console.log("[refetchLogout] Инициализация повторного выхода пользователя");
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userEmail");
      await AsyncStorage.removeItem("userPassword");
      await AsyncStorage.removeItem("userCode");
      await AsyncStorage.removeItem("userName");
      await AsyncStorage.removeItem("userSurname");
      await AsyncStorage.removeItem("userUsername");
      setUser(null);
      console.log("[refetchLogout] Токен и учетные данные удалены, пользователь сброшен");
    } catch (error) {
      console.error("[refetchLogout] Ошибка при повторном выходе:", error);
      throw error;
    }
  }, []);

  return (
    <userContext.Provider
      value={{
        user,
        login,
        register,
        isAuthenticated,
        updateUser,
        showWelcomeModal,
        setShowWelcomeModal,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
}