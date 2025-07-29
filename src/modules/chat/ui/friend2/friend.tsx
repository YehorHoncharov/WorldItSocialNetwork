import { View, Image, Text } from "react-native";
import { useUserContext } from "../../../auth/context/user-context";
import { styles } from "./friend.styles";
import { IUser } from "../../../auth/types";
import { API_BASE_URL } from '../../../../settings';

interface IFriendProps {
    user: {
        name: string,
        surname?: string,
        image: string
    },
    lastMessage?: string
    timeMessage?: string
}

export function Friend2(props: IFriendProps) {

    return (
        <View style={styles.container}>
            <Image
                source={{
                    uri: API_BASE_URL + "/" + props.user?.image
                }}
                style={styles.avatar}
            />
            <View style={styles.textBox}>
                <View style={styles.messageBox}>
                    {props.user?.surname ?
                        <Text style={styles.name}>{props.user?.name + " " + props.user?.surname}</Text> :
                        <Text style={styles.name}>{props.user?.name}</Text>}
                    <Text style={{ color: "#81818D", fontSize: 12, fontWeight: 400 }}>
                        {props.timeMessage ? new Date(props.timeMessage).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                    </Text>
                </View>
                {props.lastMessage && props.lastMessage.length >= 76 ? (
                    <Text style={{ fontSize: 14, fontWeight: 400 }}>{props.lastMessage.slice(0, 76)}..</Text>
                ) : <Text style={{ fontSize: 14, fontWeight: 400 }}>{props.lastMessage}</Text>}
            </View>
        </View>
    );
}
