import { useState, useEffect } from "react";
import { IPost } from "../types/post"

export function usePostsById(id: number){

    const [post, setPost] = useState<IPost>()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string>()

    useEffect(() => {
        async function getPost() {
            try {
                setIsLoading(true)
                const response = get(`http://192.168.1.104:3000/posts/${id}`)
                const result = await response.json()
                if (result.status === 'success') {
                    setPost(result.data)
                } else {
                    setError(result.message)
                }
            }
            catch (error) {
                const err = error instanceof Error ? error.message : undefined
                setError(`${err}`)
            }
            finally {
                setIsLoading(false)
            }
        }
        getPost()
    }, [id])

    return {post: post, isLoading: isLoading, error: error}
}