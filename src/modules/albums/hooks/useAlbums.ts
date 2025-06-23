// import { useState, useEffect, useCallback } from "react";
// import { IAlbum } from "../types/albums.types";

// export function useAlbums() {
//   const [albums, setAlbums] = useState<IAlbum[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   async function getAlbum(){
//     try {
//       setIsLoading(true);
//       setError(null);

//       const response = await fetch("http://192.168.1.104:3000/albums");
//       const result = await response.json();

//       if (result.status === "error") {
//         return
//       }

//       setAlbums(result);
//       return result
//     } catch (error) {
//       const err = error instanceof Error ? error.message : "Unknown error";
//       console.error("Error fetching albums:", err);
//       setError(err);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   useEffect(() => {
//     getAlbum();
//   }, []);

//   return {
//     albums,
//     isLoading,
//     error,
//     setAlbums,
//     refetch: getAlbum,
//   };
// }

import { useState, useEffect, useCallback } from "react";
import { IAlbum } from "../types/albums.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_BASE_URL } from "../../../settings";


export function useAlbums() {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAlbum = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = await AsyncStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch(`${API_BASE_URL}/albums`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (result.status === "error") {
        throw new Error(result.message || "Failed to fetch albums");
      }

      setAlbums(result);
      return result;
    } catch (error) {
      const err = error instanceof Error ? error.message : "Unknown error";
      setError(err);
      return [];
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
    refetch: getAlbum,
  };
}