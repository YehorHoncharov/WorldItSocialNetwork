import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        height: 46,
        width: '100%',
        backgroundColor: "#ffffff",
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
    },
    avatar: {
        width: 46,
        height: 46,
        // botderWidth: 1,
        borderRadius: 77,
    },
    name: {
        fontSize: 18,
        color: "#000000",
        marginLeft: 10,
    },
})