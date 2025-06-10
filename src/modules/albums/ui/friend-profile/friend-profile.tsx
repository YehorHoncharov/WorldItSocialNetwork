import { ScrollView, View, Image, Text, FlatList } from "react-native";
import { useUserContext } from "../../../auth/context/user-context";
import OfflineIcon from "../../../../shared/ui/icons/offline-circle";
import { Button } from "../../../../shared/ui/button";
import { styles } from "./friend-profile.styles";
import { IUser } from "../../../auth/types";
import { Album } from "../album/album";
import { useAlbums } from "../../hooks/useAlbums";

export function FriendProfile(props: IUser) {
	const { user } = useUserContext();
	const { albums } = useAlbums();

	return (
		<ScrollView style={styles.scrollView}>
			<View style={styles.container}>
				<View style={styles.profileContainer}>
					<View style={styles.profileImageContainer}>
						<Image
							style={styles.profileImage}
							source={require("../../../../shared/ui/images/yehor.png")}
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
							style={styles.confirmButton}
						>
							<Text style={styles.buttonText}>Підтвердити</Text>
						</Button>
						<Button label="Видалити" style={styles.deleteButton}>
							<Text style={styles.buttonText}>Видалити</Text>
						</Button>
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
						data={albums}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => (
							<Album
								id={item.id}
								name={item.name}
								theme={item.theme}
								year={item.year}
								authorId={item.authorId}
								images={item.images}
							/>
						)}
						contentContainerStyle={styles.albumsList}
					/>
				</View>
			</View>
		</ScrollView>
	);
}
