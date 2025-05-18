import { useState, useEffect } from "react";
import { IPost } from "../types/post";
import { GET } from "../../../shared/api/get";
import { Result, Success } from "../../../shared/types/result";

export function usePosts() {
	const [posts, setPosts] = useState<IPost[]>([]);

	useEffect(() => {
		async function getPost() {
			try {
				console.log("response");
				const response = await fetch("http://192.168.1.104:3000/posts");
				console.log(" posle response");
				const result = await response.json();
				console.log("=============");
				console.log(result);
				if (!result) {
					return;
				}
				console.log("usePosts");
				console.log(result + " result");
				console.log(result[0].images);
				setPosts(result);
			} catch (error) {
				const err = error instanceof Error ? error.message : undefined;
				console.error("Error fetching posts:", err);
			}
		}
		getPost();
	}, []);

	return { posts: posts };
}
