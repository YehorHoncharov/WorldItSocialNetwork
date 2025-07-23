import { useCallback, useEffect, useState } from "react";
import { IUser } from "../../auth/types";
import { API_BASE_URL } from "../../../settings";


export function useUsers() {
	const [users, setUsers] = useState<IUser[]>([]);

	async function getUsers(){
		try {
			const response = await fetch(`${API_BASE_URL}/user/all`);
			const result = await response.json();
			if (result.status === "error") {
				return;
			}
			setUsers(result)
		} catch (err) {
			console.log(err);
		}
	}

	useEffect(()=>{
		getUsers()
	}, [users])

	return { users }
}