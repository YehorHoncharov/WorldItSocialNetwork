import React, { useEffect, useState } from "react";
import {
	Modal,
	Pressable,
	View,
	Text,
	TouchableOpacity,
	Image,
	TextInput,
	ScrollView,
	Alert,
	ActivityIndicator,
} from "react-native";
import {
	launchImageLibraryAsync,
	requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DropDownPicker from "react-native-dropdown-picker";
import { usePosts } from "../../hooks/use-get-post";
import { PUT } from "../../../../shared/api/put";
import Cross from "../../../../shared/ui/icons/cross";
import { Input } from "../../../../shared/ui/input";
import SendArrow from "../../../../shared/ui/icons/send-arrow";
import { styles } from "./change-post.styles";
import { IPost, IPostImg } from "../../types/post";
import { TrashIcon } from "../../../../shared/ui/icons/trash-icon";

interface TagItem {
	label: string;
	value: string;
}

interface UpdateData {
	name: string;
	theme: string;
	text: string;
	links?: string;
	tags?: string[];
	images?: {
		create?: { url: string }[];
		delete?: { id: number }[];
	};
}

interface Props {
	modalVisible: boolean;
	changeVisibility: () => void;
	postData: IPost | null;
}

export function ChangePostModal({
	modalVisible,
	changeVisibility,
	postData,
}: Props) {
	const { refetch } = usePosts();
	const [name, setName] = useState("");
	const [theme, setTheme] = useState("");
	const [text, setText] = useState("");
	const [links, setLinks] = useState("");
	const [images, setImages] = useState<IPostImg[]>([]);
	const [tokenUser, setTokenUser] = useState("");
	const [isLoading, setIsLoading] = useState(false);
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

	const API_BASE_URL = "http://192.168.1.104:3000";

	useEffect(() => {
		const loadData = async () => {
			const token = await AsyncStorage.getItem("token");
			setTokenUser(token || "");

			if (postData) {
				setName(postData.name || "");
				setTheme(postData.theme || "");
				setText(postData.text || "");
				setLinks(postData.links || "");

				const tagsFromPost = Array.from(
					new Set(
						postData.tags
							?.map((tag) => tag.tag?.name)
							.filter((tag): tag is string => tag !== null) || []
					)
				);
				console.log("[ChangePostModal] Loaded tags:", tagsFromPost);
				setValue(tagsFromPost);

				const loadedImages = postData.images
					? postData.images.map((img) => {
							const relativeUrl = img.url
								.replace(/\\/g, "/")
								.replace(/^\/?uploads\/*/i, "");
							const normalizedUrl = img.url.startsWith("http")
								? img.url
								: `${API_BASE_URL}/uploads/${relativeUrl}`;
							console.log(
								`[ChangePostModal] Normalized image URL: ${normalizedUrl}`
							);
							return {
								...img,
								url: normalizedUrl,
								rawUrl: img.url,
							};
					  })
					: [];
				console.log("[ChangePostModal] Loaded images:", loadedImages);
				setImages(loadedImages);

				const additionalTags = tagsFromPost
					.filter((tag) => !items.some((item) => item.value === tag))
					.map((tag) => ({ label: tag, value: tag }));
				setItems((prev) => [...prev, ...additionalTags]);
			}
		};

		if (modalVisible) {
			loadData();
		}
	}, [modalVisible, postData]);

	const handleSubmit = async () => {
		if (!postData || !postData.id) {
			Alert.alert("Помилка", "Дані поста або ID поста відсутні");
			return;
		}
		if (!tokenUser) {
			Alert.alert("Помилка", "Токен авторизації відсутній");
			return;
		}
		if (!name.trim() || !theme.trim() || !text.trim()) {
			Alert.alert("Помилка", "Заповніть усі обов’язкові поля");
			return;
		}
		if (links && !isValidUrl(links)) {
			Alert.alert("Помилка", "Введіть коректне посилання");
			return;
		}
		if (value.length > 10) {
			Alert.alert("Помилка", "Максимум 10 тегів");
			return;
		}

		const sanitizedTags = value
			.map((tag) => tag.trim())
			.filter((tag) => tag.length > 0 && tag.length <= 50);

		if (sanitizedTags.length !== value.length) {
			Alert.alert(
				"Помилка",
				"Теги повинні бути не довшими за 50 символів"
			);
			return;
		}

		const updatedData: UpdateData = {
			name: name.trim(),
			theme: theme.trim(),
			text: text.trim(),
			...(links ? { links: links.trim() } : {}),
			tags: sanitizedTags,
		};

		const existingImages = postData.images || [];
		console.log("[ChangePostModal] Existing images:", existingImages);
		console.log("[ChangePostModal] Current images state:", images);

		const persistedImages = images.filter((img) =>
			existingImages.some(
				(pi) => pi.id === img.id && pi.url === img.rawUrl
			)
		);
		console.log("[ChangePostModal] Persisted images:", persistedImages);

		const newImages = images
			.filter((img) => img.url.startsWith("data:image"))
			.map((img) => {
				const matches = img.url.match(
					/^data:image\/(\w+);base64,(.+)$/
				);
				if (
					!matches ||
					!["jpeg", "png", "gif"].includes(matches[1].toLowerCase())
				) {
					console.error(
						`[ChangePostModal] Непідтримуваний формат зображення: ${img.url.slice(
							0,
							20
						)}...`
					);
					return null;
				}
				const base64Data = matches[2];
				const estimatedSizeInBytes = (base64Data.length * 3) / 4;
				if (estimatedSizeInBytes > 5 * 1024 * 1024) {
					console.error(
						`[ChangePostModal] Зображення занадто велике: ${img.url.slice(
							0,
							20
						)}...`
					);
					return null;
				}
				return { url: img.url };
			})
			.filter((img): img is { url: string } => img !== null);

		const deletedImages = existingImages
			.filter((pi) => !persistedImages.some((img) => img.id === pi.id))
			.map((pi) => ({ id: pi.id }));
		console.log("[ChangePostModal] Images to delete:", deletedImages);

		if (newImages.length + persistedImages.length > 10) {
			Alert.alert("Помилка", "Максимум 10 зображень дозволено");
			return;
		}

		if (newImages.length > 0 || deletedImages.length > 0) {
			updatedData.images = {
				...(newImages.length > 0 ? { create: newImages } : {}),
				...(deletedImages.length > 0 ? { delete: deletedImages } : {}),
			};
		}

		setIsLoading(true);
		try {
			console.log(
				"[ChangePostModal] Відправка запиту:",
				JSON.stringify(updatedData, null, 2)
			);
			const response = await PUT<IPost>({
				endpoint: `${API_BASE_URL}/posts/${postData.id}`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${tokenUser}`,
				},
				body: updatedData,
			});

			console.log("[ChangePostModal] Відповідь:", response);

			if (response.status === "success") {
				Alert.alert("Успіх", "Пост успішно оновлено");
				await refetch();
				changeVisibility();
			} else {
				Alert.alert(
					"Помилка",
					response.message || "Не вдалося оновити пост"
				);
			}
		} catch (error) {
			console.error("[ChangePostModal] Помилка:", error);
			Alert.alert(
				"Помилка",
				`Не вдалося оновити пост: ${
					error instanceof Error ? error.message : "Невідома помилка"
				}`
			);
		} finally {
			setIsLoading(false);
		}
	};

	const onSearch = async () => {
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

				const newImages: IPostImg[] = result.assets
					.map((asset, index) => {
						const type =
							asset.mimeType?.split("/")[1]?.toLowerCase() || "";
						if (!asset.base64 || !allowedFormats.includes(type)) {
							console.error(
								`[ChangePostModal] Некоректний формат зображення: ${type}`
							);
							return null;
						}
						const base64String = asset.base64;
						const estimatedSizeInBytes =
							(base64String.length * 3) / 4;
						if (estimatedSizeInBytes > maxSizeInBytes) {
							console.error(
								`[ChangePostModal] Зображення занадто велике: ${Math.round(
									estimatedSizeInBytes / 1024 / 1024
								)} МБ`
							);
							return null;
						}
						const url = `data:image/${type};base64,${base64String}`;
						console.log(
							`[ChangePostModal] Додано зображення: ${url.slice(
								0,
								20
							)}...`
						);
						return {
							id: Date.now() + index,
							url,
							rawUrl: url,
							userPostId: postData?.id || 0,
						} as IPostImg;
					})
					.filter((img): img is IPostImg => img !== null);

				if (images.length + newImages.length > 10) {
					Alert.alert(
						"Увага",
						"Максимальна кількість зображень - 10"
					);
					return;
				}

				setImages((prev) => [...prev, ...newImages]);
			} else if (result.canceled) {
				Alert.alert("Скасовано", "Вибір зображень було скасовано");
			}
		} catch (error) {
			console.error(
				"[ChangePostModal] Помилка вибору зображення:",
				error
			);
			Alert.alert(
				"Помилка",
				`Не вдалося вибрати зображення: ${
					error instanceof Error ? error.message : "Невідома помилка"
				}`
			);
		}
	};

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
									source={require("../../../../shared/ui/images/trash.png")}
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

	if (!postData) {
		return null;
	}

	return (
		<Modal
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={changeVisibility}
		>
			<View style={styles.centeredView}>
				<View style={styles.modalView}>
					<View style={styles.header}>
						<Text style={styles.modalTitle}>
							Редагувати публікацію
						</Text>
						<Pressable onPress={changeVisibility}>
							<Cross style={{ width: 15, height: 15 }} />
						</Pressable>
					</View>

					<ScrollView
						style={styles.scrollArea}
						contentContainerStyle={{ paddingBottom: 20 }}
						keyboardShouldPersistTaps="handled"
					>
						<View
							style={{
								gap: 15,
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Input
								label="Назва"
								placeholder="Введіть назву публікації"
								value={name}
								onChangeText={setName}
								maxLength={100}
							/>
							<Input
								label="Тема"
								placeholder="Введіть тему публікації"
								value={theme}
								onChangeText={setTheme}
								maxLength={60}
							/>
							<TextInput
								style={{
									minHeight: 120,
									borderWidth: 1,
									borderColor: "#ddd",
									borderRadius: 10,
									padding: 12,
									fontSize: 16,
									width: "100%",
									backgroundColor: "#f9f9f9",
								}}
								placeholder="Опис публікації*"
								value={text}
								onChangeText={setText}
								multiline
								textAlignVertical="top"
								maxLength={2000}
							/>
							<Input
								label="Посилання"
								placeholder="https://example.com"
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

						<Text
							style={{
								fontSize: 16,
								fontWeight: "600",
								marginTop: 20,
								marginBottom: 10,
								color: "#333",
							}}
						>
							Зображення ({images.length}/10)
						</Text>
						{renderImages()}

						<View
							style={{
								marginTop: 20,
								gap: 15,
								flexDirection: "column",
							}}
						>
							<TouchableOpacity
								style={{
									alignItems: "center",
								}}
								onPress={onSearch}
							>
								<Image
									source={require("../../../../shared/ui/images/pictures-modal.png")}
									style={styles.icon}
								/>
							</TouchableOpacity>
							<TouchableOpacity>
								<Image
									source={require("../../../../shared/ui/images/smile-modal.png")}
									style={styles.icon}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								style={[
									{
										backgroundColor: "#543C52",
										padding: 15,
										borderRadius: 8,
										flexDirection: "row",
										justifyContent: "center",
										alignItems: "center",
										gap: 10,
                    width: 130,
                    height: 40
									},
									isLoading && { opacity: 0.7 },
								]}
								onPress={handleSubmit}
								disabled={isLoading}
							>
								{isLoading ? (
									<ActivityIndicator color="#fff" />
								) : (
									<>
										<Text
											style={{
												color: "white",
												fontWeight: "bold",
												fontSize: 16,
											}}
										>
											Оновити публікацію
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
