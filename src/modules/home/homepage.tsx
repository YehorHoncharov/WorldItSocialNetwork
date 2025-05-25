import { useState, useEffect } from "react";
import { FlatList, RefreshControl, View, Text } from "react-native";
import Post from "../post/ui/main-page/main.page";
import { usePosts } from "../post/hooks/use-get-post";
import { useUserContext } from "../auth/context/user-context";
import { RegStepTwoModal } from "../../app/(auth)/registration/step-two";

export function Homepage() {
  const { posts, refetch } = usePosts();
  const [refreshing, setRefreshing] = useState(false);
  const { showWelcomeModal, setShowWelcomeModal } = useUserContext();

  useEffect(() => {
    if (showWelcomeModal) {
      const timer = setTimeout(() => {
        setShowWelcomeModal(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showWelcomeModal]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refetch();
    } catch (error) {
      console.error("Refresh error:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        style={{
          gap: 5,
          alignContent: "space-between",
        }}
        renderItem={({ item }) => (
          <View
            style={{
              gap: 5,
              alignContent: "space-between",
              justifyContent: "space-between",
            }}
          >
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
            colors={["#000000"]}
            progressBackgroundColor="#FFFFFF"
          />
        }
        ListEmptyComponent={
          <View>
            <Text>Немає постів для відображення</Text>
          </View>
        }
      />

      {/* <RegStepTwoModal
        modalVisible={!showWelcomeModal}
        changeVisibility={() => setShowWelcomeModal(false)}
      /> */}
    </>
  );
}