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
      
      const response = await fetch("http://192.168.1.106:3000/posts");
      const result = await response.json();
      
      if (!response.ok) {
        setError(`Error: ${response.status} ${response.statusText}`);
        return;
      }

      setPosts(result);
      return result;
    } catch (error) {
      const err = error instanceof Error ? error.message : "Unknown error";
      console.error(err);
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