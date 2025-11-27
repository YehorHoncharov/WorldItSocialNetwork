import { useCallback, useEffect, useState } from "react";
import { IFriendship } from "../types/friends.type";
import { API_BASE_URL } from "../../../settings";

export function useFriends() {
    const [friends, setFriends] = useState<IFriendship[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getFriends = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch(`${API_BASE_URL}/friendship/all`);
            const result = await response.json();

            if (result.status === "error") {
                return;
            }
            setFriends(result);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error";
            console.error(message);
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getFriends();
    }, [getFriends]);

    return { friends, error, isLoading, refresh: getFriends };
}
