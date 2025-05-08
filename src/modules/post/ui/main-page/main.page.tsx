import { SafeAreaView, ScrollView, View } from "react-native";
import { Author } from "../author/author";
import { Content } from "../content/content";
import { Providers } from "../../../../app/providers";

export default function Post() {
	return (
		<Providers>
			<SafeAreaView
				style={{
					height: 725,
					flex: 1,
					borderWidth: 1,
					borderColor: "#CDCED2",
					borderRadius: 30,
					backgroundColor: "#ffffff",
				}}
			>
				<Author></Author>
				<Content></Content>
			</SafeAreaView>
		</Providers>
	);
}
