import { View, Image, Text } from "react-native"
import { styles } from "./friend.styles"
import { useUserContext } from "../../../auth/context/user-context"

export function Friend1() {
    const { user } = useUserContext()

    return (
        <View style={styles.container}>
            <Image
                src={user?.image || '../../../../shared/ui/images/user.png'}
                style={styles.avatar}
            />
            <Text style={styles.name} >{user?.name || 'Anonymous'}</Text>
        </View>
    )
}