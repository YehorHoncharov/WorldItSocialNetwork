import { View, Image, Text, TouchableOpacity, Alert } from "react-native";
import { IUser } from "../../../auth/types";
import { styles } from "./friends-form-style";
import OfflineIcon from "../../../../shared/ui/icons/offline-circle";
import { Button } from "../../../../shared/ui/button";
import { useRouter } from "expo-router";
import { useUserContext } from "../../../auth/context/user-context";
import { API_BASE_URL } from "../../../../settings";

type FriendsFormProps = IUser & {
    actionButton: {
        label: string;
        onPress: () => void;
    };
};

export function FriendsForm(props: FriendsFormProps) {
    const navigation = useRouter();
    const { user } = useUserContext();

    function onPress() {
        const { dateOfBirth, friendship, actionButton, ...rest } = props;

        navigation.navigate({
            pathname: "/friends-profile",
            params: {
                ...rest,
                dateOfBirth: dateOfBirth ? new Date(dateOfBirth).toISOString() : undefined
            },
        });
    }

    return (
        <TouchableOpacity
            style={[styles.container, { flexShrink: 0 }]}
            onPress={onPress}
        >
            <View style={styles.profileContainer}>
                <Image style={styles.profileImage} source={{ uri: API_BASE_URL+"/"+props.image }} />
                <OfflineIcon style={styles.imageOnline} />
            </View>

            <View style={styles.textContainer}>
                <Text style={styles.nameText}>
                    {props.name} {props.surname}
                </Text>
                <Text style={styles.usernameText}>@{props.username}</Text>
            </View>

            <View style={styles.buttonsContainer}>
                <Button
                    style={styles.confirmButton}
                    label={props.actionButton.label}
                    onPress={props.actionButton.onPress}
                />
                <TouchableOpacity style={styles.deleteButton}>
                    <Text style={styles.buttonDeleteText}>Видалити</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
}
