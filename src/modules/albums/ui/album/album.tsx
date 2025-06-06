import { ScrollView, View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { styles } from "./album.style";
import Dots from "../../../../shared/ui/icons/dots";
import { useEffect, useState } from "react";
import { launchImageLibraryAsync, requestMediaLibraryPermissionsAsync } from "expo-image-picker";
import { useUserContext } from "../../../auth/context/user-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IAlbum, IAlbumImg } from "../../types/albums.types";
import { PUT } from "../../../../shared/api/put";
import { API_BASE_URL } from "../../../../settings";



export function Album(props: IAlbum) {
	const [images, setImages] = useState<IAlbumImg[]>([]);
	const [imageDimensions, setImageDimensions] = useState<{
		[key: string]: { width: number; height: number };
	}>({});
	const { user } = useUserContext();
	const [tokenUser, setTokenUser] = useState<string>("");
	const getToken = async (): Promise<string> => {
		const token = await AsyncStorage.getItem("tokenStorage");
		return token || "";
	};

	useEffect(() => {
		getToken().then(setTokenUser);
		if (props.images && Array.isArray(props.images)) {
			setImages(props.images);
		}
	}, []);
	async function onSearch() {
		try {
			const { status } = await requestMediaLibraryPermissionsAsync();
			if (status !== "granted") {
				Alert.alert(
					"Дозвіл не надано",
					"Для додавання зображень необхідно надати доступ до галереї"
				);
				return;
			}

			const result = await launchImageLibraryAsync({
				mediaTypes: ["images"],
				allowsMultipleSelection: true,
				quality: 0.8,
				allowsEditing: false,
				base64: true,
			});

			if (!result.canceled && result.assets) {
				const allowedFormats = ["jpeg", "png", "gif"];
				const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB

				const newImages = await Promise.all(
					result.assets
						.filter((asset) => {
							const type =
								asset.mimeType?.split("/")[1]?.toLowerCase() ||
								"";
							return (
								asset.base64 && allowedFormats.includes(type)
							);
						})
						.map(async (asset, index) => {
							const base64String = asset.base64!;
							const estimatedSizeInBytes =
								(base64String.length * 3) / 4;
							if (estimatedSizeInBytes > maxSizeInBytes) {
								Alert.alert(
									"Помилка",
									`Зображення занадто велике (макс. 5 МБ)`
								);
								return null;
							}
							const imageUrl = `data:image/${asset.mimeType?.split("/")[1] || "jpeg"
								};base64,${base64String}`;

							const dimensions = await new Promise<{
								width: number;
								height: number;
							}>((resolve) => {
								Image.getSize(
									imageUrl,
									(width, height) =>
										resolve({ width, height }),
									(error) => {
										console.error(
											` Помилка визначення розмірів: ${error}`
										);
										resolve({ width: 150, height: 150 }); // Запасний варіант
									}
								);
							});

							const imageKey = `${Date.now() + index}`;
							setImageDimensions((prev) => ({
								...prev,
								[imageKey]: dimensions,
							}));

							return {
								id: Date.now() + index,
								url: imageUrl,
								albumId: 0,
							};
						})
				);

				const filteredImages = newImages.filter(
					(img): img is IAlbumImg => img !== null
				);

				if (images.length + filteredImages.length > 10) {
					Alert.alert(
						"Увага",
						"Максимальна кількість зображень - 10"
					);
					return;
				}

				setImages((prev) => {
					const updatedImages = [...prev, ...filteredImages];
					return updatedImages;
				});
			} else if (result.canceled) {
				Alert.alert("Скасовано", "Вибір зображень було скасовано");
			}
		} catch (error) {
			console.error(
				" Помилка вибору зображення:",
				error
			);
			Alert.alert(
				"Помилка",
				`Не вдалося вибрати зображення: ${error instanceof Error ? error.message : "Невідома помилка"
				}`
			);
		}
	}

	const handleSubmit = async () => {

		const formattedImages =
			images.length > 0
				? { create: images.map((img) => ({ url: img.url })) }
				: undefined;

		try {



			const response = await PUT({
				endpoint: `${API_BASE_URL}/albums/${props.id}`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${tokenUser}`,
				},
				token: tokenUser,
				body: {
					images: formattedImages,
				},
			});

			if (response.status === "success") {
				setImages([]);

			} else {
				Alert.alert(
					"Помилка"
				);
			}
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<View style={{ gap: 27 }}>
					<View style={{ gap: 16 }}>
						<View style={styles.mainBox}>
							<Text style={styles.title}>{props.name}</Text>

							<View style={styles.actionButtons}>
								<TouchableOpacity style={styles.actionButton}>
									<Image
										source={require("../../../../shared/ui/images/eye-my-publication.png")}
										style={styles.actionIcon}
									/>
								</TouchableOpacity>

								<TouchableOpacity style={{ alignItems: "center", justifyContent: "center" }}>
									<Dots width={20} height={20} />
								</TouchableOpacity>
							</View>
						</View>

						<View style={styles.theme}>
							<Text style={{ fontSize: 16 }}>{props.theme}</Text>
							<Text style={{ fontSize: 16 }}>{props.year}</Text>
						</View>
						<View style={styles.separator} />
					</View>

					<View style={{ gap: 16 }}>
						<Text style={styles.title}>Фотографії</Text>
						<View style={styles.photoGrid}>
							{images.map((img, index) => (
								<View key={index}>
									<Image source={{ uri: `http://192.168.1.104:3000/${img.url}` }} style={styles.photo} />
									<TouchableOpacity
										onPress={() => {
											const updated = images.filter((_, i) => i !== index);
											setImages(updated);
										}}
										style={styles.deleteBtn}
									>
										<Image
											source={require("../../../../shared/ui/images/trash.png")}
											style={{ width: 20, height: 20 }}
										/>
									</TouchableOpacity>
								</View>
							))}
							{images.length < 10 && (
								<TouchableOpacity style={styles.addImage} onPress={onSearch}>
									<Image
										style={{ width: 40.6, height: 40 }}
										source={require('../../../../shared/ui/images/plus-in-circle.png')}
									/>
								</TouchableOpacity>
							)}
						</View>
					</View>
					<TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
						<Text style={styles.submitText}>Зберегти</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</View>
	);
}
