import { useCallback, useEffect, useState } from "react";
import { Chat } from "../types/socket";
import { API_BASE_URL } from "../../../settings";

export function useChats() {
  const [chats, setChats] = useState<Chat[]>([]);

  const getChats = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/chats`);
      const result = await response.json();

      if (result.status === "error") {
        return;
      }
      setChats(result.data);
      return result;
    } catch (error) {
      const err = error instanceof Error ? error.message : "Unknown error";
      console.log(err);
    }
  }, []);

  useEffect(()=>{
	getChats()
  }, [getChats])

  return { chats, refetchChats: getChats };
}
