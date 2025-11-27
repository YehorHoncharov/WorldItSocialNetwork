import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    name: {
        fontSize: 16,
        color: "#000",
    },
});
