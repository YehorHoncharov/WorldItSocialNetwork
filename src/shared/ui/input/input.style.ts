import { StyleSheet } from "react-native";
import { COLORS } from "../colors";

export const styles = StyleSheet.create({
    inputContainer: {
        padding: 16,
    },
    label: {
        fontSize: 16,
        color: "#070A1C",
        marginBottom: 10,
        paddingLeft: 5,
        fontWeight: "500",
    },
    inputWrapper: {
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
    },
    rightIcon: {
        position: "absolute",
        right: 25,
        zIndex: 2,
    },
    input: {
        width: 311,
        height: 42,
        borderRadius: 10,
        fontSize: 16,
        backgroundColor: "#FFFFFF",
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 10,
        paddingTop: 10,
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#CDCED2",
    },
    inputWithRightIcon: {
        paddingRight: 60,
    },
    errorText: {
        color: COLORS.red100,
        fontSize: 12,
        flexShrink: 1,
        fontWeight: "500",
        paddingLeft: 20,
        marginTop: 5,
    },
    errorBlock: {
        gap: 2,
        flexDirection: "row",
    },
});
