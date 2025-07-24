import { useState, useEffect, useCallback } from "react";
import { IAlbum } from "../types/albums.types";
import { API_BASE_URL } from "../../../settings";

export function useAlbums() {
    const [albums, setAlbums] = useState<IAlbum[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getAlbum = useCallback(async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await fetch(`${API_BASE_URL}/albums`);
            const result = await response.json();

            if (result.status === "error") {
                return
            }

            setAlbums([...result]);
        } catch (error) {
            const err = error instanceof Error ? error.message : "Unknown error";
            setError(err);
            console.error(err);
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