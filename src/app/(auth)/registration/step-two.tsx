import { RegFormTwo } from "../../../modules/auth/ui/reg-form-two";
import { router } from "expo-router";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../../../shared/ui/colors";
import GoBackArrowIcon from "../../../shared/ui/icons/go-back-arrow";
import {
	SafeAreaView,
	ScrollView,
	Text,
	Image,
	TouchableOpacity,
} from "react-native";
export default function Register() {
	function onBack() {
		router.back();
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
			<ScrollView
				contentContainerStyle={{
					flex: 1,
				}}
			>
				<TouchableOpacity
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginTop: 25,
						paddingLeft: 10,
					}}
					onPress={() => onBack()}
				>
					<GoBackArrowIcon width={25} height={20} />
					<Text style={{ color: COLORS.plum, fontSize: 16 }}>
						Go back
					</Text>
				</TouchableOpacity>
				<RegFormTwo />
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	image: {
		height: 58,
		width: 107,
	},
});
