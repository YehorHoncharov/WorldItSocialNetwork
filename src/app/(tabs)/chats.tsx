import { View, Text, Alert } from "react-native";
import { FriendProfile } from "../../modules/albums/ui/friend-profile/friend-profile";
import { useUserContext } from "../../modules/auth/context/user-context";

export default function Chats() {
    const {user} = useUserContext()
    if (!user){
        Alert.alert("Будь ласка, зареєструйтесь")
        return
    } 
        
    return (
        <View>

            <FriendProfile id={user.id} email={user.email} password={user.password}/>
        </View>
    )
}