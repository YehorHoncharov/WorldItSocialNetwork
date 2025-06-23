import { useCallback, useEffect, useState } from "react";
import { IUser } from "../../auth/types";


export function useUsers() {
	const [users, setUsers] = useState<IUser[]>([]);

	const getUsers = useCallback(async () => {
		try {
			const response = await fetch("http://192.168.1.104:3000/user/all");
			const result = await response.json();
			if (result.status === "error") {
				return;
			}
			setUsers(result)
		} catch (err) {
			console.error(err);
		}

	}, [])
	useEffect(()=>{
		getUsers()
	}, [getUsers])

	return { users, refetchUsers: getUsers }
}

// import { useEffect, useState } from "react";
// import { IUser } from "../../auth/types";


// export function useUsers() {
// 	const [users, setUsers] = useState<IUser[]>([]);

// 	useEffect(() => {
// 		const fetchUsers = async () => {
// 			try {
// 				const response = await fetch("http://192.168.1.104:3000/user/all");
// 				const result = await response.json();
// 				if (result.status === "error") {
// 					return;
// 				}
// 				setUsers(result)
// 			} catch (err) {
// 				console.error(err);}
			
// 			}
// 		fetchUsers();
// 	}, [])
	
// 	return { users};
// }