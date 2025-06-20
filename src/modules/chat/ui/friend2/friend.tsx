import { View, Image, Text } from "react-native";
import { useUserContext } from "../../../auth/context/user-context";
import { styles } from "./friend.styles";
import { IUser } from "../../../auth/types";
import { API_BASE_URL } from '../../../../settings';

export function Friend2({ user }: { user: IUser }) {
    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri:
                        API_BASE_URL + "/" + user?.image
                }}
                style={styles.avatar}
            />
            <View style={styles.textBox}>
                <View style={styles.messageBox}>
                    <Text style={styles.name}>{user?.name || "Anonymous"}</Text>
                    <Text style={{color: "#81818D", fontSize: 12, fontWeight: 400}}>10:00</Text>
                </View>

                <Text style={{fontSize: 14, fontWeight: 400}}>Привіт! Як справи?</Text>
            </View>
        </View>
    );
}
