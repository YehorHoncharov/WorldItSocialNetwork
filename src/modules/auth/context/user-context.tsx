// import { createContext, useContext, ReactNode, useState, useEffect, useCallback } from "react";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { IUser } from "../types/user";
// import { Response } from "./types";
// import { API_BASE_URL } from "../../../settings";
// import { POST } from "../../../shared/api/post";

// interface IUserContext {
//   user: IUser | null;
//   login: (email: string, password: string) => Promise<void>;
//   register: (
//     email: string,
//     password: string,
//     code: string,
//     name: string,
//     surname: string,
//     username: string,
//     image: string
//   ) => Promise<void>;
//   isAuthenticated: () => boolean;
//   updateUser: (updatedUser: IUser) => void;
//   refreshUser: () => Promise<void>;
//   setShowWelcomeModal: (value: boolean) => void;
//   showWelcomeModal: boolean;
//   logout: () => Promise<void>;
// }

// const initialValue: IUserContext = {
//   user: null,
//   login: async () => {},
//   register: async () => {},
//   isAuthenticated: () => false,
//   updateUser: () => {},
//   refreshUser: async () => {},
//   setShowWelcomeModal: () => {},
//   showWelcomeModal: false,
//   logout: async () => {},
// };

// const userContext = createContext<IUserContext>(initialValue);

// export function useUserContext() {
//   return useContext(userContext);
// }

// interface IUserContextProviderProps {
//   children?: ReactNode;
// }

// export function UserContextProvider(props: IUserContextProviderProps) {
//   const [user, setUser] = useState<IUser | null>(null);
//   const [showWelcomeModal, setShowWelcomeModal] = useState(false);

//   const getData = useCallback(async (token: string): Promise<IUser | null> => {
//     try {
//       const response = await fetch("http://192.168.1.104:3000/user/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const result: Response<IUser> = await response.json();
//       if (result.status === "error") {
//         console.error("[getData] Error:", result.message);
//         throw new Error(result.message);
//       }
//       setUser(result.data);
//       await AsyncStorage.setItem("user", JSON.stringify(result.data));
//       return result.data;
//     } catch (error) {
//       console.error("[getData] Error fetching user data:", error);
//       throw error;
//     }
//   }, []);

//   const refreshUser = useCallback(async () => {
//     const token = await AsyncStorage.getItem("token");
//     if (token) {
//       await getData(token);
//     } else {
//       setUser(null);
//     }
//   }, [getData]);

//   const login = useCallback(
//     async (email: string, password: string) => {
//       try {
//         const response = await fetch("http://192.168.1.104:3000/user/log", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password }),
//         });
//         const result: Response<string> = await response.json();
//         if (result.status === "error") {
//           console.error("[login] Error:", result.message);
//           throw new Error(result.message);
//         }
//         await AsyncStorage.setItem("token", result.data);
//         await getData(result.data);
//       } catch (error) {
//         console.error("[login] Error:", error);
//         throw error;
//       }
//     },
//     [getData]
//   );

//   const register = useCallback(
//     async (
//       email: string,
//       password: string,
//       code: string,
//       name: string,
//       surname: string,
//       username: string,
//       image: string
//     ) => {
//       try {
//         const response = await fetch("http://192.168.1.104:3000/user/reg", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             email,
//             password,
//             code,
//             name,
//             surname,
//             username,
//             image,
//           }),
//         });
//         const result: Response<string> = await response.json();
//         if (result.status === "error") {
//           console.error("[register] Error:", result.message);
//           throw new Error(result.message);
//         }
//         await AsyncStorage.setItem("token", result.data);
//         await getData(result.data);

//         try {
//           const create_start_album = await POST({
//             endpoint: `${API_BASE_URL}/albums/create`,
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${result.data}`,
//             },
//             token: result.data,
//             body: {
//               name: "Мої фото",
//               images: image ? [image] : [],
//             },
//           });
//           if (create_start_album.status === "error") {
//             console.error("[register] Album creation error:", create_start_album.message);
//           }
//         } catch (error) {
//           console.error("[register] Error creating album:", error);
//         }
//       } catch (error) {
//         console.error("[register] Registration error:", error);
//         throw error;
//       }
//     },
//     []
//   );

//   const logout = useCallback(async () => {
//     try {
//       const token = await AsyncStorage.getItem("token");
//       if (token) {
//         try {
//           const response = await fetch("http://192.168.1.104:3000/user/logout", {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           });
//           const result: Response<any> = await response.json();
//           if (result.status === "error") {
//             console.error("[logout] Server logout error:", result.message);
//           }
//         } catch (error) {
//           console.error("[logout] Server logout error:", error);
//         }
//       }
//       await AsyncStorage.multiRemove(["token", "user"]);
//       setUser(null);
//     } catch (error) {
//       console.error("[logout] Error during logout:", error);
//       throw error;
//     }
//   }, []);

//   const isAuthenticated = useCallback(() => !!user, [user]);

//   const refetchLogin = useCallback(
//     async (email: string, password: string) => {
//       try {
//         const response = await fetch("http://192.168.1.104:3000/user/log", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ email, password }),
//         });
//         const result: Response<string> = await response.json();
//         if (result.status === "error") {
//           console.error("[refetchLogin] Server error:", result.message);
//           throw new Error(result.message);
//         }
//         await AsyncStorage.setItem("token", result.data);
//         await getData(result.data);
//       } catch (error) {
//         console.error("[refetchLogin] Error:", error);
//         throw error;
//       }
//     },
//     [getData]
//   );

//   const refetchRegister = useCallback(
//     async (
//       email: string,
//       password: string,
//       code: string,
//       name: string,
//       surname: string,
//       username: string
//     ) => {
//       try {
//         const response = await fetch("http://192.168.1.104:3000/user/reg", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             email,
//             password,
//             code,
//             name,
//             surname,
//             username,
//           }),
//         });
//         const result: Response<string> = await response.json();
//         if (result.status === "error") {
//           console.error("[refetchRegister] Server error:", result.message);
//           throw new Error(result.message);
//         }
//         await AsyncStorage.setItem("token", result.data);
//         await getData(result.data);

//         try {
//           const create_start_album = await POST({
//             endpoint: `${API_BASE_URL}/albums/create`,
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${result.data}`,
//             },
//             token: result.data,
//             body: {
//               name: "Мої фото",
//               images: user?.image || [],
//             },
//           });
//           if (create_start_album.status === "error") {
//             console.error("[refetchRegister] Album creation error:", create_start_album.message);
//           }
//         } catch (error) {
//           console.error("[refetchRegister] Error creating album:", error);
//         }
//       } catch (error) {
//         console.error("[refetchRegister] Error:", error);
//       }
//     },
//     [user?.image]
//   );

//   const updateUser = useCallback((updatedUser: IUser) => {
//     setUser(updatedUser);
//     AsyncStorage.setItem("user", JSON.stringify(updatedUser));
//   }, []);

//   useEffect(() => {
//     const checkToken = async () => {
//       const token = await AsyncStorage.getItem("token");
//       if (token) {
//         await getData(token);
//       }
//     };
//     checkToken();
//   }, [getData]);

//   return (
//     <userContext.Provider
//       value={{
//         user,
//         login,
//         register,
//         isAuthenticated,
//         updateUser,
//         refreshUser,
//         showWelcomeModal,
//         setShowWelcomeModal,
//         logout,
//       }}
//     >
//       {props.children}
//     </userContext.Provider>
//   );
// }

import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../types/user";
import { Response } from "./types";
import { API_BASE_URL } from "../../../settings";
import { POST } from "../../../shared/api/post";

interface IUserContext {
  user: IUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    code: string,
    name: string,
    surname: string,
    username: string,
    image: string
  ) => Promise<void>;
  isAuthenticated: () => boolean;
  updateUser: (updatedUser: IUser) => Promise<void>;
  refreshUser: () => Promise<void>;
  setShowWelcomeModal: (value: boolean) => void;
  showWelcomeModal: boolean;
  logout: () => Promise<void>;
  refetchLogin: (email: string, password: string) => Promise<IUser | null>;
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
          "Cache-Control": "no-cache",
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
          "Cache-Control": "no-cache",
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
      throw error;
    }
  }

  async function register(
    email: string,
    password: string,
    code: string,
    name: string,
    surname: string,
    username: string,
    image: string
  ) {
    try {
      const response = await fetch("http://192.168.1.104:3000/user/reg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify({ email, password, code, name, surname, username, image }),
      });
      const result: Response<string> = await response.json();
      if (result.status === "error") {
        throw new Error(result.message);
      }
      await AsyncStorage.setItem("token", result.data);
      await getData(result.data);

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

  async function logout() {
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const response = await fetch("http://192.168.1.104:3000/user/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result: Response<any> = await response.json();
        if (result.status === "error") {
          console.error("[logout] Server error:", result.message);
        }
      }
      await AsyncStorage.multiRemove(["token", "user"]);
      setUser(null);
    } catch (error) {
      console.error("[logout] Error:", error);
      throw error;
    }
  }

  async function refetchLogin(email: string, password: string): Promise<IUser | null> {
    try {
      await AsyncStorage.removeItem("token");
      const response = await fetch(`http://192.168.1.104:3000/user/log?timestamp=${Date.now()}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "X-Unique-Request": `${Date.now()}`,
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

  async function updateUser(updatedUser: IUser) {
    try {
      setUser(updatedUser);
      await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      console.error("[updateUser] Error:", error);
      throw error;
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
      }}
    >
      {children}
    </userContext.Provider>
  );
}