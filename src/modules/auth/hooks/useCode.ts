import { API_BASE_URL } from "../../../settings";
import { Response } from "../context/types";

export async function sendCode(email: string): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/users/sendCode`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const result: Response<string> = await response.json();

        if (result.status === "error") {
            console.log("Error sending code:", result.message);
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log("sendCode error:", error.message);
        } else {
            console.log("sendCode unknown error", error);
        }
    }
}
