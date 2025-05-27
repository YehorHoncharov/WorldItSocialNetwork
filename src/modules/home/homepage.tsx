import { useState, useEffect } from "react";
import { FlatList, RefreshControl, View, Text, StyleSheet } from "react-native";
import Post from "../post/ui/main-page/main.page";
import { usePosts } from "../post/hooks/use-get-post";
import { useUserContext } from "../auth/context/user-context";
import { RegStepTwoModal } from "../../app/(auth)/registration/step-two";

export function Homepage() {
	const { posts, refetch } = usePosts();
	const [refreshing, setRefreshing] = useState(false);
	const { showWelcomeModal, setShowWelcomeModal } = useUserContext();
	const { user } = useUserContext();

	useEffect(() => {
		if (showWelcomeModal) {
			const timer = setTimeout(() => setShowWelcomeModal(false), 3000);
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
			<RegStepTwoModal
				modalVisible={!!showWelcomeModal}
				changeVisibility={() => {
					setShowWelcomeModal(false);
				}}
			/>
		</>
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
