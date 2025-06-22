import { ScrollView, View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import { styles } from "./all.style";
import { FriendsForm } from "../friends-form/friends-form";
import { useUsers } from "../../hooks/useUsers";
import { useUserContext } from "../../../auth/context/user-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { IUser } from "../../../auth/types";

export function AllFriends({ scrollable = true, limit = undefined }: { scrollable?: boolean; limit?: number }) {
    const { users } = useUsers();
    const { user } = useUserContext();
    const [correctUsers, setCorrectUsers] = useState<IUser[]>([])

    useEffect(() => {
        if (!user) return;
        const cUsers = users.filter((userC) => userC.id !== user.id);
        setCorrectUsers(cUsers);
    }, [users, user]);

    useEffect(()=>{
        console.log("=======================")
        console.log(correctUsers)
    },[correctUsers])

    const displayedUsers = limit ? correctUsers.slice(0, limit) : correctUsers;
    

    async function handleRequest(userId: number) {
        try {
            if (!user) return;
            const token = await AsyncStorage.getItem("token");
            if (!token) {
                Alert.alert("Помилка", "Користувач не авторизований");
                return;
            }

            const response = await fetch(
                `http://192.168.1.104:3000/friendship/create`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        idFrom: user.id,
                        status: false,
                        userId: userId,
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
                <Text style={[styles.text, { color: "#070A1C" }]}>Всі друзі</Text>
                <TouchableOpacity>
                    <Text style={[styles.text, { color: "#543C52" }]}>Дивитись всі</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={displayedUsers}
                scrollEnabled={false}
                keyExtractor={(item) => `${item.id}`}
                contentContainerStyle={{ gap: 10, flexGrow: 1 }}
                renderItem={({ item }) => (
                    <FriendsForm
                        {...item}
                        actionButton={{
                            label: "Додати",
                            onPress: () => {
                                console.log(item.id)
                                handleRequest(item.id)},
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