import { View, Text } from "react-native";
import { FriendProfile } from "../../modules/albums/ui/friend-profile/friend-profile";
import { useUserContext } from "../../modules/auth/context/user-context";

export default function Chats() {
    const {user} = useUserContext()
    if (!user) return
    return (
        <View>
            <Text>Chats</Text>
            <FriendProfile id={user.id} email={user.email} password={user.password}/>
        </View>
    )
}