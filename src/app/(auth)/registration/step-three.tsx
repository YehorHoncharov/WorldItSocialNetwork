import { router } from "expo-router";
import {
	SafeAreaView,
	Text,
	TouchableOpacity,
	View,
	ScrollView,
} from "react-native";
import { Button } from "../../../shared/ui/button";
import { RegFormThree } from "../../../modules/auth/ui/reg-form-three";
import { COLORS } from "../../../shared/ui/colors";
import GoBackArrowIcon from "../../../shared/ui/icons/go-back-arrow";

export default function RegThree() {
	function onPress() {
		router.back();
	}

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "#ffffff" }}>
			<ScrollView
				contentContainerStyle={{
					flex: 1,
				}}
			>
				<RegFormThree />
			</ScrollView>
		</SafeAreaView>
	);
}
