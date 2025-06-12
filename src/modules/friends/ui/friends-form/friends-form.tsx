import { View, Image, Text, TouchableOpacity, Alert } from "react-native";
import { IUser } from "../../../auth/types";
import { styles } from "./friends-form-style";
import OfflineIcon from "../../../../shared/ui/icons/offline-circle";
import { Button } from "../../../../shared/ui/button";
import { useRouter } from "expo-router";
import { useUserContext } from "../../../auth/context/user-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
;

export function FriendsForm(props: IUser) {
    const navigation = useRouter();
    const {user} = useUserContext()
    function onPress() {
        const { dateOfBirth, ...rest } = props;

        navigation.navigate({
            pathname: "/friends-profile",
            params: {
                ...rest,
                dateOfBirth: dateOfBirth?.toISOString()
            },
    });
}
    async function handleRequest(){
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
					headers: { "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                     },
					body: JSON.stringify({
						idFrom: user.id,
                        status: false,
                        userId: props.id
					}),
				}
			);
			const result = await response.json();

			if (result.status === "error") {
				Alert.alert("Помилка", result.message);
				return;
			}
		} catch (error) {
			Alert.alert("Помилка", "Не вдалося зберегти дані");
		}
    }

    return (
        <TouchableOpacity style={[styles.container, { flexShrink: 0 }]} onPress={onPress}>
            <View style={styles.profileContainer}>
                <Image
                    style={styles.profileImage}
                    source={{ uri: props.image }}
                />
                <OfflineIcon style={styles.imageOnline} />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.nameText}>{props.name} {props.surname}</Text>
                <Text style={styles.usernameText}>@{props.username}</Text>
            </View>

            <View style={styles.buttonsContainer}>
                <Button style={styles.confirmButton} label="Додати" onPress={handleRequest}/>
                <TouchableOpacity style={styles.deleteButton} >
                    <Text style={styles.buttonDeleteText}>Видалити</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}