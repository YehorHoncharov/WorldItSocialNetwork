import { useState, useEffect, useCallback } from "react";
import { IPost } from "../types/post";
import { API_BASE_URL } from "../../../settings";

export function usePosts() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function getPost(){
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/posts`);
      const result = await response.json();
      
      if (!response.ok) {
        setError(`Error: ${response.status} ${response.statusText}`);
        return;
      }

      setPosts(result.data);
      return result;
    } catch (error) {
      const err = error instanceof Error ? error.message : "Unknown error";
      console.error(err);
      setError(err);
      throw error; 
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getPost();
  }, [posts]);

  return { 
    posts, 
    isLoading, 
    error, 
    setPosts
  
  };
}