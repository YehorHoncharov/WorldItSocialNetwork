import React, { useEffect, useState, useRef } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Platform,
} from "react-native";
import SendArrow from "../../../../shared/ui/icons/send-arrow";
import BackArrowIcon from "../../../../shared/ui/icons/arrowBack";
import { styles } from "./privatChat.style";
import Dots from "../../../../shared/ui/icons/dots";
import CheckMarkIcon from "../../../../shared/ui/icons/checkMark";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGetChatById } from "../../hooks/useGetChatById";
import { API_BASE_URL } from "../../../../settings";
import { useSocketContext } from "../../context/socketContext";
import { CreateMessage, MessagePayload } from "../../types/socket";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useUserContext } from "../../../auth/context/user-context";

export function PrivatChat() {
    const params = useLocalSearchParams<{ name: string; chat_id: string; avatar: string, username: string, lastAtMessage: string }>();
    const { user } = useUserContext();
    const { socket } = useSocketContext();

    const [messages, setMessages] = useState<MessagePayload[]>([]);
    const [input, setInput] = useState("");
    const scrollViewRef = useRef<ScrollView>(null);
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

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

    const sendMessage = () => {
        if (!socket || !input.trim() || !user) return;

        const newMessage: CreateMessage = {
            content: input.trim(),
            author_id: user.id,
            chat_groupId: +params.chat_id,
            sent_at: new Date(),
            attached_image: "",
        };

        socket.emit("sendMessage", newMessage as MessagePayload);
        setInput("");
    };

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
                <TouchableOpacity style={styles.menuBtn}>
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
                {messages?.map((msg, index) => {
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

                <View style={[styles.inputContainer]}>
                    <TextInput
                        style={styles.input}
                        placeholder="Повідомлення"
                        value={input}
                        onChangeText={setInput}
                    />
                    <TouchableOpacity style={styles.attachBtn}>
                        <Image
                            source={require("../../../../shared/ui/images/pictures-modal.png")}
                            style={{ width: 40, height: 40 }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
                        <SendArrow style={{ width: 20, height: 20 }} />
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
}