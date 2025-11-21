import { createContext, useContext, ReactNode, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../types/user";
import { Response } from "./types";
import { API_BASE_URL } from "../../../settings";
import { POST } from "../../../shared/api/post";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

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
            const response = await fetch(`${API_BASE_URL}/users/me`, {
                headers: {
                    Authorization: `Bearer ${token}`,
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
            router.push({
                pathname: "/registration/step-one"
            })
            return null;
        }
    }

    // useEffect(() => {
    //     async function refreshUser() {
    //         const token = await AsyncStorage.getItem("token");
    //         if (token) {
    //             const interval = setInterval(() => {
    //                 getData(token);
    //             }, 3000);

    //             return () => clearInterval(interval);
    //         }
    //     }
    //     refreshUser();
    // }, [])

    async function login(email: string, password: string) {
        try {
            const response = await fetch(`${API_BASE_URL}/users/log`, {
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
            // console.error("[login] Error:", error);
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
            const response = await fetch(`${API_BASE_URL}/users/reg`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, code, name, surname, username }),
            });
            const result: Response<string> = await response.json();
            if (result.status === "error") {
                Alert.alert("Помилка Реєстрації!", result.message);
                throw console.log(result.message);
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
                        images: {
                            create: [{
                                image: {
                                    create: {
                                        filename: "uploads/user.png",
                                        file: "uploads/user.png"
                                    }
                                }
                            }]
                        },
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
                const response = await fetch(`${API_BASE_URL}/users/logout`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                const result = await response.json();
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
                const interval = setInterval(() => {
                    getData(token);
                }, 500);

                return () => clearInterval(interval);
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

            }}
        >
            {children}
        </userContext.Provider>
    );
}