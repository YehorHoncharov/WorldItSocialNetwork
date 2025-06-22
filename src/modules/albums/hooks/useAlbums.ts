import { useState, useEffect, useCallback } from "react";
import { IAlbum } from "../types/albums.types";

export function useAlbums() {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function getAlbum(){
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("http://192.168.1.104:3000/albums");
      const result = await response.json();
      console.log("=============")
      console.log(result)
      console.log("=============")

      if (result.status === "error") {
        return
      }

      console.log("в резалте у нас такие альбомы:", result)
      setAlbums(result);
      return result
    } catch (error) {
      const err = error instanceof Error ? error.message : "Unknown error";
      console.error("Error fetching albums:", err);
      setError(err);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    getAlbum();
  }, []);

  return {
    albums,
    isLoading,
    error,
    setAlbums,
    refetch: getAlbum,
  };
}