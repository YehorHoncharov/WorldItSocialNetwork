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
		height: 162,
		width: 162,
		borderWidth: 1,
		borderRadius: 10,
		borderStyle: "dashed",
		borderColor: "#81818D",
		alignItems: "center",
		justifyContent: "center",
		paddingRight: 0.6
	},
	photoGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 19,
	},
  
  photo: {
    width: 162,
    height: 162,
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
    marginTop: 24,
    backgroundColor: "#7E5BC2",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",}
});
