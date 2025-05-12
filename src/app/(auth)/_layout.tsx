import { Stack } from "expo-router";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../shared/ui/header";

export default function AuthLayout() {
	return (
		<SafeAreaView style={{flex: 1}} edges={["top",]}>
			<Header.HeaderSecond></Header.HeaderSecond>
			<Stack
				screenOptions={{
					headerShown: false,
					statusBarStyle:
						Platform.OS === "android" ? "dark" : undefined,
					statusBarBackgroundColor: "#ffffff",
				}}
			/>
		</SafeAreaView>
	);
}
