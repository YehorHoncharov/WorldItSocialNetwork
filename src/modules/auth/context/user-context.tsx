import { createContext, useContext, ReactNode, useState } from "react";
import { useEffect } from "react";
import { IUser } from "../types/user";
import { Response } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

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
	) => void;
	isAuthenticated: () => boolean;
	updateUser: (updatedUser: IUser) => void;
	setShowWelcomeModal: (value: boolean) => void,
	showWelcomeModal: boolean | undefined; 

}

const initialValue: IUserContext = {
	user: null,
	login: (email: string, password: string) => {},
	register: (
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
	showWelcomeModal: undefined 
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
			console.log(result)
			if (result.status === "error") {
				console.log(result.message);
				return;
			}

			console.log(result.data)
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
		username: string
	) {
		try {
			console.log("111111")
			const response = await fetch("http://192.168.1.104:3000/user/reg", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email,
					password: password,
					code: code,
					name: name,
					surname: surname,
					username: username
				}),
			});

			const result: Response<string> = await response.json();
			if (result.status === "error") {
				console.log(result.message);
				return;
			}
			getData(result.data);
			AsyncStorage.setItem("token", result.data);
		} catch (error) {
			console.error("Registration error:", error);
		}
	}

	useEffect(() => {
		const checkToken = async () => {
			// const tokenDel = await AsyncStorage.removeItem("token");
			const token = await AsyncStorage.getItem("token");
			if (!token) {
				return;
			}
			getData(token);
			// router.navigate({ pathname: "/registration/step-one" });
		};
		checkToken();
	}, []);

	function isAuthenticated() {
		return user !== null;
	}

	return (
		<userContext.Provider
			value={{
				user: user,
				login: login,
				register: register,
				isAuthenticated: isAuthenticated,
				updateUser: updateUser,
				showWelcomeModal, 
      			setShowWelcomeModal
			}}
		>
			{props.children}
		</userContext.Provider>
	);
}


// import { createContext, useContext, ReactNode, useState, useCallback } from "react";
// import { useEffect } from "react";
// import { IUser } from "../types/user";
// import { Response } from "./types";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { router } from "expo-router";

// interface IUserContext {
// 	user: IUser | null;
// 	login: (email: string, password: string) => void;
// 	register: (
// 		email: string,
// 		password: string,
// 		code: string,
// 		name: string,
// 		surname: string,
// 		username: string
// 	) => void;
// 	isAuthenticated: () => boolean;
// 	updateUser: (updatedUser: IUser) => void;
// 	setShowWelcomeModal: (value: boolean) => void,
// 	showWelcomeModal: boolean | undefined; 

// }

// const initialValue: IUserContext = {
// 	user: null,
// 	login: (email: string, password: string) => {},
// 	register: (
// 		email: string,
// 		password: string,
// 		code: string,
// 		name: string,
// 		surname: string,
// 		username: string
// 	) => {},
// 	isAuthenticated: () => false,
// 	updateUser: (updatedUser: IUser) => {},
// 	setShowWelcomeModal: (value: boolean) => {},
// 	showWelcomeModal: undefined 
// };

// const userContext = createContext<IUserContext>(initialValue);

// export function useUserContext() {
// 	return useContext(userContext);
// }

// interface IUserContextProviderProps {
// 	children?: ReactNode;
// }

// export function UserContextProvider(props: IUserContextProviderProps) {
// 	const [user, setUser] = useState<IUser | null>(null);
// 	const [showWelcomeModal, setShowWelcomeModal] = useState(false);
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [error, setError] = useState<string | null>(null);

// 	const updateUser = (updatedUser: IUser) => {
// 		setUser(updatedUser);
// 	};


//   const getData = useCallback(async (token: string) => {
//     console.log("[refetch] Инициализация запроса данных пользователя");
//     try {
//       setIsLoading(true);
//       setError(null);
      
//       console.log("[refetch] Выполнение fetch запроса user/me");
//       const response = await fetch("http://192.168.1.104:3000/user/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
      
//       const result: Response<IUser> = await response.json();
//       console.log(`[refetch] Статус ответа: ${result.status}`);

//       if (result.status === "error") {
//         console.warn("[refetch] Ошибка в ответе сервера");
//         return;
//       }

//       setUser(result.data);
//       console.log("[refetch] Данные пользователя успешно обновлены");
//       return result.data;
//     } catch (error) {
//       const err = error instanceof Error ? error.message : "Unknown error";
//       console.error("[refetch] Ошибка при запросе данных пользователя:", err);
//       setError(err);
//       throw error;
//     } finally {
//       setIsLoading(false);
//       console.log("[refetch] Запрос данных пользователя завершен");
//     }
//   }, []);

//   const login = useCallback(async (email: string, password: string) => {
//     console.log("[refetch] Инициализация запроса входа");
//     try {
//       setIsLoading(true);
//       setError(null);
      
//       console.log("[refetch] Выполнение POST запроса user/log");
//       const response = await fetch("http://192.168.1.104:3000/user/log", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: email, password: password }),
//       });
      
//       const result: Response<string> = await response.json();
//       console.log(`[refetch] Статус ответа: ${result.status}`);

//       if (result.status === "error") {
//         console.warn("[refetch] Ошибка входа");
//         return;
//       }

//       await getData(result.data);
//       await AsyncStorage.setItem("token", result.data);
//       console.log("[refetch] Вход выполнен успешно, токен сохранен");
//       return result.data;
//     } catch (error) {
//       const err = error instanceof Error ? error.message : "Unknown error";
//       console.error("[refetch] Ошибка входа:", err);
//       setError(err);
//       throw error;
//     } finally {
//       setIsLoading(false);
//       console.log("[refetch] Запрос входа завершен");
//     }
//   }, [getData]);

//   const register = useCallback(async (
//     email: string,
//     password: string,
//     code: string,
//     name: string,
//     surname: string,
//     username: string
//   ) => {
//     console.log("[refetch] Инициализация запроса регистрации");
//     try {
//       setIsLoading(true);
//       setError(null);
      
//       console.log("[refetch] Выполнение POST запроса user/reg");
//       const response = await fetch("http://192.168.1.104:3000/user/reg", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//           code: code,
//           name: name,
//           surname: surname,
//           username: username
//         }),
//       });

//       const result: Response<string> = await response.json();
//       console.log(`[refetch] Статус ответа: ${result.status}`);

//       if (result.status === "error") {
//         console.warn("[refetch] Ошибка регистрации");
//         return;
//       }

//       await getData(result.data);
//       await AsyncStorage.setItem("token", result.data);
//       console.log("[refetch] Регистрация выполнена успешно, токен сохранен");
//       return result.data;
//     } catch (error) {
//       const err = error instanceof Error ? error.message : "Unknown error";
//       console.error("[refetch] Ошибка регистрации:", err);
//       setError(err);
//       throw error;
//     } finally {
//       setIsLoading(false);
//       console.log("[refetch] Запрос регистрации завершен");
//     }
//   }, [getData]);

//   	function isAuthenticated() {
// 		return user !== null;
// 	}

// 	return (
// 		<userContext.Provider
// 			value={{
// 				user: user,
// 				login: login,
// 				register: register,
// 				isAuthenticated: isAuthenticated,
// 				updateUser: updateUser,
// 				showWelcomeModal, 
//       			setShowWelcomeModal
// 			}}
// 		>
// 			{props.children}
// 		</userContext.Provider>
// 	);
// }
