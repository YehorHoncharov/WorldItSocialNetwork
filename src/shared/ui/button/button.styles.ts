import { StyleSheet } from "react-native"
import { COLORS } from '../colors'

export const styles = StyleSheet.create({
    button: {
        width: 290,
        height: 62,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.purple,
        color: COLORS.white
    },
    text: {
        color: COLORS.white,
    }
    // disabled: {
    //     borderWidth: ,
    //     borderColor: COLORS.,
    //     backgroundColor: COLORS.,
    //     opacity: 0.5
    // }
})