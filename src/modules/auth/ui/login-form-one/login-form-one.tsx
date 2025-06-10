// import { View, Text } from "react-native";
// import { Input } from "../../../../shared/ui/input";
// import { Controller, useForm } from "react-hook-form";
// import { Button } from "../../../../shared/ui/button";
// import { styles } from "./login-form-one.styles";
// import { ILogin } from "./login-form-one.types";
// import { useUserContext } from "../../context/user-context";
// import { useRouter } from "expo-router";


// export function LoginFormOne() {
// 	const { control, handleSubmit } = useForm<ILogin>();

// 	const { login } = useUserContext();
// 	const router = useRouter()

// 	function onNext(data: ILogin) {
// 		const { password, ...email } = data;
// 		login(email.email, password);
// 		router.navigate({pathname: "/home"})
// 	}


// 	return (
// 		<View style={styles.container}>

// 			<View style={styles.signUpText}>
// 				<Text style={styles.signUp}>Раді тебе знову бачити!</Text>
// 			</View>

// 			<View>
// 				<Controller
// 					control={control}
// 					name="email"
// 					rules={{
// 						required: {
// 							value: true,
// 							message: "Email is required",
// 						},
// 					}}
// 					render={({ field, fieldState }) => {
// 						return (
// 							<Input
// 								placeholder="you@example.com"
// 								value={field.value}
// 								onChange={field.onChange}
// 								onChangeText={field.onChange}
// 								error={fieldState.error?.message}
// 							/>
// 						);
// 					}}
// 				/>
// 				<Controller
// 					control={control}
// 					rules={{
// 						required: {
// 							value: true,
// 							message: "Password is required",
// 						},
// 					}}
// 					name="password"
// 					render={({ field, fieldState }) => {
// 						return (
// 							<Input.Password
// 								placeholder="Введи пароль"
// 								onChange={field.onChange}
// 								onChangeText={field.onChange}
// 								value={field.value}
// 								error={fieldState.error?.message}
// 							/>
// 						);
// 					}}
// 				/>
// 			</View>
// 			<Button label="Увійдіть" onPress={handleSubmit(onNext)}></Button>
// 			<Text>--  aбо увійдіть за допомогою QR-коду --</Text>
// 		</View>
// 	);
// }

import { View, Text, Alert } from "react-native";
import { Input } from "../../../../shared/ui/input";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../../../../shared/ui/button";
import { styles } from "./login-form-one.styles";
import { ILogin } from "./login-form-one.types";
import { useUserContext } from "../../context/user-context";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export function LoginFormOne() {
  const { control, handleSubmit, formState: { errors } } = useForm<ILogin>({
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const { user, isAuthenticated, login } = useUserContext();
  const router = useRouter();

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      router.replace("/home");
    }
  }, [isAuthenticated, user, router]);

  // Show error if exists
  //   useEffect(() => {
  //     if (error) {
  //       Alert.alert("Помилка", error);
  //     }
  //   }, [error]);

  const onNext = async (data: ILogin) => {
    try {
      await login(data.email, data.password);
      // Navigation will be handled by the useEffect above
    } catch (err) {
      // Errors are already handled in the context
      console.log("Login error:", err);
    }
  };

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
            required: "Email обов'язковий",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Невірний формат email"
            }
          }}
          render={({ field, fieldState }) => (
            <Input
              placeholder="you@example.com"
              value={field.value}
              onChangeText={field.onChange}
              error={fieldState.error?.message}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{
            required: "Пароль обов'язковий",
            minLength: {
              value: 5,
              message: "Пароль повинен містити щонайменше 5 символів"
            }
          }}
          render={({ field, fieldState }) => (
            <Input.Password
              placeholder="Введи пароль"
              onChangeText={field.onChange}
              value={field.value}
              error={fieldState.error?.message}
            />
          )}
        />
      </View>
      <Button
        label={"Увійти"}
        onPress={handleSubmit(onNext)}
      />
      <Text>-- або увійдіть за допомогою QR-коду --</Text>
    </View>
  );
}