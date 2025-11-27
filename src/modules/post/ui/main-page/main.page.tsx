import { View } from "react-native";
import { Author } from "../author/author";
import { Content } from "../content/content";
import { IPost } from "../../types/post";
import { StyleSheet } from "react-native";

export default function Post(props: IPost) {
    const { id, title, content, images, likes, views, tags, links, author_id } = props;

    return (
        <View style={styles.container}>
            <Author
                id={id}
                title={title}
                content={content}
                images={images}
                likes={likes}
                links={links}
                author_id={author_id}
                views={views}
                tags={tags}
                theme={props.theme}
            />
            <Content
                id={id}
                title={title}
                content={content}
                likes={likes}
                links={links}
                author_id={author_id}
                views={views}
                tags={tags}
                images={images}
                theme={props.theme}
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
