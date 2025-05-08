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
		name: string,
		username: string,
		password: string,
		image: string,
		about: string,
		code: string
	) => void;
	isAuthenticated: () => boolean;
	updateUser: (updatedUser: IUser) => void;
}

const initialValue: IUserContext = {
	user: null,
	login: (email: string, password: string) => {},
	register: (
		email: string,
		name: string,
		username: string,
		password: string,
		image: string,
		about: string,
		code: string
	) => {},
	isAuthenticated: () => false,
	updateUser: (updatedUser: IUser) => {},
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

	const updateUser = (updatedUser: IUser) => {
		setUser(updatedUser);
	};

	async function getData(token: string) {
		try {
			const response = await fetch("http://192.168.1.104/user/reg", {
				headers: { Authorization: `Bearer ${token}` },
			});
			const result: Response<IUser> = await response.json();
			if (result.status === "error") {
				console.log(result.message);
				return;
			}
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
		name: string,
		username: string,
		password: string,
		image: string,
		about: string,
		code: string
	) {
		try {
			const response = await fetch("http://192.168.1.104:3000/user/reg", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email,
					name: name,
					username: username,
					password: password,
					image: image,
					about: about,
					code: code,
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
			const tokenDel = await AsyncStorage.removeItem("token");
			const token = await AsyncStorage.getItem("token");
			if (!token) {
				return;
			}

			getData(token);
			router.navigate({ pathname: "/registration/step-two" });
			console.log(token);
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
			}}
		>
			{props.children}
		</userContext.Provider>
	);
}
