import { useEffect, useState } from "react";
import { IFriendship } from "../types/friends.type";

export function useFriends() {
	const [friends, setFriends] = useState<IFriendship[]>([]);

	useEffect(() => {
		const fetchFriends = async () => {
			try {
				const response = await fetch("http://192.168.1.104:3000/friendship/all");
				const result = await response.json();
				if (result.status === "error") {
					return;
				}
				setFriends(result)
			} catch (err) {
				console.error(err);}
			
			}
		fetchFriends();
	}, [])

	return { friends};
}