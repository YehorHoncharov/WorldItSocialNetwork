import { useEffect, useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import { useUserContext } from "../../../auth/context/user-context";
import { IUser } from "../../../auth/types";
import { FlatList, TouchableOpacity, View, Text, ScrollView, Alert } from "react-native";
import { styles } from "./requests.style";
import { FriendsForm } from "../friends-form/friends-form";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function RequestsFriends({ scrollable = true }: { scrollable?: boolean }) {
    const { users } = useUsers();
    const { user } = useUserContext();
    const [userFriends, setUserFriends] = useState<IUser[]>([]);

    useEffect(() => {
        if (!user || !user.friendship) return;

        const myFriends = users.filter((userF) =>
            user.friendship?.some(
                (f) => f.status === false && f.idFrom === userF.id
            )
        );

        setUserFriends(myFriends);
    }, [users, user]);

    async function handleAccept(friendId: number) {
        try {
            if (!user) return;
            const token = await AsyncStorage.getItem("token");
            if (!token) {
                Alert.alert("Помилка", "Користувач не авторизований");
                return;
            }

            const response = await fetch(
                `http://192.168.1.104:3000/friendship/accept/${friendId}`, 
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const result = await response.json();

            if (result.status === "error") {
                Alert.alert("Помилка", result.message);
                return;
            }

            Alert.alert("Успіх", "Запит прийнято");
        } catch (error) {
            Alert.alert("Помилка", "Не вдалося підтвердити запит");
        }
    }

    const content = (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Text style={[styles.text, { color: "#070A1C" }]}>Запити</Text>
                <TouchableOpacity>
                    <Text style={[styles.text, { color: "#543C52" }]}>Дивитись всі</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={userFriends}
                scrollEnabled={false}
                keyExtractor={(item) => `${item.id}`}
                contentContainerStyle={{ gap: 10, flexGrow: 1 }}
                renderItem={({ item }) => (
                    <FriendsForm
                        {...item}
                        actionButton={{
                            label: "Підтвердити",
                            onPress: () => handleAccept(item.id),
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
