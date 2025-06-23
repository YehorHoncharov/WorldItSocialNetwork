import {
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Alert,
    RefreshControl,
} from "react-native";
import { FriendsForm } from "../friends-form/friends-form";
import { useUserContext } from "../../../auth/context/user-context";
import { styles } from "./recomend.style";
import { useUsers } from "../../hooks/useUsers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser } from "../../../auth/types";
import { useCallback, useEffect, useState } from "react";
import { useFriends } from "../../hooks/useFriends";

export function RecomendFriends({
    scrollable = true,
    limit = undefined,
}: {
    scrollable?: boolean;
    limit?: number;
}) {
    const { users } = useUsers();
    const { user } = useUserContext();
    const { refetchFriends } = useFriends()
    const { refetchUsers } = useUsers()
    const [correctUsers, setCorrectUsers] = useState<IUser[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const displayedUsers = limit ? correctUsers.slice(0, limit) : correctUsers;

    useEffect(() => {
        if (!user) return;
        

         const friendIds = [
          ...(user.friendship_to?.map(f => f.profile1_id) || []),
          ...(user.friendship_from?.map(f => f.profile2_id) || [])
        ];

        // исключаем самого себя и друзей
        const filtered = users.filter(u =>
          u.id !== user.id && !friendIds.includes(u.id)
        );

        setCorrectUsers(filtered);
        
      
    }, [users, user]);

    async function handleRequest(userTo: IUser) {
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
                        profile2_id: userTo.id,
                        accepted: false,
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

    const onRefresh = useCallback(async () => {
      setRefreshing(true);
      try {
        await refetchFriends();
        await refetchUsers()
      } catch (error) {
        console.error(" Ошибка при обновлении:", error);
        Alert.alert("Ошибка", "Не удалось обновить данные. Попробуйте снова.");
      } finally {
        setRefreshing(false);
      }
    }, [refetchFriends, refetchUsers]);

    const content = (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Text style={[styles.text, { color: "#070A1C" }]}>Рекомендації</Text>
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
                            onPress: () => handleRequest(item),
                        }}
                        deleteId={item.id}
                    />
                )}
                  refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={["#543C52"]}
                    progressBackgroundColor="#e9e5ee"
                  />
                }
                ListEmptyComponent={
                    <View>
                        <Text>Немає друзів</Text>
                    </View>
                }
            />
        </View>
    );

    return scrollable ? (
        <ScrollView overScrollMode="never">{content}</ScrollView>
    ) : (
        content
    );
}
