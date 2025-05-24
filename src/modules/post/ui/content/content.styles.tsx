import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		padding: 16,
		backgroundColor: "#fff",
		marginBottom: 16,
		borderRadius: 8,
	},
	textContainer: {
		marginBottom: 12,
	},
	text: {
		fontSize: 14,
		marginBottom: 8,
	},
	tags: {
		fontSize: 14,
		color: "#666",
	},
	gridContainer: {
		padding: 4,
	},
	twoImageContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 8,
	},
	threeImageContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 8,
	},
	imageHalf: {
		width: 167.5,
		height: 203,
		aspectRatio: 1,
		borderRadius: 8,
	},
	imageThird: {
		width: 109,
		height: 203,
		aspectRatio: 1,
		borderRadius: 8,
	},
	image: {
		width: "100%",
		height: "100%",
		borderRadius: 8,
	},
	postStatsContainer: {
		flexDirection: "row",
		gap: 24,
		marginTop: 12,
	},
	postButs: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	statText: {
		fontSize: 14,
	},
	eyeIcon: {
		width: 20,
		height: 20,
	},
	tagsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	},
	tag: {
		backgroundColor: "#e0f2fe",
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 15,
	},
	tagText: {
		color: "#0369a1",
		fontSize: 14,
	},
});
