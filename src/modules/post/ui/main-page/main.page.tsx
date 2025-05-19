import { SafeAreaView, ScrollView, View } from "react-native";
import { Author } from "../author/author";
import { Content } from "../content/content";
import { Providers } from "../../../../app/providers";
import { IPost } from "../../types/post";

export default function Post(props: IPost) {

	const {id, name, text, theme, images, user} = props

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
				<Author id={id} name={name} text={text} theme={theme} images={images} user={user}></Author>
				<Content id={id} name={name} text={text} theme={theme} images={images} user={user}></Content>
			</SafeAreaView>
		</Providers>
	);
}
