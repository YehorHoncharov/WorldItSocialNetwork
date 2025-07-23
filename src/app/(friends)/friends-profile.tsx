import { View } from "react-native";
import { FriendProfile } from "../../modules/friends/ui/friend-profile/friend-profile";
import Providers from "../providers";
import { useLocalSearchParams } from "expo-router";
import { IUser } from "../../modules/auth/types";

export default function FriendsProfile() {
  const params = useLocalSearchParams();

  const friend = {
    id: Number(params.id),
    first_name: typeof params.first_name === "string" ? params.first_name : undefined,
    username: typeof params.username === "string" ? params.username : undefined,
    last_name: typeof params.last_name === "string" ? params.last_name : undefined,
    password: typeof params.password === "string" ? params.password : "",
    date_of_birth: typeof params.dateOfBirth === "string" ? new Date(params.dateOfBirth) : undefined,
    email: typeof params.email === "string" ? params.email : "",
    signature: typeof params.signature === "string" ? params.signature : undefined,
    image: typeof params.image === "string" ? params.image : undefined,
  };
  const userFriend: IUser = {
    id: friend.id,
    auth_user: {
      first_name: friend.first_name,
      last_name: friend.last_name,
      username: friend.username,
      email: friend.email,
      password: friend.password
    },
    signature: friend.signature,
    date_of_birth: friend.date_of_birth,
  }
  return (
    <Providers>
      <View style={{ backgroundColor: "#ffffff" }}>
        <FriendProfile user={userFriend} />
      </View>
    </Providers>
  );
}
