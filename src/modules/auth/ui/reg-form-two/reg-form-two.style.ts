import { COLORS } from "../../../../shared/ui/colors";
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
        container: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
        },
        header: {
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
        },
        headerText: {
            fontSize: 32,
            color: COLORS.black,
            fontWeight: "400",
        },
        imageContainer: {
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
        },
        imageWrapper: {
            position: "relative",
            width: 75,
            height: 75,
        },
        searchIcon: {
            position: "absolute",
            top: 40, 
            right: 0,
        },
        uploadText: {
            fontSize: 13,
            color: COLORS.grey,
            fontWeight: "regular",
        },
        image: {
            width: 108,
            height: 58,
        },
})