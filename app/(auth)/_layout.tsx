import { Stack } from "expo-router";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../src/shared/ui/header";

export default function AuthLayout() {
	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: "white" }}
			edges={["top"]}
		>
			<Header.HeaderSecond />
			<Stack
				screenOptions={{
					headerShown: false,
					statusBarStyle:
						Platform.OS === "android" ? "dark" : undefined,
				}}
			/>
		</SafeAreaView>
	);
}
