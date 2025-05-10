import { View, Text, TouchableOpacity, Switch, Image } from "react-native";
import { Input } from "../../../../shared/ui/input";
import { useForm, Controller } from "react-hook-form";
import { IRegister } from "../../types";
import { styles } from "./reg-form-one.styles";
import { useRouter } from "expo-router";
import { Button } from "../../../../shared/ui/button";
import { useState } from "react";
import { COLORS } from "../../../../shared/ui/colors";
import { sendCode } from "../../hooks/useCode";
import { HeaderRegAuth } from "../../../../shared/ui/header-reg-auth";

export function RegFormOne() {
	const { handleSubmit, control } = useForm<IRegister>();
	const router = useRouter();
	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

	function onSubmit(data: IRegister) {
		const { ...rightData } = data;
		if (rightData.password === rightData.passwordConfirm) {
			sendCode(rightData.email)
			router.navigate({
			pathname: "/registration/step-three",
			params: rightData,
		});
		}
		
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
				<View style={styles.signUpText}></View>

				<Text style={styles.signUp}>Приєднуйся до World IT</Text>
			</View>

			<View>
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
								label = "Електронна пошта"
								placeholder="you@example.com"
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
					name="password"
					rules={{
						required: {
							value: true,
							message: "Password is required",
						},
					}}
					render={({ field, fieldState }) => {
						return (
							<Input.Password
								label = "Пароль"
								placeholder="Введіть пароль"
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
					name="passwordConfirm"
					render={({ field, fieldState }) => {
						return (
							<Input.Password
								label="Підтвердження паролю"
								placeholder="Повторіть пароль"
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
				<Button onPress={handleSubmit(onSubmit)} label="Next"></Button>
			</View>
		</View>
	);
}
