import { View, Text, TouchableOpacity, Image } from "react-native";
import { Input } from "../../../../shared/ui/input";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { styles } from "./reg-form-two.style";
import { COLORS } from "../../../../shared/ui/colors";
import {
	launchImageLibraryAsync,
	requestMediaLibraryPermissionsAsync,
} from "expo-image-picker";
import { IRegister } from "../../types";
import { IRegisterAbout, IRegisterForm } from "../../types/register";
import PlusIcon from "../../../../shared/ui/icons/plus";
import { Button } from "../../../../shared/ui/button";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useUserContext } from "../../context/user-context";
import { sendCode } from "../../hooks/useCode";

const defaultImage = require("../../../../shared/ui/images/bitch.png");

export function RegFormTwo() {
	const params = useLocalSearchParams<{
		username: string;
		email: string;
		password: string;
	}>();

	const { control, handleSubmit } = useForm<IRegisterForm>();
	const [image, setImage] = useState<string>("");
	const { register } = useUserContext();

	const router = useRouter();

	function onSubmit(data: IRegisterForm) {
		const { ...rightData } = data;

		const fullParams = {
			...rightData,
			...params,
		};

		console.log(fullParams + " 111");
		sendCode(params.email);
		router.navigate({
			pathname: "/registration/step-three",
			params: fullParams,
		});
	}

	async function onSearch() {
		const result = await requestMediaLibraryPermissionsAsync();
		if (result.status === "granted") {
			const images = await launchImageLibraryAsync({
				mediaTypes: "images",
				allowsEditing: true,
				allowsMultipleSelection: false,
				selectionLimit: 1,
				base64: false,
			});

			if (images.assets) {
				setImage(images.assets[0].uri);
			}
		}
	}

	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={require("../../../../shared/ui/images/black-bitch.png")}
			/>
			<Text style={styles.headerText}>Sign up</Text>
			<Text
				style={{
					color: COLORS.grey,
					textAlign: "center",
					maxWidth: 170,
				}}
			>
				Please enter your personal information
			</Text>
			<Controller
				control={control}
				name="name"
				rules={{
					required: {
						value: true,
						message: "Name is required",
					},
					minLength: {
						value: 3,
						message: "Name must be at least 3 characters long",
					},
				}}
				render={({ field, fieldState }) => {
					return (
						<Input
							value={field.value}
							onChangeText={field.onChange}
							onChange={field.onChange}
							placeholder="Nickname"
							error={fieldState.error?.message}
						/>
					);
				}}
			/>
			<Controller
				control={control}
				name="about"
				rules={{
					required: {
						value: true,
						message: "About is required",
					},
					maxLength: {
						value: 100,
						message:
							"About must be conrain a maximum of 100 characters",
					},
				}}
				render={({ field, fieldState }) => {
					return (
						<Input
							value={field.value}
							onChange={field.onChange}
							onChangeText={field.onChange}
							placeholder="About"
							height={120}
							error={fieldState.error?.message}
						/>
					);
				}}
			/>
			<TouchableOpacity onPress={onSearch}>
				<View style={styles.imageContainer}>
					<View style={styles.imageWrapper}>
						<Image
							source={image ? { uri: image } : defaultImage}
							style={{
								width: 75,
								height: 75,
								borderRadius: 37.5,
							}}
							resizeMode="cover"
						/>
						<PlusIcon
							width={32}
							height={34}
							style={styles.searchIcon}
						/>
					</View>
					<Text style={styles.uploadText}>Add your photo</Text>
				</View>
			</TouchableOpacity>

			<Button label="Sign up" onPress={handleSubmit(onSubmit)} />
		</View>
	);
}
