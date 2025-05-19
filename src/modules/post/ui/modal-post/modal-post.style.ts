import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
    },
    modalContainer: {
        position: 'absolute',
        width: 343,
        height: 140,
        backgroundColor: 'white',
        borderRadius: 12,
        paddingVertical: 8,
        top: 90,
        left: 100
    },
    dotsContainer: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10,
    },
    dotsIcon: {
        width: 20,
        height: 20,
    },
    modalOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
    },
    optionText: {
        fontSize: 16,
        color: "#070A1C",
        marginLeft: 12,
    },
    deleteText: {
        color: 'red',
    },
    divider: {
        height: 1,
        backgroundColor: '#CDCED2',
        marginVertical: 4,
    },
    icon: {
        width: 20,
        height: 20,
    },

});