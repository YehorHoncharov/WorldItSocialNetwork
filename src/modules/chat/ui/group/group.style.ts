import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    chatHeader: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        // paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    chatName: {
        color: "#123456",
        fontWeight: "500",
        fontSize: 24,
    },
    chatInfo: {
        fontSize: 14,
        color: "#666",
    },
    menuBtn: {
        padding: 8,
        paddingLeft: 80,
    },
    chatDate: {
        color: "#666666",
        textAlign: "center",
        marginVertical: 10,
        fontSize: 14,
    },
    messages: {
        flexGrow: 1,
        paddingHorizontal: 10,
        paddingBottom: 20,
        gap: 5,
    },
    message: {
        flexDirection: "row",
        alignItems: "flex-end",
        marginBottom: 10,
        gap: 8,
    },
    avatar: {
        width: 46,
        height: 46,
        borderRadius: 20,
        marginRight: 10,
    },
    messageBubble: {
        borderWidth: 1,
        borderColor: "#E9E5EE",
        padding: 10,
        borderRadius: 6,
        maxWidth: "70%",
        flexDirection: "row",
    },
    messageBubbleMy: {
        backgroundColor: "#CDCED2",
        padding: 10,
        borderRadius: 10,
        maxWidth: width * 0.7,
        flexDirection: "row",
    },
    messageText: {
        fontSize: 16,
    },
    messageTime: {
        color: "#666",
        fontSize: 12,
        marginTop: 4,
        marginLeft: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 15,
        borderTopWidth: 1,
        borderTopColor: "#ccc",
    },
    input: {
        flex: 1,
        height: 44,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 16,
        marginRight: 8,
        backgroundColor: "#f9f9f9",
    },
    attachBtn: {
        padding: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    sendBtn: {
        padding: 10,
        backgroundColor: "#543c52",
        borderRadius: 123456,
        alignItems: "center",
        justifyContent: "center",
    },
});
