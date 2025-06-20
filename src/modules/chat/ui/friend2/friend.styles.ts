import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 12,
        padding: 16,
    },
    avatar: {
        width: 46,
        height: 46,
        // botderWidth: 1,
        borderRadius: 77,
    },
    name: {
        fontSize: 16,
        fontWeight: 600,
    },
    textBox: {
        flex: 1,
        flexDirection: "column",
        gap: 10
    },
    messageBox: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
})