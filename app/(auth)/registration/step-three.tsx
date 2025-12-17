import { router } from "expo-router";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RegFormThree } from "../../../src/modules/auth/ui/reg-form-three";

export default function RegThree() {
    function onPress() {
        router.back();
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
            <ScrollView
                overScrollMode="never"
                contentContainerStyle={{
                    flex: 1,
                }}
            >
                <RegFormThree />
            </ScrollView>
        </SafeAreaView>
    );
}
