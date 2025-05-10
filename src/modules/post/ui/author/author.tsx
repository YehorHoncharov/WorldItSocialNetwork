import { View, Image, Text, TouchableOpacity } from "react-native";
import Dots from "../../../../shared/ui/icons/dots";
import { styles } from "./author.styles";

export function Author() {
	return (
		<View style={styles.container}>
			<View style={styles.main}>
				<View style={styles.contant}>
					<View style={{ position: "relative" }}>
						<Image
							style={{ width: 46, height: 46 }}
							source={require("../../../../shared/ui/images/karen.png")}
						/>
						<Image
							style={{
								width: 20,
								height: 20,
								position: "absolute",
								top: 27,
								left: 27,
							}}
							source={require("../../../../shared/ui/images/avatar-indicator.png")}
						/>
					</View>

					<Text>X_AE_A-13</Text>
				</View>

				<Image
					style={{ height: 50, width: 130.83 }}
					source={require("../../../../shared/ui/images/signature.png")}
				/>
			</View>
			<View>
				<TouchableOpacity>
					<Dots style={{ height: 20, width: 20, paddingTop: 20 }} />
				</TouchableOpacity>
			</View>
		</View>
	);
}
