import { ScrollView, View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { FriendsForm } from "../friends-form/friends-form";
import { useUserContext } from "../../../auth/context/user-context";
import { styles } from "./recomend.style";
import { useUsers } from "../../hooks/useUsers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../../auth/types";

export function RecomendFriends({ scrollable = true }: { scrollable?: boolean }) {
    const { users } = useUsers();
    const { user } = useUserContext();

    async function handleRequest(userTo: IUser) {
        try {
            if (!user) return;
            const token = await AsyncStorage.getItem("token");
            if (!token) {
                Alert.alert("Помилка", "Користувач не авторизований");
                return;
            }

            const response = await fetch(
                `http://192.168.1.106:3000/friendship/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        profile1: user,
                        profile2: userTo,
                        status: false,
                    }),
                }
            );

            const result = await response.json();

            if (result.status === "error") {
                Alert.alert("Помилка", result.message);
                return;
            }

            Alert.alert("Успіх", "Запит відправлено");
        } catch (error) {
            Alert.alert("Помилка", "Не вдалося зберегти дані");
        }
    }

    const content = (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Text style={[styles.text, { color: "#070A1C" }]}>Рекомендації</Text>
                <TouchableOpacity>
                    <Text style={[styles.text, { color: "#543C52" }]}>Дивитись всі</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={users}
                scrollEnabled={false}
                keyExtractor={(item) => `${item.id}`}
                contentContainerStyle={{ gap: 10, flexGrow: 1 }}
                renderItem={({ item }) => (
                    <FriendsForm
                        {...item}
                        actionButton={{
                            label: "Додати",
                            onPress: () => handleRequest(item),
                        }}
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

    return scrollable ? <ScrollView overScrollMode="never">{content}</ScrollView> : content;
}