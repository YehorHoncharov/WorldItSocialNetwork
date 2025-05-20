import { Stack } from "expo-router";

import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../shared/ui/header";

export default function SettingsLayout() {
	return (
		<SafeAreaView style={{flex: 1}} edges={["top",]}>
			<Header/>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			/>
		</SafeAreaView>
	);
}