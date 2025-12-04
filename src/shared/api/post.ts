import { Result } from "../types/result";

interface IPostRequestParams {
    endpoint: string;
    headers?: HeadersInit;
    token?: string;
    body: object;
}

export async function POST<T>(params: IPostRequestParams): Promise<Result<T>> {
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
            method: "POST",
        });
        const responseData: Result<T> = await response.json();

        if (responseData.status === "error") {
            return { ...responseData, code: response.status };
        }
        return responseData;
    } catch (err) {
        console.log(err);
        return {
            status: "error",
            message: "Network error!:(",
            code: 400,
        };
    }
}
