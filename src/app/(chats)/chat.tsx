import { View } from "react-native";
import Providers from "../providers";
import { ChatGroup } from "../../modules/chat/ui/chatGroup/chatGroup";

export default function ChatApp() {
  
  return (
    <Providers>
      <View style={{backgroundColor: "#ffffff"}}>
        <ChatGroup></ChatGroup>
      </View>
    </Providers>
  );
}
