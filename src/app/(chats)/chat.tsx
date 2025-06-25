import { View } from "react-native";
import Providers from "../providers";
import { ChatGroup } from "../../modules/chat/ui/chatGroup/chatGroup";

export default function ChatApp() {
  
  return (
    <Providers>
      <View style={{backgroundColor: "#ffffff", flexGrow: 1}}>
        <ChatGroup></ChatGroup>
      </View>
    </Providers>
  );
}
