import {
	View,
	Text,
	Image,
	TouchableOpacity,
	ScrollView,
	Alert,
	Pressable,
	Platform,
} from "react-native";
import { Input } from "../../shared/ui/input";
import { styles } from "./settings.styles";
import { useUserContext } from "../auth/context/user-context";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { SignaturePad, SignaturePadRef } from "./signature/signature";
import PencilIcon from "../../shared/ui/icons/pencil";
import { Controller, useForm } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
	launchImageLibraryAsync,
	requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { API_BASE_URL } from "../../settings";

interface IUserForm {
	id: number;
	first_name?: string;
	username?: string;
	last_name?: string;
	date_of_birth?: Date | null;
	email: string;
	password: string;
	signature?: string;
	avatar?: string;
}

export function Settings() {
	const { control, handleSubmit, reset, setValue } = useForm<IUserForm>();
	const { user, setUser } = useUserContext();
	const [isEditing, setIsEditing] = useState(false);
	const [isEditing2, setIsEditing2] = useState(false);
	const router = useRouter();
	const [isDrawing, setIsDrawing] = useState(false);
	const signatureRef = useRef<SignaturePadRef>(null);

	function handleEditToggle() {
		setIsEditing(!isEditing);
	}
	function isValidDate(date: any): date is Date {
		return date instanceof Date && !isNaN(date.getTime());
	}

	async function handleSave(data: IUserForm) {
		try {
			if (!user) return;

			const formData = new FormData();

			// Додаємо текстові поля
			formData.append('first_name', data.first_name || '');
			formData.append('username', data.username || '');
			formData.append('last_name', data.last_name || '');
			formData.append('email', data.email || '');
			formData.append('password', data.password || '');

			if (data.date_of_birth && isValidDate(data.date_of_birth)) {
				formData.append('date_of_birth', data.date_of_birth.toISOString());
			} else {
				formData.append('date_of_birth', '');
			}

			// Додаємо аватар, якщо він змінився
			if (typeof data.avatar === 'string' && data.avatar.startsWith('file:')) {
				const file = {
					uri: data.avatar,
					type: 'image/jpeg',
					name: 'avatar.jpg',
				};
				formData.append('avatar', file as any);
			}

			const response = await fetch(
				`${API_BASE_URL}/user/${user.id}`,
				{
					method: "PUT",
					body: formData,
					headers: {
						'Accept': 'application/json',
					},
				}
			);

			const result = await response.json();

			if (result.status === "error") {
				Alert.alert("Помилка", result.message);
				return;
			}

			// Оновлюємо контекст користувача
			if (result.data) {
				setUser(result.data);
			}

			setIsEditing(false);
			setIsEditing2(false);
			Alert.alert("Успіх", "Дані успішно оновлено");
		} catch (error) {
			Alert.alert("Помилка", "Не вдалося зберегти дані");
			console.error("Update error:", error);
		}
	}

	function handleEditToggle2() {
		setIsEditing2(!isEditing2);
	}

	useEffect(() => {
		if (user) {
			reset({
				first_name: user.auth_user.first_name || "",
				username: user.auth_user.username || "",
				last_name: user.auth_user.last_name || "",
				date_of_birth: user.auth_user.date_of_birth ? new Date(user.auth_user.date_of_birth) : null,
				email: user.auth_user.email || "",
				password: user.auth_user.password || "",
				signature: user.signature || "",
				avatar: (user.avatar?.length ?? 0) > 0
					? `${API_BASE_URL}/${user.avatar![0].image}`
					: "",
			});
		}
	}, [user, reset]);

	async function onSearch() {
		try {
			const { status } = await requestMediaLibraryPermissionsAsync();
			if (status !== "granted") {
				Alert.alert(
					"Дозвіл не надано",
					"Для додавання зображення необхідно надати доступ до галереї"
				);
				return null;
			}

			const result = await launchImageLibraryAsync({
				mediaTypes: ["images"],
				quality: 0.8,
				allowsEditing: true,
				aspect: [1, 1],
				base64: false,
			});

			if (result.canceled || !result.assets || result.assets.length === 0) {
				return null;
			}

			const asset = result.assets[0];
			return asset.uri;
		} catch (error) {
			Alert.alert(
				"Помилка",
				`Не вдалося вибрати зображення: ${error instanceof Error ? error.message : "Невідома помилка"}`
			);
			return null;
		}
	}

	if (!user) {
		return (
			<View style={[styles.container, { justifyContent: "center", alignItems: "center", flex: 1 }]}>
				<Text style={{ fontSize: 18, textAlign: "center", marginBottom: 20 }}>
					Ви не авторизовані
				</Text>
				<TouchableOpacity style={styles.authButton} onPress={() => router.navigate("/registration/step-one")}>
					<Text style={styles.authButtonText}>Увійти або зареєструватись</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<ScrollView
			contentContainerStyle={{ paddingBottom: 30, marginTop: 10, alignItems: "center", justifyContent: "center", backgroundColor: "#E9E5EE" }}
			scrollEnabled={!isDrawing}
			keyboardShouldPersistTaps="handled"
			overScrollMode="never"
		>
			<View style={{ gap: 8, width: "90%", alignItems: "center", justifyContent: "center" }}>
				{/* Перший блок - Картка профілю */}
				<View style={styles.container}>
					<View style={styles.userInfoFirst}>
						<Text style={styles.userInfoText}>Картка профілю</Text>
						<TouchableOpacity onPress={isEditing ? handleSubmit(handleSave) : handleEditToggle}>
							{isEditing ? (
								<View style={styles.buttonSave}>
									<PencilIcon width={15} height={15} />
									<Text style={{ color: "#543C52", fontWeight: "500" }}>Зберегти</Text>
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
						<Controller
							control={control}
							name="avatar"
							render={({ field }) => (
								<TouchableOpacity
									onPress={async () => {
										if (!isEditing) return;
										const selectedImage = await onSearch();
										if (selectedImage) {
											field.onChange(selectedImage);
										}
									}}
									disabled={!isEditing}
								>
									<Image
										source={
											field.value
												? { uri: field.value }
												: require("../../shared/ui/images/avatar.png")
										}
										style={{ width: 100, height: 100, borderRadius: 48 }}
									/>
								</TouchableOpacity>
							)}
						/>
						<View style={{ gap: 10, width: "100%", alignItems: "center", marginBottom: 5 }}>
							{!isEditing && (
								<Text style={{ fontSize: 24, color: "#070A1C", fontWeight: "700" }}>
									{user.auth_user.first_name} {user.auth_user.last_name}
								</Text>
							)}

							{isEditing ? (
								<Controller
									control={control}
									name="username"
									render={({ field }) => (
										<Input
											style={{ width: "100%" }}
											label="Юзернейм"
											placeholder="Введіть ваш юзернейм"
											value={field.value}
											onChangeText={field.onChange}
											editable={isEditing}
										/>
									)}
								/>
							) : (
								<TouchableOpacity onPress={() => setIsEditing(true)}>
									<Text style={{ fontSize: 16, color: "#070A1C", fontWeight: "500", alignSelf: "center" }}>
										@{user.auth_user.username}
									</Text>
								</TouchableOpacity>
							)}
						</View>
					</View>
				</View>

				<View style={styles.container}>
					<View style={styles.userInfoFirst}>
						<Text style={styles.userInfoText}>Особиста інформація</Text>
						<TouchableOpacity onPress={isEditing2 ? handleSubmit(handleSave) : handleEditToggle2}>
							{isEditing2 ? (
								<View style={styles.buttonSave}>
									<PencilIcon width={15} height={15} />
									<Text style={{ color: "#543C52", fontWeight: "500" }}>Зберегти</Text>
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
							name="first_name"
							render={({ field }) => (
								<Input
									style={{ width: "100%" }}
									label="Ім'я"
									placeholder="Введіть ваше ім'я"
									value={field.value}
									onChangeText={field.onChange}
									editable={isEditing2}
								/>
							)}
						/>
						<Controller
							control={control}
							name="last_name"
							render={({ field }) => (
								<Input
									style={{ width: "100%" }}
									label="Прізвище"
									placeholder="Введіть ваше прізвище"
									value={field.value}
									onChangeText={field.onChange}
									editable={isEditing2}
								/>
							)}
						/>
						<Controller
							control={control}
							name="date_of_birth"
							render={({ field }) => {
								const [show, setShow] = useState(false);

								return (
									<>
										<Pressable onPress={() => isEditing2 && setShow(true)}>
											<Input
												style={{ width: "100%" }}
												label="Дата народження"
												value={field.value?.toLocaleDateString() || "Не вказано"}
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
													setShow(Platform.OS === "ios");
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
							render={({ field }) => (
								<Input
									style={{ width: "100%" }}
									label="Електронна адреса"
									placeholder="Введіть вашу електронну адресу"
									keyboardType="email-address"
									value={field.value}
									onChangeText={field.onChange}
									editable={isEditing2}
								/>
							)}
						/>
						<Controller
							control={control}
							name="password"
							render={({ field }) => (
								<Input.Password
									style={{ width: "100%" }}
									label="Пароль"
									placeholder="Введіть ваш пароль"
									value={field.value}
									onChangeText={field.onChange}
									editable={isEditing2}
								/>
							)}
						/>
					</View>
				</View>

				{/* Третій блок - Підписи */}
				<View style={styles.container}>
					<View style={styles.userInfoFirst}>
						<Text style={styles.userInfoText}>Варіанти підпису</Text>
						<Image
							source={require("../../shared/ui/images/pencil-in-circle.png")}
							style={styles.pencilImage}
						/>
					</View>
					<View style={{ gap: 24, padding: 16 }}>
						<View style={{ gap: 16 }}>
							<Text style={{ fontSize: 16, fontWeight: "500", color: "#543C52" }}>
								Ім'я та прізвище
							</Text>
							<Text style={{ fontSize: 16, fontWeight: "400", color: "#070A1C" }}>
								{user.auth_user.first_name} {user.auth_user.last_name}
							</Text>
						</View>
						<View>
							<Text style={{ fontSize: 16, fontWeight: "500", color: "#543C52", marginBottom: 10 }}>
								Мій електронний підпис
							</Text>
							<SignaturePad
								ref={signatureRef}
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