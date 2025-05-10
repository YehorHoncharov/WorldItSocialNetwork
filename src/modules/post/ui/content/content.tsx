import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./content.styles";
import Like from "../../../../shared/ui/icons/like";

export function Content() {
	return (
		<View style={styles.container}>
			<View style={styles.textContainer}>
				<Text style={{ fontSize: 14 }}>
					Інколи найкращі ідеї народжуються в тиші 🌿 Природа, книга і
					спокій — усе, що потрібно, аби перезавантажитись.
				</Text>
				<Text style={{ fontSize: 14 }}>
					#відпочинок #натхнення #життя #природа #читання #спокій
					#гармонія
				</Text>
			</View>
			<View style={styles.imageCont}>
				<Image
					style={styles.imageLarge}
					source={require("./../../../../shared/ui/images/picture-one.png")}
				/>
				<Image
					style={styles.imageLarge}
					source={require("./../../../../shared/ui/images/picture-two.png")}
				/>
				<Image
					style={styles.imageSmall}
					source={require("./../../../../shared/ui/images/picture-three.png")}
				/>
				<Image
					style={styles.imageSmall}
					source={require("./../../../../shared/ui/images/picture-four.png")}
				/>
				<Image
					style={styles.imageSmall}
					source={require("./../../../../shared/ui/images/picture-five.png")}
				/>
			</View>

			<View
				style={{
					flexDirection: "row",
					gap: 24,
					alignSelf: "flex-start",
					paddingLeft: 16,
				}}
			>
				<View style={styles.postButs}>
					<TouchableOpacity>
						<Like width={20} height={20} />
					</TouchableOpacity>
					<Text style={{ fontSize: 14 }}>120 Вподобань</Text>
				</View>
				<View style={styles.postButs}>
					<TouchableOpacity>
						<Image
							style={{ width: 20, height: 20 }}
							source={require("./../../../../shared/ui/images/eye.png")}
						/>
					</TouchableOpacity>
					<Text style={{ fontSize: 14 }}>890 Переглядів</Text>
				</View>
			</View>
		</View>
	);
}
