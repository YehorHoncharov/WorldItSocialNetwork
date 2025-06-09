import { ReactNode } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserContextProvider } from "../modules/auth/context/user-context";

export default function Providers({children}: {children: ReactNode}){
    return (
        <SafeAreaProvider>
            <UserContextProvider>
                {children}
            </UserContextProvider>
        </SafeAreaProvider>
    )
}