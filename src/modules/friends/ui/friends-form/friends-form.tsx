import { View, Image, Text, TouchableOpacity } from "react-native";
import { Button } from "../../../../shared/ui/button";
import { styles } from "./friends-form-style";
import OfflineIcon from "../../../../shared/ui/icons/offline-circle";

export function FriendsForm() {
	return (
		<View style={styles.container}>

			<View style={styles.profileContainer}>
				<Image style={styles.profileImage} source={require("../../../../shared/ui/images/yehor.png")} />
				<OfflineIcon style={styles.imageOnline} />
			</View>

			<View style={styles.textContainer}>
				<Text style={styles.nameText}>Yehor Aung</Text>
				<Text style={styles.usernameText}>@thelili</Text>
			</View>

			<View style={styles.buttonsContainer}>
                <Button style={styles.confirmButton} label="Підтвердити"/>
                <TouchableOpacity style={styles.deleteButton}>
                    <Text style={styles.buttonDeleteText}>Видалити</Text>
                </TouchableOpacity>
            </View>

		</View>
	);
}
