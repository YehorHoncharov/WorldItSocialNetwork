import { useState, useEffect, useCallback } from "react";
import { IAlbum } from "../types/albums.types";

export function useAlbums() {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getAlbum = useCallback(async () => {
    console.log("[refetch] Инициализация запроса постов");
    try {
      setIsLoading(true);
      setError(null);
      
      console.log("[refetch] Выполнение fetch запроса");
      const timestamp = Date.now();
      const response = await fetch(`http://192.168.1.104:3000/albums?timestamp=${timestamp}`);
      
      console.log(`[refetch] Статус ответа: ${response.status}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(`[refetch] Получено ${result?.length || 0} постов`);
      
      if (!result) {
        console.warn("[refetch] Сервер вернул null/undefined");
        return;
      }

      setAlbums(result);
      console.log("[refetch] Состояние posts успешно обновлено");
      return result; // Возвращаем результат для использования в компоненте
    } catch (error) {
      const err = error instanceof Error ? error.message : "Unknown error";
      console.error("[refetch] Ошибка при запросе:", err);
      setError(err);
      throw error; // Пробрасываем ошибку для обработки в компоненте
    } finally {
      setIsLoading(false);
      console.log("[refetch] Запрос завершен");
    }
  }, []);

  useEffect(() => {
    console.log("[refetch] Первоначальная загрузка постов");
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