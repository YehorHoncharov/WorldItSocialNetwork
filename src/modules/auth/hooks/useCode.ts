import { Response } from "../context/types";

export async function sendCode(email: string) {
	try {
		const response = await fetch(
			"http://192.168.1.104:3000/user/sendCode",
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
		console.error("Login error:", error);
	}
}
