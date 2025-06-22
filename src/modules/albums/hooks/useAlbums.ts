import { useState, useEffect, useCallback } from "react"
import { IAlbum } from "../types/albums.types"

export function useAlbums() {
  const [albums, setAlbums] = useState<IAlbum[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getAlbum = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)

      const response = await fetch("http://192.168.1.104:3000/albums")
      const result = await response.json()
      console.log("альбомы ХУК", result);


      if (result.status === "error") {
        return;
      }

      setAlbums(result)
      return result
    } catch (error) {
      const err = error instanceof Error ? error.message : "Unknown error"
      console.error(err)
      setError(err)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    getAlbum()
  }, [getAlbum])

  return {
    albums,
    isLoading,
    error,
    setAlbums,
    refetch: getAlbum
  }
}