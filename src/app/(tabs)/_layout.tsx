import { Tabs } from "expo-router";
import { Image } from "react-native";
import { useState } from "react";
import { Header } from "../../shared/ui/header";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabsLayout() {
	// Состояния для каждой вкладки
	const [isHomeActive, setIsHomeActive] = useState(false);
	const [isMyPostsActive, setIsMyPostsActive] = useState(false);
	const [isFriendsActive, setIsFriendsActive] = useState(false);
	const [isChatsActive, setIsChatsActive] = useState(false);

	return (
		<SafeAreaView style={{ flex: 1, gap: 5, backgroundColor: "#ffffff" }} edges={["top"]}>
			<Tabs
				screenOptions={{
					tabBarStyle: styles.footer,
					tabBarShowLabel: false,
				}}
				initialRouteName="home"
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
						header: () => <Header actionType={1} />,
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
						header: () => <Header actionType={1} />,
					}}
				/>
				<Tabs.Screen
					name="friends"
					listeners={{
						tabPress: () => {
							setIsHomeActive(false);
							setIsMyPostsActive(false);
							setIsFriendsActive(true);
							setIsChatsActive(false);
						},
					}}
					options={{
						tabBarIcon: () => (
							<Image
								style={styles.friends}
								source={
									isFriendsActive
										? require("../../shared/ui/images/friends-with-line.png")
										: require("../../shared/ui/images/friends.png")
								}
							/>
						),
						header: () => <Header />,
					}}
				/>
				<Tabs.Screen
					name="chats"
					listeners={{
						tabPress: () => {
							setIsHomeActive(false);
							setIsMyPostsActive(false);
							setIsFriendsActive(false);
							setIsChatsActive(true);
						},
					}}
					options={{
						tabBarIcon: () => (
							<Image
								style={styles.chats}
								source={
									isChatsActive
										? require("../../shared/ui/images/chats.png")// тут дрлжен быть chats-with-line.png
										: require("../../shared/ui/images/chats.png")
								}
							/>
						),
						header: () => <Header />,
					}}
				/>
				{}
				<Tabs.Screen
					name="settings"
					listeners={{
						tabPress: () => {
							setIsHomeActive(false);
							setIsMyPostsActive(false);
							setIsFriendsActive(false);
							setIsChatsActive(false);
						},
					}}
					options={{
						header: () => <Header />,
						href: null
					}}
				/>
			</Tabs>
		</SafeAreaView>
	);
}
