import { StyleSheet } from "react-native";
import { Tabs } from "expo-router";
import { Image } from "react-native";
import { useState } from "react";

export default function TabsLayout() {
	// Состояния для каждой вкладки
	const [isHomeActive, setIsHomeActive] = useState(true);
	const [isMyPostsActive, setIsMyPostsActive] = useState(false);
	const [isFriendsActive, setIsFriendsActive] = useState(false);
	const [isChatsActive, setIsChatsActive] = useState(false);

	return (
		<Tabs
			screenOptions={{
				tabBarStyle: styles.footer,
				tabBarShowLabel: false,
				headerShown: false,
        
			}}
		>
			<Tabs.Screen
				name="home"
				listeners={{
					tabPress: () => {
						setIsHomeActive(true);
						setIsMyPostsActive(false);
						setIsFriendsActive(false);
						setIsChatsActive(false);
					},
				}}
				options={{
					tabBarIcon: () => (
						<Image
							style={styles.home}
							source={
								isHomeActive
									? require("../../shared/ui/images/home.png")
									: require("../../shared/ui/images/home-without-line.png")
							}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="my-publications"
				listeners={{
					tabPress: () => {
						setIsHomeActive(false);
						setIsMyPostsActive(true);
						setIsFriendsActive(false);
						setIsChatsActive(false);
					},
				}}
				options={{
					tabBarIcon: () => (
						<Image
							style={styles.myposts}
							source={
								isMyPostsActive
									? require("../../shared/ui/images/my-posts-with-line.png")
									: require("../../shared/ui/images/my-posts.png")
							}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="friends"
				options={{
					tabBarIcon: () => (
						<Image
							style={styles.friends}
							source={require("../../shared/ui/images/friends.png")}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="chats"
				options={{
					tabBarIcon: () => (
						<Image
							style={styles.chats}
							source={require("../../shared/ui/images/chats.png")}
						/>
					),
				}}
			/>
		</Tabs>
	);
}

const styles = StyleSheet.create({
	footer: {
		width: "100%",
		height: 60,
		gap: 10,
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		paddingLeft: 16,
		paddingRight: 16,
		paddingBottom: 16,
	},
	home: {
		width: 68,
		height: 54,
	},
	myposts: {
		width: 106,
		height: 54,
	},
	friends: {
		width: 52,
		height: 54,
	},
	chats: {
		width: 47,
		height: 54,
	},
});
