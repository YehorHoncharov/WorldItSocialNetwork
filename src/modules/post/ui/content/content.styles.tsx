import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		justifyContent: "center",
		alignItems: "center",
		gap: 16,
		padding: 16,
	},
	textContainer: {
		justifyContent: "center",
		alignItems: "center",
		width: 343,
	},
	imageCont: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
		justifyContent: "center",
		alignItems: "center",
	},
	imageLarge: {
		width: 167.5,
		height: 203,
		marginBottom: 8,
		borderRadius: 16,
	},
	imageSmall: {
		width: 109,
		height: 203,
		marginBottom: 8,
		borderRadius: 16,
	},
	postButs: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
});
