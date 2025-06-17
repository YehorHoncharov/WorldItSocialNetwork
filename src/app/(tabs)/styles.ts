import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    footer: {
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        // right: 0,
        height: 70, 
        paddingBottom: 40, 
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',

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
        height: 54
    },
});