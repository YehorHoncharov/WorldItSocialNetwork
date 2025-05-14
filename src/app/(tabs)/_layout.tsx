import { StyleSheet } from 'react-native'
import { Tabs } from "expo-router";
import { Image } from "react-native";


export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
        tabBarStyle: styles.footer,
        tabBarShowLabel: false,
        headerShown: false,
      }}>
        <Tabs.Screen name="home" options={{
          tabBarIcon: () => (
            <Image
              style={styles.home}
              source={require("../../shared/ui/images/home.png")}
            />
          ),
        }}/>
        <Tabs.Screen name="my-publications" options={{
          tabBarIcon: () => (
            <Image
              style={styles.myposts}
              source={require("../../shared/ui/images/my-posts.png")}
            />
          ),
        }}/>
        <Tabs.Screen name="friends" options={{
          tabBarIcon: () => (
            <Image
              style={styles.myposts}
              source={require("../../shared/ui/images/friends.png")}
            />
          ),
        }}/>
        <Tabs.Screen name="chats" options={{
          tabBarIcon: () => (
            <Image
              style={styles.myposts}
              source={require("../../shared/ui/images/chats.png")}
            />
          ),
        }}/>
    </Tabs>
  )
}

const styles = StyleSheet.create({
    footer: {
        width: "100%",
        height: 56,
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        paddingLeft: 16,
        paddingRight: 16,
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