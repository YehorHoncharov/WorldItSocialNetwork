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
  const { control, handleSubmit } = useForm<ILogin>({
    defaultValues: {
      username: "",
      password: ""
    }
  });

  const { user, isAuthenticated, login } = useUserContext();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/home");
    }
  }, [isAuthenticated, user, router]);


  const onNext = async (data: ILogin) => {
    try {
      await login(data.username, data.password);
    } catch (err) {
      console.log("login error:", err);
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
          name="username"
          rules={{
            required: "Username обов'язковий",
            
          }}
          render={({ field, fieldState }) => (
            <Input
              placeholder="@username"
              value={field.value}
              onChangeText={field.onChange}
              error={fieldState.error?.message}
              autoCapitalize="none"
          
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