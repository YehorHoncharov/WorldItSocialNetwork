import { View } from "react-native";
import Providers from "../providers";
import { Group } from "../../src/modules/chat/ui/group/group";

export default function ChatsApp() {
	return (
		<Providers>
			<View style={{ backgroundColor: "#ffffff", flexGrow: 1 }}>
				<Group />
			</View>
		</Providers>
	);
}
