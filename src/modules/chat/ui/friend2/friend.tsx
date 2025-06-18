import { View, Image, Text } from "react-native"
import { useUserContext } from "../../../auth/context/user-context"
import { styles } from "./friend.styles"

export function Friend2() {
    const { user } = useUserContext()

    return (
        <View style={styles.container}>
            <Image
                src={user?.image || '../../../../shared/ui/images/user.png'}
                style={styles.avatar}
            />
            <Text style={styles.name} >{user?.name || 'Anonymous'}</Text>

            <Text>Привіт! Як справи?</Text>
            <Text>10:00</Text>
        </View>
    )
}