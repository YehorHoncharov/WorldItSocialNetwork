import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        // alignItems: "center",
        paddingTop: 5,
    },
    searchInput: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#CDCED2",
        flexDirection: "row",
        paddingLeft: 15,
        marginBottom: 10,
    },
    input: {
        width: "95%",
        height: 42,
        borderRadius: 15,
        paddingLeft: 15,
        backgroundColor: "#ffffff",
        fontSize: 16,
        zIndex: 1,
    },
    textSearch: {
        fontFamily: "MochiyPopPOne-Regular",
        fontSize: 72,
        color: "#ffffff",
        marginTop: 50,
        textAlign: "center",
    },
    buttonFind: {
        width: 275,
        height: 77,
        backgroundColor: "#5692A9",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.5,
    },
    buttonText: {
        fontFamily: "MochiyPopPOne-Regular",
        fontSize: 32,
        fontWeight: "bold",
        color: "#ffffff",
    },
    filmsGrid: {
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        marginTop: 20,
        marginBottom: 20,
    },
    noResults: {
        color: "#ffffff",
        fontSize: 16,
        textAlign: "center",
    },
});
