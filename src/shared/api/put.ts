import { Result } from "../types/result";

interface IPutRequestParams {
    endpoint: string;
    headers?: HeadersInit;
    token?: string;
    body: any;
}

export async function PUT<T>(params: IPutRequestParams): Promise<Result<T>> {
    const { endpoint, headers, token, body } = params;
    const requestHeaders: HeadersInit = new Headers(headers);
    requestHeaders.set("Content-Type", "application/json");
    if (token) {
        requestHeaders.set("Authorization", `Bearer ${token}`);
    }

    try {
        const response = await fetch(endpoint, {
            headers: requestHeaders,
            body: JSON.stringify(body),
            method: "PUT",
        });

        const responseData: Result<T> = await response.json();

        if (responseData.status === "error") {
            return { ...responseData, code: response.status };
        }

        return responseData;
    } catch (err) {
        console.error("Помилка в PUT:", err);

        return {
            status: "error",
            message: err instanceof Error ? err.message : "Мережева помилка",
            code: 500,
        };
    }
}
