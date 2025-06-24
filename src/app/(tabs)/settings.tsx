import { SafeAreaView, ScrollView, StatusBar, View } from "react-native";
import  Providers  from "../providers";
import { Settings } from "../../modules/settings/settings";
import { AlbumHeader } from "../../modules/albums/ui/album-header/album-header";


export default function SettingsPage() {
	return (
		<Providers>
			<SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
				<AlbumHeader />
			</SafeAreaView>
		</Providers>
	);
}
