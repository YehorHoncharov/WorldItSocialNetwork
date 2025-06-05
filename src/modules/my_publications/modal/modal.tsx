import React, { useEffect, useState } from "react";
import {
	Modal,
	Pressable,
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Image,
	TextInput,
	ScrollView,
	Alert,
	ActivityIndicator,
} from "react-native";
import Cross from "../../../shared/ui/icons/cross";
import SendArrow from "../../../shared/ui/icons/send-arrow";
import { Input } from "../../../shared/ui/input";
import {
	launchImageLibraryAsync,
	requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { POST } from "../../../shared/api/post";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserContext } from "../../auth/context/user-context";
import DropDownPicker from "react-native-dropdown-picker";
import { usePosts } from "../../post/hooks/use-get-post";
import { API_BASE_URL } from "../../../settings";

interface Props {
	modalVisible: boolean;
	changeVisibility: () => void;
}

interface TagItem {
	label: string;
	value: string;
}

interface IPostImg {
	id: number;
	url: string;
	userPostId: number;
}

export function MyPublicationModal({ modalVisible, changeVisibility }: Props) {
	const [name, setName] = useState("");
	const [theme, setTheme] = useState("");
	const [text, setText] = useState("");
	const [links, setLinks] = useState("");
	const [images, setImages] = useState<IPostImg[]>([]);
	const [imageDimensions, setImageDimensions] = useState<{
		[key: string]: { width: number; height: number };
	}>({});
	const [tokenUser, setTokenUser] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);
	const { user } = useUserContext();
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState<string[]>([]);
	const [items, setItems] = useState<TagItem[]>([
		{ label: "Відпочинок", value: "#відпочинок" },
		{ label: "Натхнення", value: "#натхнення" },
		{ label: "Життя", value: "#життя" },
		{ label: "Природа", value: "#природа" },
		{ label: "Спокій", value: "#спокій" },
		{ label: "Читання", value: "#читання" },
		{ label: "Гармонія", value: "#гармонія" },
		{ label: "Музика", value: "#музика" },
		{ label: "Фільми", value: "#фільми" },
		{ label: "Подорожі", value: "#подорожі" },
	]);
	const { refetch } = usePosts();

	const getToken = async (): Promise<string> => {
		const token = await AsyncStorage.getItem("tokenStorage");
		return token || "";
	};

	useEffect(() => {
		getToken().then(setTokenUser);
	}, []);

	const handleSubmit = async () => {

		if (!name.trim() || !theme.trim() || !text.trim()) {
			Alert.alert(
				"Помилка",
				"Будь ласка, заповніть усі обов'язкові поля"
			);
			return;
		}
		if (!user) {
			Alert.alert(
				"Упс...",
				"Схоже, ви не авторизовані 😞, тому не можете створити пост 🙄"
			);
			return;
		}
		if (value.length > 10) {
			Alert.alert("Помилка", "Максимум 10 тегів");
			return;
		}
		if (links && !isValidUrl(links)) {
			Alert.alert("Помилка", "Введіть коректне посилання");
			return;
		}

		const sanitizedTags = value
			.map((tag) => tag.trim())
			.filter((tag) => tag.length > 0 && tag.length <= 50);

		if (sanitizedTags.length !== value.length) {
			Alert.alert("Помилка", "Теги мають бути не довшими за 50 символів");
			return;
		}

		const formattedImages =
			images.length > 0
				? { create: images.map((img) => ({ url: img.url })) }
				: undefined;

		setIsLoading(true);
		try {
			console.log("[refetch] Отправка запроса на создание поста", {
				name: name.trim(),
				theme: theme.trim(),
				text: text.trim(),
				links: links.trim() || undefined,
				tags: sanitizedTags,
				images: formattedImages,
				authorId: user.id,
			});
			const response = await POST({
				endpoint: `${API_BASE_URL}/posts/create`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${tokenUser}`,
				},
				token: tokenUser,
				body: {
					name: name.trim(),
					theme: theme.trim(),
					text: text.trim(),
					links: links.trim() || undefined,
					tags: sanitizedTags.length > 0 ? sanitizedTags : undefined,
					images: formattedImages,
					authorId: user.id,
				},
			});

			if (response.status === "success") {
				setName("");
				setTheme("");
				setText("");
				setLinks("");
				setImages([]);
				setValue([]);
				setItems([
					{ label: "Відпочинок", value: "#відпочинок" },
					{ label: "Натхнення", value: "#натхнення" },
					{ label: "Життя", value: "#життя" },
					{ label: "Природа", value: "#природа" },
					{ label: "Спокій", value: "#спокій" },
					{ label: "Читання", value: "#читання" },
					{ label: "Гармонія", value: "#гармонія" },
					{ label: "Музика", value: "#музика" },
					{ label: "Фільми", value: "#фільми" },
					{ label: "Подорожі", value: "#подорожі" },
				]);
				changeVisibility();
				Alert.alert("Успіх", "Публікацію успішно створено");
			} else {
				Alert.alert(
					"Помилка",
					response.message || "Не вдалося створити публікацію"
				);
			}
		} catch (err) {
			console.error("[refetch] Ошибка в процессе создания поста:", err);
			Alert.alert(
				"Помилка",
				`Не вдалося створити публікацію: ${
					err instanceof Error ? err.message : "Невідома помилка"
				}`
			);
		} finally {
			setIsLoading(false);
		}
	};

	const handleSubmitWithRefetch = async () => {
		await handleSubmit();
		console.log(
			"[refetch] Запрос на создание стал успешным, запуск refetch"
		);
		const updatedPosts = await refetch();
		console.log(
			`[refetch] Обновленный список содержит ${
				updatedPosts?.length || 0
			} постов`
		);
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
							const imageUrl = `data:image/${
								asset.mimeType?.split("/")[1] || "jpeg"
							};base64,${base64String}`;
							console.log(
								"[MyPublicationModal] Додано зображення:",
								imageUrl.slice(0, 50),
								"..."
							);

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
											`[MyPublicationModal] Помилка визначення розмірів: ${error}`
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
								userPostId: 0,
							};
						})
				);

				const filteredImages = newImages.filter(
					(img): img is IPostImg => img !== null
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
					console.log(
						"[MyPublicationModal] Оновлений список зображень:",
						updatedImages
					);
					return updatedImages;
				});
			} else if (result.canceled) {
				Alert.alert("Скасовано", "Вибір зображень було скасовано");
			}
		} catch (error) {
			console.error(
				"[MyPublicationModal] Помилка вибору зображення:",
				error
			);
			Alert.alert(
				"Помилка",
				`Не вдалося вибрати зображення: ${
					error instanceof Error ? error.message : "Невідома помилка"
				}`
			);
		}
	}

	const removeImage = (index: number) => {
		setImages((prev) => prev.filter((_, i) => i !== index));
	};

	const isValidUrl = (url: string): boolean => {
		const urlPattern = /^(https?:\/\/)([\w.-]+)\.([a-z]{2,})(\/.*)?$/i;
		return urlPattern.test(url);
	};

	const renderImages = () => {
		if (images.length === 0) {
			return <Text style={styles.noImagesText}>Додайте зображення</Text>;
		}

		return (
			<View style={styles.imageGrid}>
				{images.map((img, idx) => {
					const isValidImage =
						img.url.startsWith("data:image/") ||
						img.url.startsWith("http");
					if (!isValidImage) {
						console.error(
							`[ChangePostModal] Некоректний URL зображення: ${img.url}`
						);
						return null;
					}
					return (
						<View
							key={`image-${img.id}-${idx}`}
							style={styles.imageContainer}
						>
							<Image
								source={{ uri: img.url }}
								style={styles.imageAdded}
								resizeMode="cover"
								onError={(e) => {
									console.error(
										`[ChangePostModal] Помилка завантаження зображення: ${img.url}`,
										e.nativeEvent
									);
								}}
								onLoad={() =>
									console.log(
										`[ChangePostModal] Зображення завантажено: ${img.url.slice(
											0,
											20
										)}...`
									)
								}
							/>
							<TouchableOpacity
								style={styles.removeImageButton}
								onPress={() => removeImage(idx)}
							>
								<Image
									source={require("../../../shared/ui/images/trash.png")}
									width={20}
									height={20}
									style={{
										width: 22,
										height: 22,
									}}
								/>
							</TouchableOpacity>
						</View>
					);
				})}
			</View>
		);
	};

	return (
		<Modal
		
			animationType="fade"
			transparent={true}
			visible={modalVisible}
			onRequestClose={changeVisibility}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<View style={styles.header}>
						<Text style={styles.modalTitle}>
							Створення публікації
						</Text>
						<Pressable onPress={changeVisibility}>
							<Cross style={{ width: 15, height: 15 }} />
						</Pressable>
					</View>
					<ScrollView
						overScrollMode="never"
						style={styles.scrollArea}
						keyboardShouldPersistTaps="handled"
					>
						<View style={styles.form}>
							<Input
								style={{ width: "100%" }}
								label="Назва публікації"
								placeholder="Напишіть назву публікації"
								value={name}
								onChangeText={setName}
								maxLength={100}
							/>
							<Input
								style={{ width: "100%" }}
								label="Тема публікації"
								placeholder="Напишіть тему публікації"
								value={theme}
								onChangeText={setTheme}
								maxLength={60}
							/>
							<View>
								<TextInput
									style={styles.textArea}
									placeholder="Введіть опис публікації"
									value={text}
									onChangeText={setText}
									multiline
									maxLength={2000}
									textAlignVertical="top"
									autoCapitalize="sentences"
								/>
							</View>
							<Input
								style={{ width: "100%" }}
								label="Посилання"
								placeholder="Ваше посилання..."
								value={links}
								onChangeText={setLinks}
								keyboardType="url"
							/>
							<View style={{ width: "100%", zIndex: 1000 }}>
								<DropDownPicker
									open={open}
									value={value}
									items={items}
									setOpen={setOpen}
									setValue={setValue}
									setItems={setItems}
									multiple={true}
									min={0}
									max={10}
									mode="BADGE"
									badgeDotColors={["#543C52"]}
									badgeStyle={{
										backgroundColor: "#E9E5EE",
										padding: 4,
										borderRadius: 8,
										minHeight: 20,
									}}
									placeholder="Оберіть або додайте теги"
									searchable={true}
									searchPlaceholder="Пошук або створення тегу..."
									listMode="SCROLLVIEW"
									scrollViewProps={{
										nestedScrollEnabled: true,
									}}
									addCustomItem={true}
									maxHeight={200}
									zIndex={1000}
									dropDownContainerStyle={{
										maxHeight: 250,
										borderColor: "#543C52",
										zIndex: 1000,
										flex: 1,
									}}
									onChangeValue={(newValue) => {
										console.log(
											"[ChangePostModal] Selected tags:",
											newValue
										);
									}}
									onChangeSearchText={(text) => {
										const sanitizedText = text.trim();
										if (
											sanitizedText &&
											!items.some(
												(item) =>
													item.value === sanitizedText
											) &&
											sanitizedText.length <= 50
										) {
											setItems((prev) => [
												...prev,
												{
													label: sanitizedText,
													value: sanitizedText,
												},
											]);
										}
									}}
								/>
							</View>
							<View
								style={{
									flexDirection: "row",
									flexWrap: "wrap",
									gap: 8,
									marginTop: 5,
								}}
							>
								{value.map((tag, index) => (
									<View
										key={`${tag}-${index}`}
										style={{
											backgroundColor: "#E9E5EE",
											paddingHorizontal: 12,
											paddingVertical: 6,
											borderRadius: 15,
											flexDirection: "row",
											alignItems: "center",
											gap: 8,
										}}
									>
										<Text
											style={{
												color: "#543C52",
												fontSize: 14,
											}}
										>
											{tag}
										</Text>
										<TouchableOpacity
											onPress={() =>
												setValue((prev) =>
													prev.filter(
														(_, i) => i !== index
													)
												)
											}
										>
											<Text
												style={{
													color: "#543C52",
													fontSize: 14,
												}}
											>
												×
											</Text>
										</TouchableOpacity>
									</View>
								))}
							</View>
						</View>
						<Text style={styles.imageSectionTitle}>
							Зображення ({images.length}/10)
						</Text>
						{renderImages()}
						<View style={styles.actions}>
							<TouchableOpacity
								style={{
									alignItems: "center",
								}}
								onPress={onSearch}
							>
								<Image
									source={require("../../../shared/ui/images/pictures-modal.png")}
									style={styles.icon}
								/>
							</TouchableOpacity>
							<TouchableOpacity>
								<Image
									source={require("../../../shared/ui/images/smile-modal.png")}
									style={styles.icon}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								style={[
									styles.submitButton,
									isLoading && { opacity: 0.7 },
								]}
								onPress={handleSubmitWithRefetch}
								disabled={isLoading}
							>
								{isLoading ? (
									<ActivityIndicator color="#fff" />
								) : (
									<>
										<Text style={styles.submitText}>
											Публікація
										</Text>
										<SendArrow
											style={{ width: 20, height: 20 }}
										/>
									</>
								)}
							</TouchableOpacity>
						</View>
					</ScrollView>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
	},
	modalView: {
		width: "100%",
		maxHeight: "80%",
		backgroundColor: "white",
		borderRadius: 20,
		padding: 15,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	modalTitle: {
		fontSize: 24,
		fontWeight: "500",
		color: "#070A1C",
	},
	form: {
		width: "100%",
		gap: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	textArea: {
		width: "100%",
		minHeight: 120,
		minWidth: 300,
		padding: 16,
		borderWidth: 1,
		borderColor: "#CDCED2",
		borderRadius: 10,
		fontSize: 16,
		backgroundColor: "#f9f9f9",
	},
	actions: {
		gap: 16,
		marginTop: 20,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
	},
	addImageButton: {
		backgroundColor: "#f0f0f0",
		padding: 12,
		borderRadius: 8,
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#ddd",
	},
	addImageText: {
		color: "#333",
		fontWeight: "500",
		fontSize: 16,
	},
	submitButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#543C52",
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 1234,
		gap: 8,
		minWidth: 130,
	},
	submitText: {
		color: "white",
		fontSize: 14,
		fontWeight: "500",
		flexShrink: 1,
	},
	scrollArea: {
		flexGrow: 1,
	},
	imageGrid: {
		flexDirection: "column",
		gap: 8,
	},
	imageContainer: {
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
	},
	imageAdded: {
		width: "100%",
		height: 225,
		borderRadius: 16,
	},
	removeImageButton: {
		position: "absolute",
		top: 10,
		right: 10,
		backgroundColor: "white",
		width: 30,
		height: 30,
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#543C52",
	},
	noImagesText: {
		fontSize: 16,
		color: "#666",
		textAlign: "center",
		marginVertical: 10,
	},
	imageSectionTitle: {
		fontSize: 16,
		fontWeight: "600",
		marginTop: 20,
		marginBottom: 10,
		color: "#333",
	},
	selectedTagsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginTop: 10,
		gap: 8,
	},
	tag: {
		backgroundColor: "#EEE",
		borderRadius: 12,
		paddingHorizontal: 10,
		paddingVertical: 4,
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	tagText: {
		color: "#333",
		fontSize: 14,
	},
	removeTagText: {
		color: "#333",
		fontSize: 14,
	},
	icon: {
		width: 40,
		height: 40,
	},
});
