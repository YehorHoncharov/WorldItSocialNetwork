import { Stack, Tabs } from "expo-router";
import { Header } from "../../src/shared/ui/header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ChatsLayout() {
	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: "#ffffff" }}
			edges={["top"]}
		>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			/>
		</SafeAreaView>
	);
}
