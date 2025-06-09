import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		borderColor: "#CDCED2",
		borderWidth: 1,
		borderRadius: 10,
		gap: 8,
	},
	scrollContainer: {
		flexGrow: 1,
		gap: 8,
		alignItems: "flex-start",
		padding: 16,
	},
	mainBox: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},
	title: {
		fontSize: 16,
		fontWeight: 500,
		color: "#070A1C0",
	},
	addButton: {
		width: 131,
		height: 40,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 190,
		gap: 10,
		borderWidth: 1,
		borderColor: "#543C52",
	},
	addButtonIcon: {
		width: 20,
		height: 20,
	},
	addButtonText: {
		color: "#543C52",
		fontSize: 14,
		fontWeight: 500,
	},
	avatar: {
		width: 155,
		height: 155,
		borderRadius: 20,
		// borderColor: "black",
		// borderWidth: 1,
	},
	imageContainer: {
		alignItems: "center",
		position: "relative",
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 15
	},
	imageWrapper: {
		position: "relative",
		marginBottom: 10,
	},
	actionButtons: {
		flexDirection: "row",
		justifyContent: "center",
		gap: 10,
		position: "absolute",
		bottom: 10,
		right: 15,
	},
	actionButton: {
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#543C52",
		borderRadius: 50,
		padding: 10,
		alignItems: "center",
		justifyContent: "center",
	},
	actionIcon: {
		width: 20,
		height: 20,
	},
});