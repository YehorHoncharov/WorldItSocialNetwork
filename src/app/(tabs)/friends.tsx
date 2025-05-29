import { View, Text } from "react-native";
import {FriendsForm} from "../../modules/friends/ui/friends-form/friends-form";

export default function Friends() {
    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <FriendsForm/>
        </View>
    )
}