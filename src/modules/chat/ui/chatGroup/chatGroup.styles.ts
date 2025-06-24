import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		// backgroundColor: "#fff",
	},
	chatHeader: {
		// width: "90%",
		flexDirection: "row",
		justifyContent: "space-between",
		gap: 10,
		paddingTop: 16,
		paddingLeft: 16,
		paddingRight: 16,
		paddingBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: "#ccc",
		alignItems: "center",
	},
	chatName: {
		color: "#123456",
		fontWeight: 500,
		fontSize: 24,
		// width: 120,
	},
	chatInfo: {
		fontSize: 14,
		color: "#666",
	},
	menuBtn: {
		padding: 5,
		paddingLeft: 80,
	},
	menuText: {
		fontSize: 20,
	},
	chatDate: {
		color: "#666",
		textAlign: "center",
		marginVertical: 10,
		// paddingTop: 150,
	},
	messages: {
		// flex: 1,
		height: 320,
		paddingHorizontal: 10,
	},
	message: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 10,
		gap: 6,
	},
	avatar: {
		width: 46,
		height: 46,
		borderRadius: 20,
		marginRight: 10,
	},
	messageBubble: {
		// backgroundColor: "#e9ecef",
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
		maxWidth: "70%",
		flexDirection: "row",
	},
	messageSender: {
		fontWeight: "bold",
		fontSize: 14,
	},
	messageText: {
		fontSize: 16,
	},
	messageTime: {
		paddingLeft: 6,
		color: "#666",
		fontSize: 12,
		paddingTop: 7,
	},
	inputContainer: {
		flexGrow: 1,
		flexDirection: "row",
		padding: 10,
		borderTopWidth: 1,
		borderTopColor: "#ccc",
		alignItems: "center",
		justifyContent: "center",
	},
	input: {
		// flex: 1,
		width: 223,
		height: 42,
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 10,
		padding: 5,
		marginRight: 5,
		paddingHorizontal: 16,
	},
	attachBtn: {
		padding: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	sendBtn: {
		padding: 10,
		backgroundColor: "#543C52",
		borderRadius: 123456,
		alignItems: "center",
		justifyContent: "center",
	},
	attachText: {
		fontSize: 20,
	},
	sendText: {
		fontSize: 20,
	},
});
