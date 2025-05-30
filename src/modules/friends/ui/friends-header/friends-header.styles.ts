import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    tabText: {
		fontSize: 15,
		fontWeight: "500",
		color: "#81818D",
	},
	tabContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		padding: 20,
		gap: 24,
        marginTop: 10 
	},
    	tabTextActive: {
		color: "#070A1C",
		fontWeight: "700",
		textDecorationLine: "underline",
	},
        tabItem: {
        // flex: 1, 
        alignItems: 'center',
        paddingVertical: 16, // Вертикальные отступы
    },
})