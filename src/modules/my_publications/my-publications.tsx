import { useEffect, useState } from "react";
import { usePosts } from "../post/hooks/use-get-post";
import { useUserContext } from "../auth/context/user-context";
import { IPost } from "../post/types/post";
import { FlatList, View, Text, StyleSheet } from "react-native";
import Post from "../post/ui/main-page/main.page";

export function MyPublications() {
  const { posts } = usePosts();
  const { user } = useUserContext();
  const [userPosts, setUserPosts] = useState<IPost[]>([])

  useEffect(() => {
      if (!user) return;
      const myPosts = posts.filter((post) => post.author_id === user.id);
      setUserPosts(myPosts);
  }, [posts, user]);
  
  return (
    <FlatList
      overScrollMode="never"
      style={{ gap: 20 }}
      data={userPosts}
      keyExtractor={(item) => `${item.id}`}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <View style={styles.postContainer}>
          <Post
            id={item.id}
            title={item.title}
            topic={item.topic}
            content={item.content}
            post_app_post_images={item.post_app_post_images}
            links={item.links}
            post_app_post_tags={item.post_app_post_tags}
            author_id={item.author_id}
            likes={item.likes}
            views={item.views}
          />
        </View>
      )}
    
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text>Немає постів для відображення</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 20,
  },
  postContainer: {
    backgroundColor: "#FAF8FF",
    borderRadius: 8,
    overflow: "hidden",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
  },
});