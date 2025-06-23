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
    const [displayedUsers, setDisplayedUsers] = useState<IUser[]>()

    useEffect(() => {
        if (!user) return;
        const cUsers = users.filter((userC) => userC.id !== user.id );
        setDisplayedUsers(cUsers);
    }, [users, user]);

    useEffect(() => {

        if (!user || !user.friendship_to)
            return;

        const myFriends = users.filter((userF) =>
            user.friendship_to?.some(
                (f) => f.accepted === true && f.profile1_id === userF.id 
            )
        );
        const friendsToAdd = users.filter((userF) =>
            user.friendship_from?.some(
                (f) => f.accepted === true && f.profile2_id === userF.id 
            )
        );
        
        const finalFriends = myFriends.concat(friendsToAdd)

        setDisplayedUsers(limit ? finalFriends.slice(0, limit) : finalFriends)
    }, [users, user]);
    

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
                            label: "Профіль",
                            onPress: undefined
                        }}
                        deleteId={item.id}
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