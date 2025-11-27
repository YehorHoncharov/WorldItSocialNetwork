import { Stack } from "expo-router";
import Providers from "./providers";

export default function RootLayout() {
    return (
        <Providers>
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="(auth)"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="(main)"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="(chats)"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="(settings)" options={{ headerShown: false }} />
                <Stack.Screen name="(friends)" options={{ headerShown: false }} />
            </Stack>
        </Providers>
    );
}
