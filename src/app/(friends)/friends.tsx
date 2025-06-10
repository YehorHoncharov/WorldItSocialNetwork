import { View } from "react-native";
import { FriendProfile } from "../../modules/friends/ui/friend-profile/friend-profile";
import Providers from "../providers";

export default function Friends() {
  return (
    <Providers>
      <View>
        <FriendProfile />
      </View>
    </Providers>
  );
}
