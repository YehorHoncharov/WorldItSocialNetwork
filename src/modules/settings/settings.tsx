import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from "react-native";
import { Input } from "../../shared/ui/input";
import { styles } from "./settings.styles";
import { useUserContext } from "../auth/context/user-context";
import { useRouter } from "expo-router";

import { useEffect, useRef, useState } from "react";
import { SignaturePad, SignaturePadRef } from "./signature/signature";
import PencilIcon from "../../shared/ui/icons/pencil";
import { Controller, useForm } from "react-hook-form";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, Pressable } from 'react-native';
import { launchImageLibraryAsync, requestMediaLibraryPermissionsAsync } from "expo-image-picker";
interface IUserForm{
    id: number,
    name?: string,
    username?: string,
    surname?: string,
    dateOfBirth?: Date,
    email: string,
    password: string,
    signature?: string,
}

interface IUserImg {
	id: number;
	url: string;
	userPostId: number;
}
export function Settings() {
	const [image, setImage] = useState<string>("");
	const { control, handleSubmit, reset  } = useForm<IUserForm>({
  defaultValues: {
    dateOfBirth: new Date(),
  }})
	const [imageDimensions, setImageDimensions] = useState<{
			[key: string]: { width: number; height: number };
		}>({});
	const { user } = useUserContext();

	const [isEditing, setIsEditing] = useState(false);

	const router = useRouter();
	const [isDrawing, setIsDrawing] = useState(false);
	const signatureRef = useRef<SignaturePadRef>(null);

	function handleEditToggle() {
		setIsEditing(!isEditing);
	}

	async function handleSave(data: IUserForm) {
		console.log("=============")
		console.log(data)
		console.log("=============")
		try {
			const response = await fetch(
				`http://192.168.1.104:3000/user/${user?.id}`,
				{
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						name: data.name,
						username: data.username,
						surname: data.surname,
						dateOfBirth: data.dateOfBirth ? new Date(data.dateOfBirth) : new Date(),
						email: data.email,
						password: data.password,
						signature: data.signature,
					}),
				}
			);
			const result = await response.json();
			console.log(result);
			if (result.status === "error") {
				console.log(result.message);
				return;
			}
		} catch (error) {
			console.error("Login error:", error);
		}
		setIsEditing(false);
	}

	function handlePress() {
		router.navigate("/registration/step-one");
	}

	const handleSignatureSave = (signature: string) => {
		console.log("Signature saved:", signature);
	};

	useEffect(() => {
		async function loadData() {
			if (user) {
				reset({
					name: user.name || "",
					username: user.username || "",
					surname:user.surname || "",
					dateOfBirth: user.dateOfBirth ? new Date(user.dateOfBirth): new Date(),
					email: user.email || "",
					password: user.password || "",
					signature: user.signature || ""
				})
				
			}
		}
		loadData();
	}, [user]);

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

							// Отримуємо розміри зображення
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
					(img): img is IUserImg => img !== null
				);

				if (images.length + filteredImages.length > 10) {
					Alert.alert(
						"Увага",
						"Максимальна кількість зображень - 10"
					);
					return;
				}

				setImage((prev) => {
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

	if (!user) {
		return (
			<View
				style={[
					styles.container,
					{ justifyContent: "center", alignItems: "center", flex: 1 },
				]}
			>
				<Text
					style={{
						fontSize: 18,
						textAlign: "center",
						marginBottom: 20,
					}}
				>
					Ви не авторизовані
				</Text>
				<TouchableOpacity
					style={styles.authButton}
					onPress={handlePress}
				>
					<Text style={styles.authButtonText}>
						Увійти або зареєструватись
					</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<ScrollView
			contentContainerStyle={{ paddingBottom: 30 }}
			scrollEnabled={!isDrawing}
			keyboardShouldPersistTaps="handled"
		>
			<View style={{ gap: 8 }}>
				{/* Profile Card Section */}
				<View style={styles.container}>
					<View style={styles.userInfoFirst}>
						<Text style={styles.userInfoText}>Картка профілю</Text>
						<TouchableOpacity
							onPress={
								isEditing
									? handleSubmit(handleSave)
									: handleEditToggle
							}
						>
							{isEditing ? (
								<View style={styles.buttonSave}>

									<PencilIcon width={15} height={15} />
									<Text
										style={{
											color: "#543C52",
											fontWeight: "500",
										}}
									>
										Зберегти
									</Text>
								</View>
							) : (
								<Image
									source={require("../../shared/ui/images/pencil-in-circle.png")}
									style={styles.pencilImage}
								/>
							)}
						</TouchableOpacity>
					</View>

					<View style={{ gap: 24, alignItems: "center" }}>
						<TouchableOpacity onPress={onSearch} disabled={!isEditing}>
							<Image
								source={image ? { uri: image } : require("../../shared/ui/images/avatar.png")}
								style={{ width: 96, height: 96, borderRadius: 48 }}
							/>
						</TouchableOpacity>
						<View style={{ gap: 10, padding: 16 }}>
							<Text
								style={{
									fontSize: 24,
									color: "#070A1C",
									fontWeight: "700",
								}}
							>
								{user.name} {user.surname}
							</Text>
							{/* <Text style={{ fontSize: 24, color: "#070A1C", fontWeight: "700" }}>{user.name}</Text>  */}
							{isEditing ? (
							<Controller
								control={control}
								name="username"
								render={({ field }) => (
								<Input
									width={343}
									label="Юзернейм"
									placeholder="Введіть ваш юзер"
									value={field.value}
									onChange={field.onChange}
									onChangeText={field.onChange}
									editable={isEditing}
								/>
								)}
							/>
							) : (
							<TouchableOpacity onPress={() => setIsEditing(true)}>
								<Text
								style={{
									fontSize: 16,
									color: "#070A1C",
									fontWeight: "500",
									alignSelf: "center",
								}}
								>
								@{user.username}
								</Text>
							</TouchableOpacity>
							)}
							{/* <Text style={{ fontSize: 16, color: "#070A1C", fontWeight: "500" }}>{user.username}</Text>  */}
						</View>
					</View>
				</View>

				{/* Personal Information Section */}
				<View style={styles.container}>
					<View style={styles.userInfoFirst}>
						<Text style={styles.userInfoText}>
							Особиста інформація
						</Text>
						<TouchableOpacity
							onPress={
								isEditing
									? handleSubmit(handleSave)
									: handleEditToggle
							}
						>
							{isEditing ? (
								<View style={styles.buttonSave}>

									<PencilIcon width={15} height={15} />
									<Text
										style={{
											color: "#543C52",
											fontWeight: "500",
										}}
									>
										Зберегти
									</Text>
								</View>
							) : (
								<Image
									source={require("../../shared/ui/images/pencil-in-circle.png")}
									style={styles.pencilImage}
								/>
							)}
						</TouchableOpacity>
					</View>
					<View>
						<Controller
							control={control}
							name="name"
							render={({ field, fieldState }) => {
								return (
									<Input
										width={343}
										label="Ім'я"
										placeholder="Введіть ваше ім'я"
										value={field.value}
										onChange={field.onChange}
										onChangeText={field.onChange}
										editable={isEditing}
									/>
								);
							}}
						/>
						<Controller
							control={control}
							name="surname"
							render={({ field, fieldState }) => {
								return (
									<Input
										width={343}
										label="Прізвище"
										placeholder="Введіть ваше прізвищ"
										value={field.value}
										onChange={field.onChange}
										onChangeText={field.onChange}
										editable={isEditing}
									/>
								);
							}}
						/>

						<Controller
						control={control}
						name="dateOfBirth"
						defaultValue={user?.dateOfBirth ? new Date(user.dateOfBirth) : new Date()}
						render={({ field }) => {
							const showDatepicker = () => {
							setShow(true);
							};

							const [show, setShow] = useState(false);

							return (
							<>
								<Pressable onPress={isEditing ? showDatepicker : undefined}>
								<Input
									width={343}
									label="Дата народження"
									value={field.value?.toLocaleDateString()}
									editable={false}
									pointerEvents="none"
								/>
								</Pressable>

								{show && (
								<DateTimePicker
									value={field.value || new Date()}
									mode="date"
									display={Platform.OS === "ios" ? "spinner" : "default"}
									onChange={(event, selectedDate) => {
									setShow(Platform.OS === 'ios'); 
									if (selectedDate) {
										field.onChange(selectedDate);
									}
									}}
									maximumDate={new Date()}
								/>
								)}
							</>
							);
						}}
						/>

						<Controller
							control={control}
							name="email"
							render={({ field, fieldState }) => {
								return (
									<Input
										width={343}
										label="Електронна адреса"
										placeholder="Введіть вашу електронну адресу"
										keyboardType="email-address"
										value={field.value}
										onChange={field.onChange}
										onChangeText={field.onChange}
										editable={isEditing}
									/>
								);
							}}
						/>
						<Controller
							control={control}
							name="password"
							render={({ field, fieldState }) => {
								return (
									<Input.Password
										width={343}
										label="Пароль"
										placeholder="Введіть ваш пароль"
										secureTextEntry
										editable={isEditing}
										value={field.value}
										onChange={field.onChange}
										onChangeText={field.onChange}
									/>
								);
							}}
						/>
					</View>
				</View>

				{/* Signature Options Section */}
				<View style={styles.container}>
					<View style={styles.userInfoFirst}>
						<Text style={styles.userInfoText}>
							Варіанти підпису
						</Text>
						<Image
							source={require("../../shared/ui/images/pencil-in-circle.png")}
							style={styles.pencilImage}
						/>
					</View>

					<View style={{ gap: 24, padding: 16 }}>
						<View style={{ gap: 16 }}>
							<Text
								style={{
									fontSize: 16,
									fontWeight: "500",
									color: "#543C52",
								}}
							>
								Ім'я та прізвище
							</Text>
							<Text
								style={{
									fontSize: 16,
									fontWeight: "400",
									color: "#070A1C",
								}}
							>
								Lina Li
							</Text>
						</View>

						<View>
							<Text
								style={{
									fontSize: 16,
									fontWeight: "500",
									color: "#543C52",
									marginBottom: 10,
								}}
							>
								Мій електронний підпис
							</Text>
							<SignaturePad
								ref={signatureRef}
								onSave={handleSignatureSave}
								onDrawingStart={() => setIsDrawing(true)}
								onDrawingEnd={() => setIsDrawing(false)}
							/>
						</View>
					</View>
				</View>
			</View>
		</ScrollView>
	);
}

// <Text style={{ fontSize: 24, color: "#070A1C", fontWeight: "700" }}>{user.name}</Text>
// <Text style={{ fontSize: 16, color: "#070A1C", fontWeight: "500" }}>{user.username}</Text>
// <Text style={{ fontSize: 16, color: "#070A1C", fontWeight: "500" }}>{user.dateOfBirth}</Text>
// <Text style={{ fontSize: 16, color: "#070A1C", fontWeight: "500" }}>{user.email}</Text>
// <Text style={{ fontSize: 16, color: "#070A1C", fontWeight: "500" }}>{user.password}</Text>
