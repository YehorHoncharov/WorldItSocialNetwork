import { Stack, Tabs } from "expo-router";
import { Header } from "../../src/shared/ui/header";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { Image } from "react-native";

export default function FriendsLayout() {
	const [isHomeActive, setIsHomeActive] = useState(false);
	const [isMyPostsActive, setIsMyPostsActive] = useState(false);
	const [isFriendsActive, setIsFriendsActive] = useState(false);
	const [isChatsActive, setIsChatsActive] = useState(false);

	return (
		<SafeAreaView
			style={{ flex: 1, backgroundColor: "#ffffff" }}
			edges={["top"]}
		>
			<Header />
			<Stack
				screenOptions={{
					headerShown: false,
				}}
			/>
			<Tabs.Screen
				name="friends"
				listeners={{
					tabPress: () => {
						setIsHomeActive(false);
						setIsMyPostsActive(false);
						setIsFriendsActive(false);
						setIsChatsActive(false);
					},
				}}
				options={{
					tabBarIcon: () => (
						<Image
							style={{
								width: 52,
								height: 54,
							}}
							source={
								isFriendsActive
									? require("../../src/shared/ui/images/friends-with-line.png")
									: require("../../src/shared/ui/images/friends.png")
							}
						/>
					),
					header: () => <Header actionType={2} />,
				}}
			/>
		</SafeAreaView>
	);
}
