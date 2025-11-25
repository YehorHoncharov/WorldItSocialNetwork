import { View } from "react-native";
import Providers from "../providers";
import { PrivatChat } from "../../src/modules/chat/ui/privateChat/privateChat";

export default function ChatApp() {
	return (
		<Providers>
			<View style={{ backgroundColor: "#ffffff", flexGrow: 1 }}>
				<PrivatChat></PrivatChat>
			</View>
		</Providers>
	);
}
