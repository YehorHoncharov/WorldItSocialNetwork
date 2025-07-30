import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Image,
    Dimensions,
    Alert,
    ActivityIndicator,
} from "react-native";
import { useChats } from "../../../hooks/useChats";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DELETE } from "../../../../../shared/api/delete";
import { API_BASE_URL } from "../../../../../settings";
import { Chat } from "../../../types/socket";
import { styles } from "./chatModalDelete.style";
import Dots from "../../../../../shared/ui/icons/dots";

interface ModalChatProps {
    visible: boolean;
    onClose: () => void;
    chat_id: number;
    dotsPosition: { x: number; y: number };
    scrollOffset?: number;
    onMessagesDeleted: () => void
}

export function ChatModalDelete({
    visible,
    onClose,
    chat_id,
    dotsPosition,
    scrollOffset = 0,
    onMessagesDeleted,
}: ModalChatProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [tokenUser, setTokenUser] = useState<string | null>(null);
    const { refetchChats } = useChats();

    const getToken = async (): Promise<string | null> => {
        return await AsyncStorage.getItem("token");
    };

    useEffect(() => {
        getToken().then(setTokenUser);
    }, []);

    const modalWidth = 200;
    const modalHeight = 140;
    const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

    const adjustedX = Math.max(
        10,
        Math.min(
            dotsPosition?.x ? dotsPosition.x - modalWidth + 33 : 0,
            screenWidth - modalWidth - 10
        )
    );

    const adjustedY = dotsPosition?.y ? dotsPosition.y - scrollOffset + 3 : 0;
    const clampedY = Math.min(
        Math.max(adjustedY, 10),
        screenHeight - modalHeight - 10
    );

    async function handleDelete(chatId: number) {
        if (!tokenUser) {
            Alert.alert("Помилка", "Не вдалося отримати токен користувача");
            return;
        }

        setIsDeleting(true);
        try {
            await DELETE({
                endpoint: `${API_BASE_URL}/messages/${chatId}`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${tokenUser}`,
                },
            });

            await refetchChats();
            onMessagesDeleted()
            onClose();
            Alert.alert("Успіх", "Всі повідомлення успішно видалено");
        } catch (error: any) {
            console.error("Помилка видалення:", error);
            Alert.alert("Помилка", "Не вдалося видалити повідомлення");
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={onClose}
            >
                <View
                    style={[
                        styles.modalContainer,
                        {
                            top: clampedY,
                            left: adjustedX,
                            width: modalWidth,
                        },
                    ]}
                    onStartShouldSetResponder={() => true}
                >
                    <View style={styles.dotsContainer}>
                        <Dots style={styles.dotsIcon} />
                    </View>
                    <View style={styles.divider} />
                    <TouchableOpacity
                        style={styles.modalOption}
                        onPress={() => handleDelete(chat_id)}
                        disabled={isDeleting}
                    >
                        {isDeleting ? (
                            <ActivityIndicator color="red" />
                        ) : (
                            <>
                                <Image
                                    source={require("../../../../../shared/ui/images/trash.png")}
                                    style={styles.icon}
                                />
                                <Text style={[styles.optionText, styles.deleteText]}>
                                    Видалити всі повідомлення
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
}