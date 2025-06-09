import { useState, useEffect, useCallback } from "react";
import { IPost } from "../types/post";

export function usePosts() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPost = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const timestamp = Date.now();
      const response = await fetch(`http://192.168.1.104:3000/posts?timestamp=${timestamp}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result) {
        console.warn("[refetch] Сервер вернул null/undefined");
        return;
      }

      setPosts(result);
      return result;
    } catch (error) {
      const err = error instanceof Error ? error.message : "Unknown error";
      console.error("[refetch] Ошибка при запросе:", err);
      setError(err);
      throw error; 
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getPost();
  }, [getPost]);

  return { 
    posts, 
    isLoading, 
    error, 
    setPosts, 
    refetch: getPost 
  };
}