import { SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import  Providers  from "../providers";
import { Header } from "../../shared/ui/header/header";
import { Settings } from "../../modules/settings/settings";


export default function SettingsPage() {

	return (
		<Providers>
			<SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
				<ScrollView
					overScrollMode="never"
					contentContainerStyle={{
						flexGrow: 1,
						alignItems: "center",
						backgroundColor: "#FAF8FF",
						gap: 10,
						paddingTop: 10,
					}}
				>
					<Settings />
				</ScrollView>
			</SafeAreaView>
		</Providers>
	);
}
