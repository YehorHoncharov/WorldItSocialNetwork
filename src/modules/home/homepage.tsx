import { useState, useCallback } from "react";
import { FlatList, RefreshControl, View, Text, StyleSheet, Alert } from "react-native";
import Post from "../post/ui/main-page/main.page";
import { usePosts } from "../post/hooks/use-get-post";
import { useUserContext } from "../auth/context/user-context";

export function Homepage() {
  const { posts, refetch } = usePosts();
  const [refreshing, setRefreshing] = useState(false);
  const { showWelcomeModal, setShowWelcomeModal} = useUserContext();
  const { user } = useUserContext();

  const onRefresh = useCallback(async () => {
    console.log("[Homepage] Инициализация обновления страницы");
    setRefreshing(true);
    try {
      await refetch()
      console.log("[Homepage] Обновление постов и данных пользователя завершено");
    } catch (error) {
      console.error("[Homepage] Ошибка при обновлении:", error);
      Alert.alert("Ошибка", "Не удалось обновить данные. Попробуйте снова.");
    } finally {
      setRefreshing(false);
      console.log("[Homepage] Обновление завершено");
    }
  }, [refetch]);

  return (
    <FlatList
      overScrollMode="never"
      style={{ gap: 20 }}
      data={posts}
      keyExtractor={(item) => `${item.id}`}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <View style={styles.postContainer}>
          <Post
            id={item.id}
            name={item.name}
            text={item.text}
            images={item.images}
            theme={item.theme}
            links={item.links}
            tags={item.tags}
            authorId={item.authorId}
            likes={item.likes}
            views={item.views}
          />
        </View>
      )}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#543C52"]}
          progressBackgroundColor="#e9e5ee"
        />
      }
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