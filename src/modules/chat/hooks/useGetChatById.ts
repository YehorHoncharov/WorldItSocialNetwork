import { useEffect, useState } from "react";
import { Chat } from "../types/socket";
import { API_BASE_URL } from "../../../settings";

export function useGetChatById(id: number) {
    const [chat, setChat] = useState<Chat[]>([]);

    useEffect(() => {
        const getChat = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/chats/${id}`);
                const result = await response.json();
                if (result.status === "error") {
                    return;
                }
                setChat(result);
            } catch (err) {
                console.error(err);
            }
        };
        getChat();
    }, []);

    return { chat };
}
