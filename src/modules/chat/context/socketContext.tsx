import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { io, Socket } from "socket.io-client"
import { Alert } from "react-native"
import { IClientEvents, IServerEvents } from "../types/socket"
import { API_BASE_URL } from "../../../settings"
import AsyncStorage from "@react-native-async-storage/async-storage"

export interface ISocketContext {
	socket: Socket<IServerEvents, IClientEvents> | null
}

interface ISocketContextProviderProps {
	children?: ReactNode
}

const SocketContext = createContext<ISocketContext | null>(null)
export function useSocketContext() {
	const ctx = useContext(SocketContext)
	if (!ctx) throw new Error('UseSocketContext is not in Provider')
	return ctx
}
export function SocketContextProvider({
	children,
}: ISocketContextProviderProps) {
	const [socket, setSocket] = useState<Socket<IServerEvents, IClientEvents> | null>(null)
	const [token, setToken] = useState<string>()

	useEffect(() => {
		const getToken = async () => {
			const tk = await AsyncStorage.getItem("token")
			if (tk) setToken(tk)
		}
		getToken()
	}, [])

	useEffect(() => {
		if (!token) return
		const newSocket = io(`${API_BASE_URL}`, { auth: { token } })

		newSocket.on("connect", () => {
			// Alert.alert("Socket connected")
		})

		newSocket.on("disconnect", () => {
			// Alert.alert("Socket disconnected")
		})

		newSocket.on("friendRequestDeclined", (data) => {
			Alert.alert("Запит відхилено", data.message);
		});

		setSocket(newSocket)

		return () => {
			newSocket.disconnect()
		}
	}, [token])

	return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
}