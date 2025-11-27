import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatsLayout() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} edges={["top"]}>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            />
        </SafeAreaView>
    );
}
