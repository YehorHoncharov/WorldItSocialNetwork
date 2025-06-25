import { useCallback, useEffect, useState } from "react";
import { IFriendship } from "../types/friends.type";
import { API_BASE_URL } from "../../../settings";

export function useFriends() {
	const [friends, setFriends] = useState<IFriendship[]>([]);

	async function getFriends(){
		try {
			const response = await fetch(`${API_BASE_URL}/friendship/all`);
			const result = await response.json();
			if (result.status === "error") {
				return;
			}
			setFriends(result)
		} catch (err) {
			console.error(err);
		}

	}

	useEffect(()=>{
		getFriends();
	}, [friends])

	return { friends };
}