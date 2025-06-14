import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");
const modalWidth = Math.min(width * 0.9, 343);

export const styles = StyleSheet.create({
	centeredView: {
		flex: 1,
		justifyContent: "center",
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		paddingHorizontal: 10,
	},
	modalView: {
		width: "100%",
		maxHeight: "90%",
		backgroundColor: "white",
		borderRadius: 20,
		padding: 13,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	modalTitle: {
		fontSize: 24,
		fontWeight: "500",
		color: "#070A1C",
	},
	form: {
		gap: 5,
		marginBottom: 20,
		alignItems: "center",
		justifyContent: "center",
	},
	textArea: {
		width: modalWidth,
		minHeight: 100,
		padding: 16,
		borderWidth: 1,
		borderColor: "#CDCED2",
		borderRadius: 10,
		fontSize: 16,
	},
	actions: {
		gap: 16,
		marginTop: 16,
	},
	iconRow: {
		flexDirection: "row",
		justifyContent: "flex-end",
		gap: 16,
	},
	icon: {
		width: 40,
		height: 40,
	},
	submitButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#543C52",
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 1234,
		gap: 8,
		minWidth: 130,
	},
	submitText: {
		color: "white",
		fontSize: 14,
		fontWeight: "500",
		flexShrink: 1,
	},
	scrollArea: {
		flexGrow: 1,
	},
	imageGrid: {
		flexDirection: "column",
		gap: 8,
	},
	imageContainer: {
		position: "relative",
		alignItems: "center",
		justifyContent: "center",
	},
	imageAdded: {
		width: "100%",
		height: 225,
		borderRadius: 16,
	},
	removeImageButton: {
		position: "absolute",
		top: 10,
		right: 10,
		backgroundColor: "white",
		width: 30,
		height: 30,
		borderRadius: 15,
		justifyContent: "center",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#543C52",
	},
	removeImageText: {
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
	},
	selectedTagsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		marginTop: 5,
		gap: 8,
	},
	tag: {
		backgroundColor: "#e0f2fe", // Синхронізовано з компонентом
		borderRadius: 15,
		paddingHorizontal: 12,
		paddingVertical: 6,
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	tagText: {
		color: "#0369a1", // Синхронізовано з компонентом
		fontSize: 14,
	},
	errorText: {
		color: "red",
		fontSize: 14,
		textAlign: "center",
	},
	noImagesText: {
		color: "#333",
		fontSize: 14,
		textAlign: "center",
	},
	dropDownPicker: {
		borderColor: "#CDCED2",
		borderRadius: 10,
		backgroundColor: "#f9f9f9",
	},
	dropDownContainer: {
		borderColor: "#CDCED2",
		borderRadius: 10,
		maxHeight: 200,
		zIndex: 1000,
	},
});
