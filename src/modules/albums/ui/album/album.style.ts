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

	actionButtons: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
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

	theme: {
		flexDirection: "row",
		gap: 16,
	},
	separator: {
		height: 1,
		backgroundColor: "#CDCED2",
	},
	addImage: {
		height: 157,
		width: 157,
		borderWidth: 1,
		borderRadius: 10,
		borderStyle: "dashed",
		borderColor: "#81818D",
		alignItems: "center",
		justifyContent: "center",
		paddingRight: 0.6
	},
	photoGrid: {
		width: "100%",
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
	},

	photo: {
		width: 157,
		height: 157,
		borderRadius: 10,
	},
	deleteBtn: {
		position: "absolute",
		bottom: 10,
		right: 10,
		backgroundColor: "#FFFFFF",
		borderRadius: 190,
		borderWidth: 1,
		borderColor: "#543C52",
		width: 40,
		height: 40,
		justifyContent: "center",
		alignItems: "center"
	},

	submitBtn: {
		flex: 1,
		height: 40,
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 190,
		gap: 10,
		borderWidth: 1,
		borderColor: "#543C52",
	},
	submitText: {
		color: "#543C52",
		fontSize: 14,
		fontWeight: 500,
	}
});
