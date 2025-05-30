import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./all.style";
import { FriendsForm } from "../friends-form/friends-form";

export function AllFriends() {
	return (
		<View style={styles.container}>
			<View style={styles.buttonContainer}>
				<Text style={[styles.text, { color: "#070A1C" }]}>
					Всі друзі
				</Text>
				<TouchableOpacity>
					<Text style={[styles.text, { color: "#543C52" }]}>
						Дивитись всі
					</Text>
				</TouchableOpacity>
			</View>
			<ScrollView style={{ flexGrow: 1 }} overScrollMode="never">
				<View style={{ gap: 10 }}>
					<FriendsForm />
					<FriendsForm />
					<FriendsForm />
				</View>
			</ScrollView>
		</View>
	);
}
