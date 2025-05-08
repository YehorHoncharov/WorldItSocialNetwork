import { StyleSheet } from "react-native"
import { COLORS } from '../colors'

export const styles = StyleSheet.create({
    inputContainer: {
        padding: 16,
        
    },
    label: {
        fontSize: 13,
        color: COLORS.purple,
        marginBottom: 8,
        paddingLeft:5,
        fontWeight: '500',
    },
    inputWrapper: {
        position: 'relative',
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    rightIcon: {
        position: 'absolute',
        right: 35,
        zIndex: 2,
    },
    input: {
        width: 293,
        height: 64,
        borderRadius: 40,
        fontSize: 13,
        backgroundColor: "#E9E9E9",
        paddingLeft: 24,
        alignItems: "center"
    },
    inputWithRightIcon: {
        paddingRight: 60, 
    },
    errorText: {
        color: COLORS.red,
        fontSize: 12,
        flexShrink: 1,
        fontWeight: '500',
        paddingLeft: 20,
        marginTop: 5
    },
    errorBlock:{
        gap: 2,
        flexDirection:"row",
    }
});
