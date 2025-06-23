import { View, Image, Text, TouchableOpacity } from "react-native";
import { styles } from "./friend.styles";
import { IUser } from "../../../auth/types";
import { API_BASE_URL } from "../../../../settings";
import { useRouter } from "expo-router";
import { POST } from "../../../../shared/api/post";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useUserContext } from "../../../auth/context/user-context";
import { useChats } from "../../hooks/useChats";
import { Chat } from "../../types/socket";

export function Friend1({ userContact }: { userContact: IUser }) {
  const router = useRouter();
  const { user } = useUserContext();
  const [token, setToken] = useState<string>("");
  const { chats } = useChats()
  const [correctChat, setCorrectChat] = useState<Chat[]>()

  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem("token");
      if (!token) return;
      setToken(token);
    }
    getToken();
  }, [token]);

  async function onPress() {
    if (!user) return;

    const existingChat = chats.find((chat) => {
      const memberIds = chat.members.map((m) => m.profile_id);
      return (
        memberIds.includes(user.id) &&
        memberIds.includes(userContact.id) &&
        chat.members.length === 2 
      );
    });

    if (existingChat) {
      router.push({
        pathname: "/chat",
        params: {
          chat_id: existingChat.id,
          name: userContact.name,
          avatar: userContact.image,
       
        },
      });
    } else {
      const response = await POST<Chat>({
        endpoint: `${API_BASE_URL}/chats/create`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        token: token,
        body: {
          name: userContact.name,
          is_personal_chat: true,
          avatar: userContact.image || "uploads/user.png",
          members: [user, userContact],
        },
      });

      if (response.status === "success" && response.data) {
        const createdChat = response.data;
        router.push({
          pathname: "/chat",
          params: {
            chat_id: createdChat.id,
            name: userContact.name,
            avatar: userContact.image,
          
          },
        });
      }
    }
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image
          source={{
            uri:
              API_BASE_URL + "/" + userContact?.image ||
              "../../../../shared/ui/images/user.png",
          }}
          style={styles.avatar}
        />
        <View style={{flexDirection: "row", gap: 4}}>
          <Text style={styles.name}>{userContact?.name || "Anonymous"}</Text>
          <Text style={styles.name}>{userContact?.surname || "Anonymous"}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
