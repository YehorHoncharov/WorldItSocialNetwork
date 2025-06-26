import { View } from "react-native";
import { Author } from "../author/author";
import { Content } from "../content/content";
import { IPost } from "../../types/post";
import { StyleSheet } from "react-native";

export default function Post(props: IPost) {
	const {
		id,
		title,
		content,
		topic,
		post_app_post_images,
		likes,
		views,
		post_app_post_tags,
		links,
		author_id,
	} = props;

	return (
		
			<View style={styles.container}>
				<Author
					id={id}
					title={title}
					topic={topic}
					content={content}
					post_app_post_images={post_app_post_images}
					likes={likes}
					links={links}
					author_id={author_id}
					views={views}
					post_app_post_tags={post_app_post_tags}
				/>
				<Content
					id={id}
					title={title}
					topic={topic}
					content={content}
					likes={likes}
					links={links}
					author_id={author_id}
					views={views}
					post_app_post_tags={post_app_post_tags}
					post_app_post_images={post_app_post_images}
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
