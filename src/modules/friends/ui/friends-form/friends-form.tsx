import { View, Image, Text, TouchableOpacity } from "react-native";
import { Button } from "../../../../shared/ui/button";
import { styles } from "./friends-form-style";
import OfflineIcon from "../../../../shared/ui/icons/offline-circle";
import { IUser } from "../../../auth/types";


export function FriendsForm(props: IUser) {
    return (
        <View style={[styles.container, { flexShrink: 0 }]}>
            <View style={styles.profileContainer}>
                <Image
                    style={styles.profileImage}
                    source={{uri: props.image}}
                />
                <OfflineIcon style={styles.imageOnline} />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.nameText}>{props.name} {props.surname}</Text>
                <Text style={styles.usernameText}>@{props.username}</Text>
            </View>

            <View style={styles.buttonsContainer}>
                <Button style={styles.confirmButton} label="Підтвердити" />
                <TouchableOpacity style={styles.deleteButton}>
                    <Text style={styles.buttonDeleteText}>Видалити</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}