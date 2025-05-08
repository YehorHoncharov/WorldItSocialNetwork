import { View, Text, TouchableOpacity, Switch, Image } from "react-native";
import { Input } from "../../../../shared/ui/input";
import { useForm, Controller } from "react-hook-form";
import { IRegister } from "../../types";
import { styles } from "./reg-form-one.styles";
import { useRouter } from "expo-router";
import { Button } from "../../../../shared/ui/button";
import { useState } from "react";
import { COLORS } from "../../../../shared/ui/colors";

export function RegFormOne() {
	const { handleSubmit, control } = useForm<IRegister>();
	const router = useRouter();
	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

	function onSubmit(data: IRegister) {
		const { ...rightData } = data;
		router.navigate({
			pathname: "/registration/step-two",
			params: rightData,
		});
		// console.log(data)
	}

	return (
		<View style={styles.container}>
			<View
				style={{
					gap: 10,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Image
					style={styles.image}
					source={require("./../../../../shared/ui/images/sign-in-image.png")}
				/>
				<View style={styles.signUpText}></View>

				<Text style={styles.signUp}>Sign up</Text>
				<View style={{ alignItems: "center" }}>
					<Text style={{ opacity: 0.4 }}>
						Please enter your username
					</Text>
					<Text style={{ opacity: 0.4 }}>email and password</Text>
				</View>
			</View>

			<View>
				<Controller
					control={control}
					name="username"
					rules={{
						required: {
							value: true,
							message: "Username is required",
						},
					}}
					render={({ field, fieldState }) => {
						return (
							<Input
								placeholder="Username"
								value={field.value}
								onChangeText={field.onChange}
								onChange={field.onChange}
								error={fieldState.error?.message}
							/>
						);
					}}
				/>
				<Controller
					control={control}
					name="email"
					rules={{
						required: {
							value: true,
							message: "Email is required",
						},
					}}
					render={({ field, fieldState }) => {
						return (
							<Input
								placeholder="Email"
								value={field.value}
								onChangeText={field.onChange}
								onChange={field.onChange}
								error={fieldState.error?.message}
							/>
						);
					}}
				/>
				<Controller
					control={control}
					rules={{
						required: {
							value: true,
							message: "Password is required",
						},
					}}
					name="password"
					render={({ field, fieldState }) => {
						return (
							<Input.Password
								placeholder="Password"
								onChange={field.onChange}
								onChangeText={field.onChange}
								value={field.value}
								error={fieldState.error?.message}
							/>
						);
					}}
				/>
			</View>

			<View style={{ gap: 10 }}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: 7,
					}}
				>
					<Switch
						trackColor={{ false: "#ccc", true: "#6366f1" }}
						thumbColor={isEnabled ? "#fff" : "#fff"}
						ios_backgroundColor="#ccc"
						onValueChange={toggleSwitch}
						value={isEnabled}
					/>
					<Text style={{ color: COLORS.blue }}>
						Keep me signed in
					</Text>
				</View>
				<Button onPress={handleSubmit(onSubmit)} label="Next"></Button>
			</View>
		</View>
	);
}
