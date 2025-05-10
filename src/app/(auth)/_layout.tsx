import { Stack } from "expo-router";
import { Platform } from "react-native";

export default function AuthLayout() {
	return (
		<Stack screenOptions={{ headerShown: false, statusBarStyle: Platform.OS === "android" ? "dark" : undefined, statusBarBackgroundColor: '#ffffff'}} />
	);
}