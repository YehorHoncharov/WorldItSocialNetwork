import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { styles } from "./requests.style";
import { FriendsForm } from "../friends-form/friends-form";
import { useUserContext } from "../../../auth/context/user-context";

export function RequestsFriends() {

const { user } = useUserContext()

	return (
		<View style={styles.container}>
			<View style={styles.buttonContainer}>
				<Text style={[styles.text, { color: "#070A1C" }]}>
					Запити
				</Text>
				<TouchableOpacity>
					<Text style={[styles.text, { color: "#543C52" }]}>
						Дивитись всі
					</Text>
				</TouchableOpacity>
			</View>
			<ScrollView style={{ flexGrow: 1 }} overScrollMode="never">
				<View style={{ gap: 10 }}>
					{!user ? <Text>None</Text> :
					<View>
						<FriendsForm id={user.id} email={user.email} password={user.password}/>
						<FriendsForm id={user.id} email={user.email} password={user.password}/>
						<FriendsForm id={user.id} email={user.email} password={user.password}/> 
					</View>}
					
				</View>
			</ScrollView>
		</View>
	);
}
