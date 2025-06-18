import { View, Alert } from "react-native";
import { useUserContext } from "../../modules/auth/context/user-context";
import {ContactsScreen} from "../../modules/chat/ui/contacts/contacts";

export default function Chats() {
    const {user} = useUserContext()
    if (!user){
        Alert.alert("Будь ласка, зареєструйтесь")
        return
    } 
        
    return (
        <View style={{ flex: 1 }}>
            {/* <ChatHeader/> */}
            <ContactsScreen/>
        </View>
    )
}