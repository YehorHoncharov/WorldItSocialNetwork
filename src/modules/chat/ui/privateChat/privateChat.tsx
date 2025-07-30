import React, { useEffect, useState, useRef, ElementRef } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
    Alert,
} from "react-native";
import SendArrow from "../../../../shared/ui/icons/send-arrow";
import BackArrowIcon from "../../../../shared/ui/icons/arrowBack";
import { styles } from "./privatChat.style";
import Dots from "../../../../shared/ui/icons/dots";
import CheckMarkIcon from "../../../../shared/ui/icons/checkMark";
import { useLocalSearchParams, useRouter } from "expo-router";
import { API_BASE_URL } from "../../../../settings";
import { useSocketContext } from "../../context/socketContext";
import { CreateMessage, MessagePayload } from "../../types/socket";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useUserContext } from "../../../auth/context/user-context";
import { ChatModalDelete } from "../modals/modal/chatModalDelete";
import { IAlbumImageShow } from "../../../albums/types/albums.types";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export function PrivatChat() {
    const params = useLocalSearchParams<{ name: string; chat_id: string; avatar: string, username: string, lastAtMessage: string }>();
    const { user } = useUserContext();
    const { socket } = useSocketContext();
    const [dotsPosition, setDotsPosition] = useState({ x: 50, y: 78 });
    const [messages, setMessages] = useState<MessagePayload[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [input, setInput] = useState("");
    const scrollViewRef = useRef<ScrollView>(null);
    const dotsRef = useRef<ElementRef<typeof TouchableOpacity>>(null);
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);
    const [scrollOffset, setScrollOffset] = useState(0)
    const [images, setImages] = useState<IAlbumImageShow[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        setIsMounted(true);
        return () => setIsMounted(false);
    }, []);

    useEffect(() => {
        if (!socket || !isMounted) return;

        const chatId = +params.chat_id;
        socket.emit("joinChat", { chatId }, (res) => {
            if (!isMounted) return;
            if (res.status === "success" && Array.isArray(res.data?.chat_messages)) {
                setMessages(res.data.chat_messages);
            }
        });

        const handleNewMessage = (data: CreateMessage) => {
            if (!isMounted) return;
            const newMessage: MessagePayload = {
                content: data.content || "",
                sent_at: new Date(),
                author_id: data.author_id,
                chat_groupId: data.chat_groupId,
                attached_image: data.attached_image || "",
            };
            setMessages((prev) => [...prev, newMessage]);
            scrollViewRef.current?.scrollToEnd({ animated: true });
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
            socket.emit("leaveChat", { chatId });
        };
    }, [socket, params.chat_id, isMounted]);

    // const sendMessage = () => {
    //     if (!socket || !input.trim() || !user) return;

    //     const newMessage: CreateMessage = {
    //         content: input.trim(),
    //         author_id: user.id,
    //         chat_groupId: +params.chat_id,
    //         sent_at: new Date(),
    //         attached_image: "",
    //     };

    //     socket.emit("sendMessage", newMessage as MessagePayload);
    //     setInput("");
    // };

    const measureDots = () => {
        if (dotsRef.current) {
            dotsRef.current.measureInWindow((x, y, width, height) => {
                setDotsPosition({ x, y });
            });
        }
    };

    useEffect(() => {
        if (modalVisible) {
            measureDots();
        }
    }, [modalVisible]);

    useEffect(() => {
        if (modalVisible) {
            measureDots();
        }
    }, [scrollOffset, modalVisible]);


    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(() => {
                scrollViewRef.current?.scrollToEnd({ animated: false });
            }, 0);
        }
    }, [messages]);

    function formatDate(date: Date) {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        const isToday = date.toDateString() === today.toDateString();
        const isYesterday = date.toDateString() === yesterday.toDateString();

        if (isToday) return "Сьогодні";
        if (isYesterday) return "Вчора";
        return date.toLocaleDateString("uk-UA", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }

    function onBack() {
        router.navigate({
            pathname: "/chats",
        });
    }

    function shouldShowDate(currentMessage: MessagePayload, prevMessage?: MessagePayload) {
        if (!prevMessage) return true;
        const currentDate = new Date(currentMessage.sent_at).toDateString();
        const prevDate = new Date(prevMessage.sent_at).toDateString();
        return currentDate !== prevDate;
    }

    const sendMessage = async () => {
        if ((!input.trim() && !selectedImage) || !user || !socket) return;

        try {
            let imageUrl = "";

            if (selectedImage) {
                setIsUploading(true);
                imageUrl = await uploadImage(selectedImage);
                setIsUploading(false);
            }

            const newMessage: CreateMessage = {
                content: input.trim(),
                author_id: user.id,
                chat_groupId: +params.chat_id,
                sent_at: new Date(),
                attached_image: imageUrl,
            };

            socket.emit("sendMessage", newMessage as MessagePayload);
            setInput("");
            setSelectedImage(null);
        } catch (error) {
            setIsUploading(false);
            Alert.alert("Помилка", "Не вдалося відправити повідомлення");
            console.error("Помилка відправки:", error);
        }
    };

    const pickImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert("Дозвіл не надано", "Потрібен доступ до галереї");
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: true,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.7,
                base64: true,
            });

            if (!result.canceled && result.assets && result.assets.length > 0) {
                const selected = result.assets[0];
                if (selected.base64) {
                    setSelectedImage(`data:image/jpeg;base64,${selected.base64}`);
                }
            }
        } catch (error) {
            console.error("Помилка вибору зображення:", error);
            Alert.alert("Помилка", "Не вдалося вибрати зображення");
        }
    };

    const removeImage = () => {
        setSelectedImage(null);
    };

    return (
        <View style={styles.container}>
            <View style={styles.chatHeader}>
                <View style={{ flexDirection: 'row', alignItems: "center", gap: 20 }}>
                    <TouchableOpacity onPress={onBack}>
                        <BackArrowIcon style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: "row", justifyContent: "center", gap: 15, alignItems: "center" }}>
                        <Image
                            source={{ uri: API_BASE_URL + "/" + params.avatar }}
                            style={styles.avatar}
                        />
                        <View style={{}}>
                            <Text style={styles.chatName}>{params.name}</Text>
                            <Text style={styles.chatInfo}>@{params.username.toLowerCase()}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.menuBtn} ref={dotsRef} onPress={() => setModalVisible(true)}>
                    <Dots style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
            </View>

            <KeyboardAwareScrollView
                innerRef={(ref) => {
                    scrollViewRef.current = ref;
                }}
                enableOnAndroid={true}
                extraScrollHeight={Platform.OS === 'ios' ? 80 : 0}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.messages}
                enableAutomaticScroll={false}
                extraHeight={20}
            >
                {messages.length == 0 ? <Text style={{ textAlign: "center", paddingTop: 10, color: "#543C52" }}>Немає повідомлень!</Text> : messages.map((msg, index) => {
                    const isMyMessage = msg.author_id === user?.id;
                    const showDate = shouldShowDate(msg, messages[index - 1]);

                    return (
                        <View key={index}>
                            {showDate && (
                                <View style={{ alignItems: "center", marginVertical: 10 }}>
                                    <View style={styles.dateContainer}>
                                        <Text style={styles.chatDate}>
                                            {formatDate(new Date(msg.sent_at))}
                                        </Text>
                                    </View>
                                </View>
                            )}
                            <View
                                style={[styles.message, isMyMessage ? { justifyContent: "flex-end" } : {}]}
                            >
                                {!isMyMessage && (
                                    <Image
                                        source={{ uri: API_BASE_URL + "/" + params.avatar }}
                                        style={{ width: 40, height: 40, borderRadius: 12345 }}
                                    />
                                )}
                                <View style={isMyMessage ? styles.messageBubbleMy : styles.messageBubble}>
                                    {msg.attached_image && (
                                        <Image
                                            source={{ uri: msg.attached_image }}
                                            style={styles.messageImage}
                                            resizeMode="cover"
                                        />
                                    )}
                                    <Text style={styles.messageText}>{msg.content}</Text>
                                    <View style={styles.messageBox}>
                                        <Text style={styles.messageTime}>
                                            {new Date(msg.sent_at).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })}
                                        </Text>
                                        <CheckMarkIcon style={{ width: 10, height: 9 }} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    );
                })}

            </KeyboardAwareScrollView>

            {selectedImage && (
                <View style={styles.selectedImageContainer}>
                    <Image
                        source={{ uri: selectedImage }}
                        style={styles.selectedImage}
                        resizeMode="cover"
                    />
                    <TouchableOpacity
                        style={styles.removeImageButton}
                        onPress={removeImage}
                    >
                        <Text style={styles.removeImageText}>×</Text>
                    </TouchableOpacity>
                </View>
            )}

            <View style={[styles.inputContainer]}>
                <TextInput
                    style={styles.input}
                    placeholder="Повідомлення"
                    value={input}
                    onChangeText={setInput}
                />
                <TouchableOpacity style={styles.attachBtn} onPress={pickImage}>
                    <Image
                        source={require("../../../../shared/ui/images/pictures-modal.png")}
                        style={{ width: 40, height: 40 }}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
                    <SendArrow style={{ width: 20, height: 20 }} />
                </TouchableOpacity>
            </View>
            <ChatModalDelete
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                chat_id={parseInt(params.chat_id)}
                dotsPosition={dotsPosition}
                scrollOffset={scrollOffset}
                onMessagesDeleted={() => setMessages([])}
            />
        </View>
    );
}
export const uploadImage = async (base64Image: string): Promise<string> => {
    try {
        const fileUri = FileSystem.cacheDirectory + `upload_${Date.now()}.jpg`;
        await FileSystem.writeAsStringAsync(fileUri, base64Image.replace(/^data:image\/\w+;base64,/, ""), { encoding: FileSystem.EncodingType.Base64 });

        const formData = new FormData();
        formData.append('file', {
            uri: fileUri,
            name: 'photo.jpg',
            type: 'image/jpeg',
        } as any);

        const response = await fetch(`${API_BASE_URL}/upload`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        });

        const result = await response.json();
        if (result.url) {
            return result.url;
        }
        throw new Error('Не вдалося завантажити зображення');
    } catch (error) {
        console.error('Помилка завантаження:', error);
        throw error;
    }
};

