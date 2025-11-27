import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsLayout() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }} edges={["top"]}>
            {/* <Header actionType={2}/> */}
            <Stack
                screenOptions={{
                    headerShown: true,
                }}
            />
        </SafeAreaView>
    );
}
