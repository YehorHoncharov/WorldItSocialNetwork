import { RegFormOne } from "../../../modules/auth/ui/reg-form-one";
import { LoginFormOne } from "../../../modules/auth/ui/login-form-one";
import {
	Animated,
	Dimensions,
	SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
	StyleSheet,
} from "react-native";
import { Providers } from "../../providers";
import { Header } from "../../../shared/ui/header";
import { useRef, useState, useEffect } from "react";

const screenWidth = Dimensions.get("window").width;

export default function Register() {
	const [isRegister, setIsRegister] = useState(true);
	const translateX = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		translateX.setValue(0);
	}, []);

	const toggleForm = () => {
		Animated.timing(translateX, {
			toValue: isRegister ? -screenWidth : 0,
			duration: 300,
			useNativeDriver: true,
		}).start();
		setIsRegister(!isRegister);
	};

	return (
		<Providers>
			<SafeAreaView style={styles.safe}>
				<Header.HeaderSecond />
				<ScrollView contentContainerStyle={styles.scroll}>
					<View style={styles.card}>
						<View style={styles.tabContainer}>
							<TouchableOpacity
								onPress={() => !isRegister && toggleForm()}
							>
								<Text
									style={[
										styles.tabText,
										isRegister && styles.tabTextActive,
									]}
								>
									Реєстрація
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								onPress={() => isRegister && toggleForm()}
							>
								<Text
									style={[
										styles.tabText,
										!isRegister && styles.tabTextActive,
									]}
								>
									Авторизація
								</Text>
							</TouchableOpacity>
						</View>

						<View
							style={{
								width: screenWidth - 40,
								overflow: "hidden",
							}}
						>
							<Animated.View
								style={{
									flexDirection: "row",
									width: (screenWidth - 40) * 2,
									transform: [{ translateX }],
									gap: 40,
								}}
							>
								<View style={{ width: screenWidth - 40 }}>
									<RegFormOne />
								</View>
								<View
									style={{
										width: screenWidth - 40,
										alignItems: "center",
										justifyContent: "center",
									}}
								>
									<LoginFormOne />
								</View>
							</Animated.View>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		</Providers>
	);
}

const styles = StyleSheet.create({
	safe: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	tabText: {
		fontSize: 24,
		fontWeight: 500,
		color: "#81818D",
	},
	tabContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 44,
		gap: 24,
	},
	scroll: {
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#E9E5EE",
	},
	card: {
		backgroundColor: "#FFFFFF",
		borderRadius: 20,
		width: 343,
		alignItems: "center",
		justifyContent: "center",
		paddingBottom: 44,
	},
	tabTextActive: {
		color: "#070A1C",
		fontWeight: 700,
		textDecorationLine: "underline",
	},
});
