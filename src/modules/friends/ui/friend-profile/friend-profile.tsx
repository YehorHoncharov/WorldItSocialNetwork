import { ScrollView, View, Image, Text, FlatList, TouchableOpacity } from "react-native";
import { useUserContext } from "../../../auth/context/user-context";
import OfflineIcon from "../../../../shared/ui/icons/offline-circle";
import { Button } from "../../../../shared/ui/button";
import { styles } from "./friend-profile.styles";
import { IUser } from "../../../auth/types";
import { useAlbums } from "../../../albums/hooks/useAlbums";
import { Album } from "../../../albums/ui/album/album";
import { API_BASE_URL } from "../../../../settings";
import { useEffect, useState } from "react";
import { IAlbum } from "../../../albums/types/albums.types";
import { usePosts } from "../../../post/hooks/use-get-post";
import Post from "../../../post/ui/main-page/main.page";
import { IPost } from "../../../post/types/post";

interface FriendProfileProps {
	user: IUser
}

export function FriendProfile({ user }: FriendProfileProps) {
	const { albums } = useAlbums();
	const { posts } = usePosts();
	const [userAlbums, setUserAlbums] = useState<IAlbum[]>([]);
	const [userPosts, setUserPosts] = useState<IPost[]>([]);

	useEffect(() => {
		if (!user) return;
		const myAlbums = albums.filter((album) => album.author_id === user.id);
		const myPosts = posts.filter((post) => post.author_id === user.id);
		setUserAlbums(myAlbums);
		setUserPosts(myPosts);
	}, [albums, user]);

	return (
		<ScrollView style={styles.scrollView} overScrollMode="never">
			<View style={styles.container}>
				<View style={styles.profileContainer}>
					<View style={styles.profileImageContainer}>
						<Image
							style={styles.profileImage}
							source={{ uri: API_BASE_URL + "/" + user.image }}
						/>
						<OfflineIcon style={styles.imageOnline} />
					</View>
					<View style={styles.userInfo}>
						{!user ? (
							<Text>Нету пользователя</Text>
						) : (
							<View>
								<Text style={styles.name}>
									{user.name} {user.surname}
								</Text>
								<Text style={styles.username}>
									@{user.username}
								</Text>
							</View>
						)}
					</View>
					<View style={styles.statsContainer}>
						<View
							style={[styles.statItem, styles.statItemWithBorder]}
						>
							<Text style={styles.statNumber}>3</Text>
							<Text style={styles.statLabel}>Дописи</Text>
						</View>
						<View
							style={[styles.statItem, styles.statItemWithBorder]}
						>
							<Text style={styles.statNumber}>12.1к</Text>
							<Text style={styles.statLabel}>Читачів</Text>
						</View>
						<View style={styles.statItem}>
							<Text style={styles.statNumber}>222</Text>
							<Text style={styles.statLabel}>Друзі</Text>
						</View>
					</View>
					<View style={styles.buttonContainer}>
						<Button
							label="Підтвердити"
							style={[styles.confirmButton]}
						>
							<Text style={styles.buttonText}>Підтвердити</Text>
						</Button>
						<TouchableOpacity style={styles.deleteButton}>
							<Text style={styles.buttonText}>Видалити</Text>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.albumsContainer}>
					<View style={styles.albumsSection}>
						<View style={styles.albumsHeader}>
							<View style={styles.albumsIcon}>
								<Image
									style={{ height: 17, width: 17 }}
									source={require("../../../../shared/ui/images/album-image.png")}
								/>
							</View>
							<Text style={styles.albumsLabel}>Альбоми</Text>
						</View>
						<Text style={styles.viewAll}>Дивитись всі</Text>
					</View>

					<FlatList
						data={userAlbums}
						scrollEnabled={false}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => (
							<Album
								id={item.id}
								name={item.name}
								topic={item.topic}
								created_at={item.created_at}
								author_id={item.author_id}
								images={item.images}
							/>
						)}
						contentContainerStyle={styles.albumsList}
					/>

				</View>
				{userPosts.length > 0 ?
					<View style={styles.albumsContainer}>
						<View style={styles.albumsSection}>
							<View style={styles.albumsHeader}>
								<View style={styles.albumsIcon}>
									<Image
										style={{ height: 17, width: 17 }}
										source={require("../../../../shared/ui/images/album-image.png")}
									/>
								</View>
								<Text style={styles.albumsLabel}>Пости</Text>
							</View>
							<Text style={styles.viewAll}>Дивитись всі</Text>
						</View>

						<FlatList
							data={userPosts}
							scrollEnabled={false}
							keyExtractor={(item) => item.id.toString()}
							renderItem={({ item }) => (

								<Post
									id={item.id}
									title={item.title}
									content={item.content}
									author_id={item.author_id}
									likes={item.likes}
									views={item.views}
									tags={item.tags}
									images={item.images}
									links={item.links}
								/>
							)}
							contentContainerStyle={styles.albumsList}
						/>

					</View> : null}
			</View>
		</ScrollView>
	);
}
