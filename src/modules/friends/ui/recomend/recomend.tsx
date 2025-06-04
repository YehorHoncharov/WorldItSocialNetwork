import { ScrollView, View, Text, TouchableOpacity, FlatList } from "react-native";
import { styles } from "./recomend.style";
import { FriendsForm } from "../friends-form/friends-form";
import { useUsers } from "../../hooks/useUsers";
import { useUserContext } from "../../../auth/context/user-context";

export function RecomendFriends() {
    const { users } = useUsers();
    const { user } = useUserContext();

    // const image = `${API_BASE_URL}/${user.image}` || "",

    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Text style={[styles.text, { color: "#070A1C" }]}>Рекомендації</Text>
                <TouchableOpacity>
                    <Text style={[styles.text, { color: "#543C52" }]}>
                        Дивитись всі
                    </Text>
                </TouchableOpacity>
            </View>

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
        </View>
    );
}
