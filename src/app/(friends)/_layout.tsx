import { Stack } from "expo-router";
import { Header } from "../../shared/ui/header";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FriendsLayout() {
	return (
		<SafeAreaView style={{flex: 1, backgroundColor:"#ffffff"}} edges={["top",]}>
			<Header/>
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			/>
		</SafeAreaView>
	);
}