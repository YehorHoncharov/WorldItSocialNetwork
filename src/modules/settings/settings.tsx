import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Input } from "../../shared/ui/input";
import { styles } from "./settings.styles";
import { useUserContext } from "../auth/context/user-context";
import { useRouter } from "expo-router";

import { useEffect, useRef, useState } from "react";
import { SignaturePad, SignaturePadRef } from "./signature/signature";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PencilIcon from "../../shared/ui/icons/pencil";
import { Controller, useForm } from "react-hook-form";
import { IUser } from "../auth/types";

export function Settings() {
	const { control, handleSubmit } = useForm<IUser>({
  defaultValues: {
    dateOfBirth: new Date(),
  }})
	const { user } = useUserContext();
	const [name, setName] = useState("");
	const [username, setUsername] = useState("");
	const [surname, setSurname] = useState("");
	const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date());
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [signature, setSignature] = useState("");
	const [tokenUser, setTokenUser] = useState("");

	const [isEditing, setIsEditing] = useState(false);

	const router = useRouter();
	const [isDrawing, setIsDrawing] = useState(false);
	const signatureRef = useRef<SignaturePadRef>(null);

	function handleEditToggle() {
		setIsEditing(!isEditing);
	}

	async function handleSave(data: IUser) {
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
						dateOfBirth: data.dateOfBirth,
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
			const token = await AsyncStorage.getItem("token");
			setTokenUser(token || "");

			if (user) {
				setName(user.name || "");
				setUsername(user.username || "");
				setSurname(user.surname || "");
				setDateOfBirth(user.dateOfBirth || new Date());
				setEmail(user.email || "");
				setPassword(user.password || "");
				setSignature(user.signature || "");
			}
		}
		loadData();
	}, [user]);

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
						<Image
							source={require("../../shared/ui/images/pencil-in-circle.png")}
							style={styles.pencilImage}
						/>
					</View>

					<View style={{ gap: 24, alignItems: "center" }}>
						<Image
							source={require("../../shared/ui/images/avatar.png")}
							style={{ width: 96, height: 96 }}
						/>
						<View style={{ gap: 10, padding: 16 }}>
							<Text
								style={{
									fontSize: 24,
									color: "#070A1C",
									fontWeight: "700",
								}}
							>
								Lina Li
							</Text>
							{/* <Text style={{ fontSize: 24, color: "#070A1C", fontWeight: "700" }}>{user.name}</Text>  */}
							<Text
								style={{
									fontSize: 16,
									color: "#070A1C",
									fontWeight: "500",
								}}
							>
								@thelili
							</Text>
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
									{/* <Image
									source={require("../../shared/ui/images/pencil-in-circle.png")}
									style={styles.pencilImage}
									/> */}
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
							render={({ field, fieldState }) => {
								return (
									<Input
										width={343}
										label="Дата народження"
										placeholder="Введіть вашу дату народження"
										value={field.value?.toString()} 
      									onChangeText={(text) => field.onChange(new Date(text))}
										editable={isEditing}
									/>
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
