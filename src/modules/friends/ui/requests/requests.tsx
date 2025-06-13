import { ScrollView, View, Text, TouchableOpacity, FlatList } from "react-native";
import { styles } from "./requests.style";
import { FriendsForm } from "../friends-form/friends-form";
import { useUserContext } from "../../../auth/context/user-context";
import { useUsers } from "../../hooks/useUsers";
import { useFriends } from "../../hooks/useFriends";
import { useEffect, useState } from "react";
import { IFriendship } from "../../types//friends.type";
import { IUser } from "../../../auth/types/user";

export function RequestsFriends() {
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
    return (
        <ScrollView>

            <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <Text style={[styles.text, { color: "#070A1C" }]}>Запити</Text>
                <TouchableOpacity>
                    <Text style={[styles.text, { color: "#543C52" }]}>
                        Дивитись всі
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={userFriends}
                scrollEnabled={false}
                keyExtractor={(item) => `${item.id}`}
                contentContainerStyle={{ gap: 10, paddingBottom: 100 }}
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
        </ScrollView>
        
    );
}