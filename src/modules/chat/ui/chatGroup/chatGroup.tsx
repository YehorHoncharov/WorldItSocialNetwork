import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import SendArrow from "../../../../shared/ui/icons/send-arrow";
import BackArrowIcon from "../../../../shared/ui/icons/arrowBack";
import { styles } from "./chatGroup.styles";
import Dots from "../../../../shared/ui/icons/dots";
import CheckMarkIcon from "../../../../shared/ui/icons/checkMark";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGetChatById } from "../../hooks/useGetChatById";
import { API_BASE_URL } from "../../../../settings";
import { useSocketContext } from "../../context/socketContext";
import { CreateMessage, MessagePayload } from "../../types/socket";
import { useUserContext } from "../../../auth/context/user-context";

export function ChatGroup() {
  const params = useLocalSearchParams<{ name: string; chat_id: string; avatar: string, username: string }>();
  const { user } = useUserContext();
  const chat = useGetChatById(+params.chat_id);
  const { socket } = useSocketContext();

  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const [input, setInput] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();

  useEffect(() => {
    if (!socket) return;

    const chatId = +params.chat_id;
    socket.emit("joinChat", { chatId }, (res) => {
      if (res.status === "success" && Array.isArray(res.data?.chat_app_chatmessage)) {
        setMessages(res.data.chat_app_chatmessage);
      }
    });

    socket.on("newMessage", (data: CreateMessage) => {
      const newMessage: MessagePayload = {
        content: data.content || "",
        sent_at: new Date(),
        author_id: data.author_id,
        chat_group_id: data.chat_group_id,
        attached_image: data.attached_image || "",
      };
      setMessages((prev) => [...prev, newMessage]);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    });

    return () => {
      socket.off("newMessage");
      socket.emit("leaveChat", { chatId });
    };
  }, [socket, params.chat_id]);

  const sendMessage = () => {
    if (!socket || !input.trim() || !user) return;

    const newMessage: CreateMessage = {
      content: input.trim(),
      author_id: user.id,
      chat_group_id: +params.chat_id,
      sent_at: new Date(),
      attached_image: "",
    };

    socket.emit("sendMessage", newMessage as MessagePayload);
    setInput("");
  };

  function onBack() {
    router.back();
  }

  return (
    <View style={styles.container}>
      <View style={styles.chatHeader}>
        <View style={{flexDirection: 'row', alignItems: "center",  gap: 20}}>
          <TouchableOpacity onPress={onBack}>
            <BackArrowIcon style={{ width: 20, height: 20 }} />
          </TouchableOpacity>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Image
              source={{ uri: API_BASE_URL + "/" + params.avatar }}
              style={styles.avatar}
            />
            <View style={{}}>
              <Text style={styles.chatName}>{params.name}</Text>
              <Text style={styles.chatInfo}>{params.username}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.menuBtn}>
          <Dots style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </View>

      <Text style={styles.chatDate}>25 травня 2025</Text>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{flex: 1}}
        keyboardVerticalOffset={Platform.OS === "ios" ? 50 : 20}
      >
        <ScrollView
          ref={scrollViewRef}
          overScrollMode="never"
          contentContainerStyle={styles.messages}
          keyboardShouldPersistTaps="handled"
        >
          {messages?.map((msg, index) => {
            const isMyMessage = msg.author_id === user?.id;
            const messageDate = new Date(msg.sent_at); 
            return (
              <View
                key={index}
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
                  <Text style={styles.messageTime}>
                    {messageDate.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                    <CheckMarkIcon style={{ width: 10, height: 9 }} />
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.inputContainer}>
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
      </KeyboardAvoidingView>
    </View>
  );
}