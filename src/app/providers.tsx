import { ReactNode } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserContextProvider } from "../modules/auth/context/user-context";
import { SocketContextProvider } from "../modules/chat/context/socketContext";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <SafeAreaProvider>
            <UserContextProvider>
                <SocketContextProvider>
                    {children}
                </SocketContextProvider>
            </UserContextProvider>
        </SafeAreaProvider>
    );
}
