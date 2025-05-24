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
} from "react-native";
import Cross from "../../../shared/ui/icons/cross";
import { Input } from "../../../shared/ui/input";
import { POST } from "../../../shared/api/post";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserContext } from "../../../modules/auth/context/user-context";

interface Props {
	modalVisible: boolean;
	changeVisibility: () => void;
}

export function RegStepTwoModal({ modalVisible, changeVisibility }: Props) {
	const [name, setName] = useState("");
	const [surname, setSurname] = useState("");
	const [username, setUsername] = useState("");
	const [tokenUser, setTokenUser] = useState<string>("");
	const { user } = useUserContext();
	// const [open, setOpen] = useState(false);

	// const { refetch } = usePosts();

	const getToken = async (): Promise<string> => {
		const token = await AsyncStorage.getItem("token");
		return token || "";
	};

	useEffect(() => {
		getToken().then(setTokenUser);
	}, []);

	const handleSubmit = async () => {
		console.log("[refetch] Начало обработки submit");
		if (!name || !surname || !username) {
			Alert.alert("Помилка", "Будь ласка, заповніть обов'язкові поля");
			return;
		}

		if (!user) {
            console.log("[refetch] Пользователь не найден, выход из функции");
			return;

		}

		try {

			console.log("[refetch] Отправка запроса на создание поста");
			await POST({
				endpoint: "http://192.168.1.104:3000/user/reg",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${tokenUser}`,
				},
				token: tokenUser,
				body: {
					name,
					surname,
					username
				},
			});

			setName("");
			setSurname("");
			setUsername("");
			changeVisibility();


			Alert.alert("заєбок");
		} catch (err) {
			console.error("[refetch] Ошибка в процессе создания поста:", err);
			console.error("Помилка при регістрації:", err);
			Alert.alert("Помилка", "Не вдалося зареєструватися. Спробуйте ще раз.");
		}
	};

	// async function handleSubmitWithRefetch() {
	// 	handleSubmit();
	// 	console.log(
	// 		"[refetch] Запрос на создание поста успешен, запуск refetch"
	// 	);
	// 	// const updatedPosts = await refetch();
	// 	console.log(
	// 		`[refetch] Обновленный список содержит ${
	// 			updatedPosts?.length || 0
	// 		} постов`
	// 	);
	// 	// refetch();
	// }

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
							Додай деталі про себе
						</Text>
						<Pressable onPress={changeVisibility}>
							<Cross style={{ width: 15, height: 15 }} />
						</Pressable>
					</View>

					<ScrollView style={styles.scrollArea}>
						<View style={styles.form}>
							<Input
								width={343}
								label="Ім'я"
								placeholder="Введіть ваше ім'я"
								value={name}
								onChangeText={setName}
							/>
							<Input
								width={343}
								label="Прізвище"
								placeholder="@"
								value={surname}
								onChangeText={setSurname}
							/>
							<Input
								width={343}
								label="Ім'я користувача"
								placeholder="Введіть ваш юзернейм"
								value={username}
								onChangeText={setUsername}
							/>
                            <Text style={{fontSize: 12}}>Або оберіть:<Text style={{fontSize: 12, color: "green"}}>(Запропоновані варіанти відповідно до Ім’я та Прізвища)</Text></Text>
						</View>

						<View style={styles.actions}>
							<View style={styles.iconRow}>
								<TouchableOpacity>
									<Image
										source={require("../../../shared/ui/images/smile-modal.png")}
										style={styles.icon}
									/>
								</TouchableOpacity>
								<TouchableOpacity
									style={styles.submitButton}
									onPress={handleSubmit}
								>
									<Text style={styles.submitText}>
										Продовжити
									</Text>
								</TouchableOpacity>
							</View>
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
		padding: 20,
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
		gap: 5,
		marginBottom: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	textArea: {
		width: 343,
		minHeight: 100,
		padding: 16,
		borderWidth: 1,
		borderColor: "#CDCED2",
		borderRadius: 10,
		fontSize: 16,
	},
	actions: {
		gap: 16,
		marginTop: 16,
	},
	iconRow: {
		flexDirection: "row",
		justifyContent: "flex-end",
		gap: 16,
	},
	icon: {
		width: 40,
		height: 40,
	},
	submitButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#543C52",
		padding: 12,
		borderRadius: 1234,
		gap: 8,
	},
	submitText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	scrollArea: {
		flexGrow: 0,
	},

	imageGrid: {
		flexDirection: "column",
		gap: 8,
		alignItems: "center",
		justifyContent: "center",
	},
	imageAdded: {
		width: 343,
		height: 225,
		borderRadius: 16,
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
	},
	tagText: {
		color: "#333",
		fontSize: 14,
	},
});
