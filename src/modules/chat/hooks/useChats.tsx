import { useCallback, useEffect, useState } from "react";
import { Chat } from "../types/socket";
import { API_BASE_URL } from "../../../settings";

export function useChats() {
    const [chats, setChats] = useState<Chat[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getChats = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(`${API_BASE_URL}/chats`);
            const result = await response.json();

            if (result.status === "error") {
                return;
            }

            setChats([...result.data]);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown error";
            console.error(message);
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getChats();
    }, [getChats]);

    return { chats, isLoading, error, refetchChats: getChats };
}
