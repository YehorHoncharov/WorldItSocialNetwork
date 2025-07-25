import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	scrollView: {
		backgroundColor: "#F5F5F5",
	},
	container: {
		padding: 16,
		gap: 10,
	},
	containerBack: {
		width: "100%",
		flexDirection: "row",
		alignItems: "flex-start",
	},
	profileContainer: {
		backgroundColor: "white",
		borderRadius: 10,
		padding: 16,
		marginBottom: 16,
		alignItems: "center",
	},
	profileImageContainer: {
		position: "relative",
		marginBottom: 24,
	},
	profileImage: {
		width: 96,
		height: 96,
		borderRadius: 48,
	},
	imageOnline: {
		position: "absolute",
		width: 20,
		height: 20,
		borderWidth: 2,
		borderColor: "white",
		bottom: 0,
		right: 0,
	},
	userInfo: {
		alignItems: "center",
		marginBottom: 24,
	},
	name: {
		fontSize: 24,
		color: "#070A1C",
		fontWeight: "700",
		marginBottom: 8,
	},
	username: {
		fontSize: 16,
		color: "#070A1C",
		fontWeight: "500",
		alignSelf: "center",
	},
	buttonContainer: {
		flexDirection: "row",
		gap: 16,
		// marginTop: 10,
	},
	confirmButton: {
		width: 111,
		height: 40,
		borderRadius: 20,
		backgroundColor: "#543C52",
		justifyContent: "center",
		alignItems: "center",
	},
	deleteButton: {
		width: 111,
		height: 40,
		borderRadius: 20,
		backgroundColor: "white",
		borderWidth: 1,
		borderColor: "#543C52",
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		color: "#543C52",
		fontWeight: "500",
		fontSize: 14,
	},
	statsContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 24,
		paddingHorizontal: 16,
	},
	statItem: {
		alignItems: "center",
		paddingVertical: 8,
		flex: 1,
	},
	statItemWithBorder: {
		borderRightWidth: 1,
		borderColor: "#D3D3D3",
	},
	statNumber: {
		fontSize: 20,
		fontWeight: "700",
		marginBottom: 4,
	},
	statLabel: {
		fontSize: 16,
		color: "#81818D",
		fontWeight: "500",
	},
	albumsContainer: {
		backgroundColor: "white",
		borderRadius: 10,
		padding: 16,
	},
	albumsSection: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 16,
	},
	albumsHeader: {
		flexDirection: "row",
		alignItems: "center",
	},
	albumsIcon: {
		marginRight: 8,
	},
	albumsLabel: {
		fontSize: 20,
		fontWeight: "500",
		color: "#81818D",
	},
	viewAll: {
		fontSize: 16,
		fontWeight: "500",
		color: "#543C52",
	},
	albumsList: {
		width: "100%",
		gap: 10,
		paddingBottom: 20,
	},
	noAlbums: {
		textAlign: "center",
		color: "#81818D",
		fontSize: 16,
	},
});