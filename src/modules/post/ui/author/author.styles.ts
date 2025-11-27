import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 127,
        flexDirection: "row",
        gap: 8,
        padding: 16,
        borderBottomColor: "#CDCED2",
        borderBottomWidth: 1,
    },
    contant: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    main: {
        width: 315,
        height: 95,
    },
    dotsButton: {
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 1,
    },
});
