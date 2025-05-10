import { View, Text, TouchableOpacity } from "react-native";
import { styles } from "./header-reg-auth.styles";
import { useState } from "react";
import { useRouter } from "expo-router";

type HeaderRegAuthProps = {
	activeTab: "register" | "login";
	onTabChange: (tab: "register" | "login") => void;
};

export function HeaderRegAuth({ activeTab, onTabChange }: HeaderRegAuthProps) {
	const router = useRouter();

	function onReg() {
		onTabChange("register");
		router.push({
			pathname: "/registration/step-one",
		});
	}
	function onLog() {
		onTabChange("login");
		router.push({
			pathname: "/login/login-one",
		});
	}
	return (
		<View style={styles.header}>
			<TouchableOpacity onPress={onReg}>
				<Text
					style={
						activeTab === "register"
							? styles.activeText
							: styles.inactiveText
					}
				>
					Реєстрація
				</Text>
				{activeTab === "register" && <View style={styles.underline} />}
			</TouchableOpacity>
			<TouchableOpacity onPress={onLog}>
				<Text
					style={
						activeTab === "login"
							? styles.activeText
							: styles.inactiveText
					}
				>
					Авторизація
				</Text>
				{activeTab === "login" && <View style={styles.underline} />}
			</TouchableOpacity>
		</View>
	);
}
