import { ScrollView, View, Text, TouchableOpacity, FlatList } from "react-native";
import { styles } from "./requests.style";
import { FriendsForm } from "../friends-form/friends-form";
import { useUserContext } from "../../../auth/context/user-context";
import { useUsers } from "../../hooks/useUsers";

export function RequestsFriends() {
	const { users } = useUsers();
    const { user } = useUserContext();


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
			<View style={{ flexGrow: 1 }}>
				<View style={{ gap: 10 }}>
					{!user ? <Text>None</Text> :
					<View>
						<FlatList
							data={users}
							keyExtractor={(item) => `${item.id}`}
							contentContainerStyle={{ gap: 10, paddingBottom: 20 }}
							renderItem={({ item }) => (
								<FriendsForm
									id={item.id}
									name={item.name}
									surname={item.surname}
									username={item.username}
									email={item.email}
									image={`http://192.168.1.104:3000/${item.image}`}
									password={item.password}
										/>
									)}
									ListEmptyComponent={
										<View>
											<Text>Немає друзів</Text>
										</View>
									}
							/>
					</View>}
					
				</View>
			</View>
		</View>
	);
}
