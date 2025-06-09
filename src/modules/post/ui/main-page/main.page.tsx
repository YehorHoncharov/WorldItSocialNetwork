import { View } from "react-native";
import { Author } from "../author/author";
import { Content } from "../content/content";
import { IPost } from "../../types/post";
import { StyleSheet } from "react-native";

export default function Post(props: IPost) {
	const {
		id,
		name,
		text,
		theme,
		images,
		likes,
		views,
		tags,
		links,
		authorId,
	} = props;

	return (
		
			<View style={styles.container}>
				<Author
					id={id}
					name={name}
					text={text}
					theme={theme}
					images={images}
					likes={likes}
					links={links}
					authorId={authorId}
					views={views}
					tags={tags}
				/>
				<Content
					id={id}
					name={name}
					text={text}
					theme={theme}
					likes={likes}
					links={links}
					authorId={authorId}
					views={views}
					tags={tags}
					images={images}
				/>
			</View>

	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderWidth: 1,
		borderColor: "#CDCED2",
		borderRadius: 30,
		backgroundColor: "#ffffff",
		marginBottom: 16,
		overflow: "hidden",
		marginTop: 10,
	},
});
