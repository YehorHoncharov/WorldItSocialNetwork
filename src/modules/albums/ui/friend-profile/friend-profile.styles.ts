import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
         maxWidth: 343,
        padding: 15,
        alignItems: "center",
        gap: 16,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: "#CDCED2",
        backgroundColor: "white",
    },
    profileContainer: {
                position: "relative",
        marginTop: 15,
    },
    profileImage: {
        width: 96,
        height: 96,
        borderRadius: 360,
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
    confirmButton: {
        width: 111,
        height: 40, 
        borderRadius: 1234,
        backgroundColor: "#543C52"
    },
    deleteButton: {

    },
})