import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    footer: {
        height: 72, 
        paddingBottom: 35, 
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        gap: 10,
        // paddingLeft: 20
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
        // paddingRight: 20,
        // borderTopWidth: 2,
        // borderTopColor: '#543C52',
    },
    font:{
        fontFamily: "Space Grotesk",
        fontWeight: "500",
        fontStyle: "normal"
    }
});