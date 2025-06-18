import { ScrollView, View, Text, TouchableOpacity, Image, Alert } from "react-native";
import { styles } from "./album.style";
import Dots from "../../../../shared/ui/icons/dots";
import { useEffect, useState, useRef } from "react";
import { launchImageLibraryAsync, requestMediaLibraryPermissionsAsync } from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IAlbum, IAlbumImg, IPutResponse } from "../../types/albums.types";
import { PUT } from "../../../../shared/api/put";
import { API_BASE_URL } from "../../../../settings";
import { ModalAlbum } from "../album-modal/album-modal";
import { useUserContext } from "../../../auth/context/user-context";

export function Album({ scrollOffset = 0, ...props }: IAlbum & { scrollOffset?: number }) {
	const [images, setImages] = useState<IAlbumImg[]>([]);
	const [imagesToDelete, setImagesToDelete] = useState<number[]>([]);
	const [modalVisible, setModalVisible] = useState(false);
	const [dotsPosition, setDotsPosition] = useState({ x: 0, y: 0 });
	const dotsRef = useRef<any>(null);
	const [imageDimensions, setImageDimensions] = useState<{
		[key: string]: { width: number; height: number };
	}>({});
	const [containerSize, setContainerSize] = useState({
		width: 400,
		height: 725,
	});
	const [tokenUser, setTokenUser] = useState<string>("");
	const { user } = useUserContext()

	const getToken = async (): Promise<string> => {
		const token = await AsyncStorage.getItem("tokenStorage");
		return token || "";
	};

	useEffect(() => {
		getToken().then(setTokenUser);
		if (props.images && Array.isArray(props.images)) {
			setImages(props.images);
		}
	}, [props.images]);

	const measureDots = () => {
		if (dotsRef.current) {
			dotsRef.current.measureInWindow((x: number, y: number, width: number, height: number) => {
				setDotsPosition({ x, y });
			});
		}
	};

	useEffect(() => {
		if (modalVisible) {
			measureDots();
		}
	}, [modalVisible, scrollOffset]);

	const handleContainerLayout = (event: any) => {
		const { width, height } = event.nativeEvent.layout;
		setContainerSize({ width, height });
	};

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
				const maxSizeInBytes = 5 * 1024 * 1024;

				const newImages = await Promise.all(
					result.assets
						.filter((asset) => {
							const type = asset.mimeType?.split("/")[1]?.toLowerCase() || "";
							return asset.base64 && allowedFormats.includes(type);
						})
						.map(async (asset, index) => {
							const base64String = asset.base64!;
							const estimatedSizeInBytes = (base64String.length * 3) / 4;
							if (estimatedSizeInBytes > maxSizeInBytes) {
								Alert.alert("Помилка", `Зображення занадто велике (макс. 5 МБ)`);
								return null;
							}
							const imageUrl = `data:image/${asset.mimeType?.split("/")[1] || "jpeg"};base64,${base64String}`;

							const dimensions = await new Promise<{ width: number; height: number }>((resolve) => {
								Image.getSize(
									imageUrl,
									(width, height) => resolve({ width, height }),
									(error) => {
										console.error(`Помилка визначення розмірів: ${error}`);
										resolve({ width: 150, height: 150 });
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
								albumId: props.id,
							};
						})
				);

				const filteredImages = newImages.filter((img): img is IAlbumImg => img !== null);

				if (images.length + filteredImages.length - imagesToDelete.length > 10) {
					Alert.alert("Увага", "Максимальна кількість зображень - 10");
					return;
				}

				setImages((prev) => [...prev, ...filteredImages]);
			} else if (result.canceled) {
				Alert.alert("Скасовано", "Вибір зображень було скасовано");
			}
		} catch (error) {
			console.error("Помилка вибору зображення:", error);
			Alert.alert(
				"Помилка",
				`Не вдалося вибрати зображення: ${error instanceof Error ? error.message : "Невідома помилка"}`
			);
		}
	}

	function deleteImage(id: number) {
		const imageToDelete = images.find((image) => image.id === id);
		if (!imageToDelete) {
			Alert.alert("Помилка", "Зображення не знайдено");
			return;
		}

		if (!imageToDelete.url.startsWith("data:image")) {
			setImagesToDelete((prev) => [...prev, id]);
		}

		setImages((prev) => prev.filter((image) => image.id !== id));
		setImageDimensions((prev) => {
			const updatedDimensions = { ...prev };
			delete updatedDimensions[id];
			return updatedDimensions;
		});
	}

	async function handleSubmit() {
		try {
			const formattedImages = [
				...images,
				...imagesToDelete.map((id) => ({ id }))
			]

			
		// if (filteredImages.length > 0 || deletedImages.length > 0) {
		// 	updatedData.images = [
		// 		...newImages,
		// 		...deletedImages.map((img) => ({ id: img.id, url: "" })),
		// 	];
		// }

		const response: IPutResponse = await PUT({
			endpoint: `${API_BASE_URL}/albums/${props.id}`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${tokenUser}`,
			},
			token: tokenUser,
			body: {
				images:
					formattedImages.length > 0 || formattedImages.length > 0
						? formattedImages
						: undefined,
			},
		});

		if (response.status === "success" && response.data) {
			setImages(response.data.images || []);
			setImagesToDelete([]);
			Alert.alert("Успіх", "Зміни успішно збережено");
		}
		Alert.alert("Успіх", "Зміни успішно збережено");
	} catch (err) {
		console.error("Помилка збереження:", err);
	}
}

return (
	<View style={styles.container} onLayout={handleContainerLayout}>
		<ScrollView contentContainerStyle={styles.scrollContainer}>
			<View style={{ gap: 27, alignItems: "center", justifyContent: "center", width: "100%", alignContent: "center" }}>
				<View style={{ width: "100%" }}>
					<View style={styles.mainBox}>
						<Text style={styles.title}>{props.name}</Text>
						{user?.id === props.authorId ?
							<View style={styles.actionButtons}>
								<TouchableOpacity style={styles.actionButton}>
									<Image
										source={require("../../../../shared/ui/images/eye-my-publication.png")}
										style={styles.actionIcon}
									/>
								</TouchableOpacity>
								<TouchableOpacity
									ref={dotsRef}
									onPress={() => setModalVisible(true)}
									style={{ alignItems: "center", justifyContent: "center" }}
								>
									<Dots width={20} height={20} />
								</TouchableOpacity>
							</View>
							: null}
					</View>
					<View style={styles.theme}>
						<Text style={{ fontSize: 16 }}>{props.theme}</Text>
						<Text style={{ fontSize: 16 }}>{props.year}</Text>
					</View>
					<View style={styles.separator} />
				</View>
				<View style={{ gap: 27, alignItems: "flex-start", justifyContent: "space-between", width: "100%" }}>
					<Text style={styles.title}>Фотографії</Text>
					<View style={styles.photoGrid}>
						{images.length > 0
							? images.map((img) => (
								<View key={img.id}>
									<Image
										source={{
											uri: img.url.startsWith("data:image")
												? img.url
												: `${API_BASE_URL}/${img.url.replace(/^\/?uploads\/*/i, "uploads/")}`,
										}}
										style={styles.photo}
									/>
									{user?.id === props.authorId ?
										<TouchableOpacity
											onPress={() => deleteImage(img.id)}
											style={styles.deleteBtn}
										>
											<Image
												source={require("../../../../shared/ui/images/trash.png")}
												style={{ width: 20, height: 20 }}
											/>
										</TouchableOpacity>
										: null}
								</View>
							))
							: null}
						{user?.id === props.authorId ? (
							<>
								{images.length < 10 && (
									<TouchableOpacity style={styles.addImage} onPress={onSearch}>
										<Image
											style={{ width: 40.6, height: 40 }}
											source={require("../../../../shared/ui/images/plus-in-circle.png")}
										/>
									</TouchableOpacity>
								)}
							</>
						) : null}
					</View>
				</View>
				{user?.id === props.authorId ?
					<TouchableOpacity onPress={handleSubmit} style={styles.submitBtn}>
						<Text style={styles.submitText}>Зберегти</Text>
					</TouchableOpacity>
					: null}
			</View>
		</ScrollView>
		<ModalAlbum
			visible={modalVisible}
			onClose={() => setModalVisible(false)}
			albumId={props.id}
			dotsPosition={dotsPosition}
			containerSize={containerSize}
			scrollOffset={scrollOffset}
		/>
	</View>
);
}