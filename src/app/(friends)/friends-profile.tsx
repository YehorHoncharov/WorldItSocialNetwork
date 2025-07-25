import { View } from "react-native";
import { FriendProfile } from "../../modules/friends/ui/friend-profile/friend-profile";
import Providers from "../providers";
import { useLocalSearchParams } from "expo-router";
import { IUser } from "../../modules/auth/types";

export default function FriendsProfile() {
    const params = useLocalSearchParams();

    const friend: IUser = {
        id: Number(params.id),
        name: typeof params.name === "string" ? params.name : undefined,
        username: typeof params.username === "string" ? params.username : undefined,
        surname: typeof params.surname === "string" ? params.surname : undefined,
        date_of_birth: typeof params.dateOfBirth === "string" ? new Date(params.dateOfBirth) : undefined,
        email: typeof params.email === "string" ? params.email : "",
        password: typeof params.password === "string" ? params.password : "",
        signature: typeof params.signature === "string" ? params.signature : undefined,
        image: typeof params.image === "string" ? params.image : undefined,
    };
    return (
        <Providers>
            <View style={{ backgroundColor: "#ffffff" }}>
                <FriendProfile user={friend} />
            </View>
        </Providers>
    );
}
