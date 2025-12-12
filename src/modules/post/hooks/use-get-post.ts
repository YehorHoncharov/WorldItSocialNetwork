import { useState, useEffect, useCallback } from "react";
import { IPost } from "../types/post";
import { API_BASE_URL } from "../../../settings";

export function usePosts() {
    const [posts, setPosts] = useState<IPost[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getPosts = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(`${API_BASE_URL}/posts`);
            const result = await response.json();

            if (!response.ok) {
                setError(`Error: ${response.status} ${response.statusText}`);
                return;
            }

            setPosts([...result]);
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error";
            console.log(message);
            setError(message);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return {
        posts,
        isLoading,
        error,
        refresh: getPosts,
        setPosts,
    };
}
