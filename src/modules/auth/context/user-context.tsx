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
