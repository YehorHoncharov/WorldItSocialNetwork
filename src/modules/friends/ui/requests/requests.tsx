import { useEffect, useState } from "react";
import { useUsers } from "../../hooks/useUsers";
import { useUserContext } from "../../../auth/context/user-context";
import { IUser } from "../../../auth/types";
import { FlatList, TouchableOpacity, View, Text, ScrollView, Alert } from "react-native";
import { styles } from "./requests.style";
import { FriendsForm } from "../friends-form/friends-form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFriends } from "../../hooks/useFriends";

export function RequestsFriends({ scrollable = true, limit = undefined }: { scrollable?: boolean; limit?: number }) {
    const { users } = useUsers();
    const { user } = useUserContext();
    const [isLoading, setIsLoading] = useState(true);
    const [refetch, setRefetch] = useState(false);
    const [displayedUsers, setDidplayedUsers] = useState<IUser[]>()
    
    const {friends} = useFriends()

    useEffect(() => {
        setIsLoading(true);
        if (!user || !user.friendship_from)
            return;
        console.log("beeeeeeeeeee")
        console.log(users)
        const myFriends = users.filter((userF) =>
            user.friendship_from?.some(
                (f) => f.accepted === false && f.profile2_id === userF.id
            )
        );
    
        setIsLoading(false);
        setDidplayedUsers(limit ? myFriends.slice(0, limit) : myFriends)
    }, [users, user, refetch]);


    async function handleAccept(clickedUserId: number) {
        try {
            if (!user) return;
            const token = await AsyncStorage.getItem("token");
            if (!token) {
                Alert.alert("Помилка", "Користувач не авторизований");
                return;
            }

            const response = await fetch(
                `http://192.168.1.104:3000/friendship/acceptFriedship`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        //profile1 - кому, profile2 - ми
                        id: clickedUserId

                    })
                }
            );

            const result = await response.json();

            if (result.status === "error") {
                Alert.alert("Помилка", result.message);
                return;
            }

            Alert.alert("Успіх", "Запит прийнято");
            // setRefetch(!refetch)
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
                data={displayedUsers}
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
