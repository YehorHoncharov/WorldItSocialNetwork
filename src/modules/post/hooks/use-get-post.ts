
// import { useState, useEffect, useCallback } from "react";
// import { IPost } from "../types/post";

// export function usePosts() {
// 	const [posts, setPosts] = useState<IPost[]>([]);
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [error, setError] = useState<string | null>(null);

// 	const getPost = useCallback(async () => {
// 		try {
// 			setIsLoading(true);
// 			setError(null);
// 			const response = await fetch("http://192.168.1.104:3000/posts");
// 			const result = await response.json();

// 			if (!result) {
// 					return;
// 				}

// 				setPosts(result);
// 			} catch (error) {
// 				const err = error instanceof Error ? error.message : null;
// 				console.error("Error fetching posts:", err);
// 				setError(err);
// 			}
// 			finally {
// 				setIsLoading(false);
// 			}
// 	}, []);

// 	useEffect(() => {
// 		getPost();
// 	}, [getPost]);

// 	return { posts, isLoading, error, setPosts, refetch: getPost };
// }
import { useState, useEffect, useCallback } from "react";
import { IPost } from "../types/post";

export function usePosts() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getPost = useCallback(async () => {
    console.log("[refetch] Инициализация запроса постов");
    try {
      setIsLoading(true);
      setError(null);
      
      console.log("[refetch] Выполнение fetch запроса");
      const timestamp = Date.now();
      const response = await fetch(`http://192.168.1.104:3000/posts?timestamp=${timestamp}`);
      
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

      setPosts(result);
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