import { useState, useEffect, useCallback } from "react";
import { IAlbum } from "../types/albums.types";

export function useAlbums() {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAlbum = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const timestamp = Date.now();
      const response = await fetch(`http://192.168.1.104:3000/albums?timestamp=${timestamp}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (!result) {
        console.warn("[refetch] Сервер вернул null/undefined");
        return;
      }

      setAlbums(result);
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
    getAlbum();
  }, [getAlbum]);

  return { 
    albums, 
    isLoading, 
    error, 
    setAlbums, 
    refetch: getAlbum 
  };
}