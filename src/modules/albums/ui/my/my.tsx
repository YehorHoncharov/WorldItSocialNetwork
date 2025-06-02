import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { styles } from "./my.style";

export function My() {
	return (
		<View style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<View style={styles.mainBox}>
					<Text style={styles.title}>Мої фото</Text>

					<TouchableOpacity style={styles.addButton}>
						<Image
							source={require("../../../../shared/ui/images/add-picture.png")}
							style={styles.addButtonIcon}
						/>
						<Text style={styles.addButtonText}>Додати фото</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.imageContainer}>
					<Image
						source={require("../../../../shared/ui/images/avatar.png")}
						style={styles.avatar}
					/>
					<View style={styles.actionButtons}>
						<TouchableOpacity style={styles.actionButton}>
							<Image
								source={require("../../../../shared/ui/images/eye-my-publication.png")}
								style={styles.actionIcon}
							/>
						</TouchableOpacity>
						<TouchableOpacity style={styles.actionButton}>
							<Image
								source={require("../../../../shared/ui/images/trash.png")}
								style={styles.actionIcon}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}
