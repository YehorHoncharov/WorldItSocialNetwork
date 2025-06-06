import { useEffect, useState } from "react";
import { IUser } from "../../auth/types";


export function useUsers() {
	const [users, setUsers] = useState<IUser[]>([]);

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await fetch("http://192.168.1.104:3000/user/all");
				const result = await response.json();
				if (result.status === "error") {
					console.log(result)
					return;
				}
				setUsers(result)
			} catch (err) {
				console.error(err);}
			
			}
		fetchUsers();
	}, [])
	console.log(users)

	return { users};
}