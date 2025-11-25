import { ReactNode } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserContextProvider } from "../src/modules/auth/context/user-context";
import { SocketContextProvider } from "../src/modules/chat/context/socketContext";

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<SafeAreaProvider style={{ flex: 1, backgroundColor: "#FAF8FF" }}>
			<UserContextProvider>
				<SocketContextProvider>{children}</SocketContextProvider>
			</UserContextProvider>
		</SafeAreaProvider>
	);
}
