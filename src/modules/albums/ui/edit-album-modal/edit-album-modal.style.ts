import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        width: "100%",
        maxHeight: "80%",
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: "500",
        color: "#070A1C",
    },
    form: {
        gap: 5,
        marginBottom: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    textArea: {
        width: 343,
        minHeight: 100,
        padding: 16,
        borderWidth: 1,
        borderColor: "#CDCED2",
        borderRadius: 10,
        fontSize: 16,
    },
    actions: {
        gap: 16,
        marginTop: 16,
    },
    iconRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 16,
    },
    icon: {
        width: 40,
        height: 40,
    },
    submitButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#543C52",
        padding: 12,
        borderRadius: 1234,
        gap: 8,
    },
    submitText: {
        color: "white",
        fontSize: 16,
        fontWeight: "500",
    },
    scrollArea: {
        flexGrow: 0,
    },

    imageGrid: {
        flexDirection: "column",
        gap: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    imageAdded: {
        width: 343,
        height: 225,
        borderRadius: 16,
    },
    selectedTagsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 10,
        gap: 8,
    },
    tag: {
        backgroundColor: "#EEE",
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    tagText: {
        color: "#333",
        fontSize: 14,
    },
    saveButton: {
        width: 90,
        height: 40,
        borderRadius: 1234,
        backgroundColor: "#543C52",
        alignItems: "center",
        justifyContent: "center",
    },
    cancelButton: {
        width: 90,
        height: 40,
        borderRadius: 1234,
        borderWidth: 1,
        borderColor: "#543C52",
        alignItems: "center",
        justifyContent: "center",
    },
    submitTextCancel: {
        color: "#543C52",
        fontSize: 14,
        fontWeight: "500",
    }
});
