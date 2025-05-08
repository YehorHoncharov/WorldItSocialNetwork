import { View, Image, Text, Switch } from "react-native";
import { Input } from "../../../../shared/ui/input";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../../../shared/ui/button";
import { styles } from "./login-form-one.styles";
import { useState } from "react";
import { router } from "expo-router";
import { ILogin } from "./login-form-one.types";
import { useUserContext } from "../../context/user-context";

export function LoginFormOne() {
	const { control, handleSubmit } = useForm<ILogin>();

	const [isEnabled, setIsEnabled] = useState(false);
	const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
	const { login } = useUserContext();

	function onNext(data: ILogin) {
		const {password ,...email } = data;
		login(email.email, password);
		// router.navigate({ pathname: "/login/login-two", params: email });
	}

	return (
		<View style={styles.container}>
			<Image
				style={styles.image}
				source={require("./../../../../shared/ui/images/sign-in-image.png")}
			/>

			<View style={styles.signUpText}>
				<Text style={styles.signUp}>Sign in</Text>
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
								onChange={field.onChange}
								onChangeText={field.onChange}
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
					<Text style={{ color: "#4B56D2" }}>Keep me signed in</Text>
				</View>
				<Button label="Next" onPress={handleSubmit(onNext)}></Button>
			</View>
		</View>
	);
}
