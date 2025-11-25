import { Stack } from "expo-router";
import { Platform } from "react-native";
import { useEffect } from 'react';



export default function MainLayout() {
	return (
		<Stack screenOptions={{ headerShown: false, statusBarStyle: Platform.OS === "android" ? "dark" : undefined, statusBarBackgroundColor: '#ffffffff'}} />
	);	  
}