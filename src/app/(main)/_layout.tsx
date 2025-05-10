import { Stack } from "expo-router";
import { Platform } from "react-native";
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from 'react';



export default function MainLayout() {
	useEffect(() => {
		NavigationBar.setVisibilityAsync("hidden")
		NavigationBar.setBehaviorAsync("overlay-swipe")
	}, []);

	return (
		<Stack screenOptions={{ headerShown: false, statusBarStyle: Platform.OS === "android" ? "dark" : undefined, statusBarBackgroundColor: '#ffffff'}} />
	);

	  
}