import { Result, Success, Error } from "../types/result";

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

        const text = await response.text();

        let responseData: any;
        try {
            responseData = text ? JSON.parse(text) : {};
        } catch (e) {
            console.log(e)
        }

        // if (!response.ok) {

        //     return {
        //         status: "error",
        //         message: responseData.message || `HTTP помилка: ${response.status}`,
        //         code: response.status,
        //     };
        // }

        if (responseData.status === "success" || responseData.status === "error") {
            return responseData as Result<T>;
        }

        if (responseData.id && responseData.name && responseData.text) {
            return {
                status: "success",
                data: responseData as T,
            };
        }

        if (responseData.data && responseData.data.id && responseData.data.name && responseData.data.text) {
            return {
                status: "success",
                data: responseData.data as T,
            };
        }

        return {
            status: "error",
            message: "Невідомий формат відповіді сервера",
            code: 500,
        };
        
    } catch (err) {
        console.error("Помилка в PUT:", err);

        return {
            status: "error",
            message: err instanceof Error ? err.message : "Мережева помилка",
            code: 500,
        };
    }
}