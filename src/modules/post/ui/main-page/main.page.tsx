import { SafeAreaView, ScrollView, View } from "react-native";
import { Author } from "../author/author";
import { Content } from "../content/content";
import { Providers } from "../../../../app/providers";
import { IPost } from "../../types/post";

export default function Post(props: IPost) {
	const {id, name, text, images, user} = props
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
				<Content id={id} name={name} text={text} images={images} user={user}></Content>
			</SafeAreaView>
		</Providers>
	);
}
