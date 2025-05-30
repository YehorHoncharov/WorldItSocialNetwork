import { View, Text } from "react-native";
import { Input } from "../../../../shared/ui/input";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../../../shared/ui/button";
import { styles } from "./login-form-one.styles";
import { ILogin } from "./login-form-one.types";
import { useUserContext } from "../../context/user-context";


export function LoginFormOne() {
	const { control, handleSubmit } = useForm<ILogin>();

	// const [isEnabled, setIsEnabled] = useState(false);
	// const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
	const { login } = useUserContext();

	function onNext(data: ILogin) {
		const { password, ...email } = data;
		login(email.email, password);
	}


	return (
		<View style={styles.container}>
	
			<View style={styles.signUpText}>
				<Text style={styles.signUp}>Раді тебе знову бачити!</Text>
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
								placeholder="you@example.com"
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
								placeholder="Введи пароль"
								onChange={field.onChange}
								onChangeText={field.onChange}
								value={field.value}
								error={fieldState.error?.message}
							/>
						);
					}}
				/>
			</View>
			<Button label="Увійдіть" onPress={handleSubmit(onNext)}></Button>
			<Text>--  aбо увійдіть за допомогою QR-коду --</Text>
		</View>
	);
}
