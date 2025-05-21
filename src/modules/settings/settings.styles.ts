import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        gap: 16, 
        height: "auto", 
        width: 380,
        backgroundColor: "#FFFFFF", 
        borderWidth: 1, 
        borderColor: "#CDCED2", 
        borderRadius: 10
    },
    userInfoFirst:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 27,
    },
    userInfoText:{
        fontSize: 16,
        fontWeight: "500",
        color: "#070A1C",
    },
    pencilImage:{
        width: 40,
        height: 40
    },
     authButton: {
        backgroundColor: '#543C52',
        padding: 15,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center'
    },
    authButtonText: {
        color: 'white',
        fontWeight: '600'
    }
})