import { View, Image, Text } from "react-native";
import { useUserContext } from "../../../auth/context/user-context";
import { styles } from "./friend.styles";
import { IUser } from "../../../auth/types";
import { API_BASE_URL } from '../../../../settings';
import { MessagePayload } from "../../types/socket";

interface IFriendProps {
    user: {
        name: string,
        image: string
    },
    lastMessage?: string
    messageDate?: Date | null
}

export function Friend2(props: IFriendProps) {

    const formatMessageTime = (sent_at: Date | string) => {
        const date = new Date(sent_at)
        return date.toLocaleTimeString("uk-UA", { hour: "2-digit", minute: "2-digit" })
    }


    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: API_BASE_URL + "/" + "uploads/group.png"
                }}
                style={styles.avatar}
            />
            <View style={styles.textBox}>
                <View style={styles.messageBox}>
                    <Text style={styles.name}>{props.user?.name || "Anonymous"}</Text>
                    <Text style={{ color: "#81818D", fontSize: 12, fontWeight: 400 }}>{props.messageDate?.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    })}</Text>
                </View>

                <Text style={{ fontSize: 14, fontWeight: 400 }}>{props.lastMessage}</Text>
            </View>
        </View>
    );
}
