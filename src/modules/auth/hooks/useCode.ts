import { API_BASE_URL } from "../../../settings";
import { Response } from "../context/types";

export async function sendCode(email: string) {
	try {
		const response = await fetch(
			`${API_BASE_URL}/user/sendCode`,
			{
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email: email }),
			}
		);
		const result: Response<string> = await response.json();

		if (result.status === "error") {

			return;
		}
	} catch (error) {
		console.log("Login error:", error);
	}
}
