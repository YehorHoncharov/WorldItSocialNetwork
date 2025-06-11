import { View, Text, Alert } from "react-native";
import { useUserContext } from "../../modules/auth/context/user-context";
import { FriendProfile } from "../../modules/friends/ui/friend-profile/friend-profile";

export default function Chats() {
    const {user} = useUserContext()
    if (!user){
        Alert.alert("Будь ласка, зареєструйтесь")
        return
    } 
        
    return (
        <View>
            <FriendProfile/>
        </View>
    )
}