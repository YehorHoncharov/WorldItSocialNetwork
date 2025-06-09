import { View, Text } from "react-native";
import { Input } from "../../../../shared/ui/input";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../../../shared/ui/button";
import { styles } from "./login-form-one.styles";
import { ILogin } from "./login-form-one.types";
import { useUserContext } from "../../context/user-context";
import { useRouter } from "expo-router";


export function LoginFormOne() {
	const { control, handleSubmit } = useForm<ILogin>();

	const { login } = useUserContext();
	const router = useRouter()

	function onNext(data: ILogin) {
		const { password, ...email } = data;
		login(email.email, password);
		router.navigate({pathname: "/home"})
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

// import { View, Text, Alert } from "react-native";
// import { Input } from "../../../../shared/ui/input";
// import { Controller, useForm } from "react-hook-form";
// import { Button } from "../../../../shared/ui/button";
// import { styles } from "./login-form-one.styles";
// import { ILogin } from "./login-form-one.types";
// import { useUserContext } from "../../context/user-context";
// import { useRouter } from "expo-router";
// import { useState, useEffect } from "react";

// export function LoginFormOne() {
//   const { control, handleSubmit, formState: { errors } } = useForm<ILogin>();
//   const { login, user } = useUserContext();
//   const router = useRouter();
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     if (user) {
//       router.navigate("/home");
//     }
//   }, [user, router]);

//   const onNext = async (data: ILogin) => {
//     setIsLoading(true);
//     try {

//       await login(data.email, data.password);
//       console.log("[LoginFormOne] Login completed, waiting for user update");
//     } catch (error: any) {
//       console.error("[LoginFormOne] Login error:", error);
//       Alert.alert("Помилка", error.message || "Не вдалося увійти. Спробуйте ще раз.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.signUpText}>
//         <Text style={styles.signUp}>Раді тебе знову бачити!</Text>
//       </View>

//       <View>
//         <Controller
//           control={control}
//           name="email"
//           rules={{
//             required: { value: true, message: "Email is required" },
//             pattern: {
//               value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//               message: "Invalid email format",
//             },
//           }}
//           render={({ field, fieldState }) => (
//             <Input
//               placeholder="you@example.com"
//               value={field.value}
//               onChange={field.onChange}
//               onChangeText={field.onChange}
//               error={fieldState.error?.message}
//             />
//           )}
//         />
//         <Controller
//           control={control}
//           name="password"
//           rules={{
//             required: { value: true, message: "Password is required" },
//             minLength: { value: 5, message: "Password must be at least 5 characters" },
//           }}
//           render={({ field, fieldState }) => (
//             <Input.Password
//               placeholder="Введи пароль"
//               onChange={field.onChange}
//               onChangeText={field.onChange}
//               value={field.value}
//               error={fieldState.error?.message}
//             />
//           )}
//         />
//       </View>
//       <Button
//         label={isLoading ? "Завантаження..." : "Увійдіть"}
//         onPress={handleSubmit(onNext)}
//         disabled={isLoading}
//       />
//       <Text>-- або увійдіть за допомогою QR-коду --</Text>
//     </View>
//   );
// }