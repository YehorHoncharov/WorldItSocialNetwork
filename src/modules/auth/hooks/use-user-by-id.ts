import { useEffect, useState } from "react";
import { IUser } from "../types/user";

export function useUserById(id: number) {
	const [user, setUser] = useState<IUser>();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string>();

	useEffect(() => {
		async function getUser() {
			try {
				const response = await fetch(
					`http://localhost:3000/user/${id}`
				);
				const user = await response.json();
				setUser(user);
			} catch (error) {
				if (error instanceof Error) {
					setError(error.message);
				}
			}
		}
	});
}
