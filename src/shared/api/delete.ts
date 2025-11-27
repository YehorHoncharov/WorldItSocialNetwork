import { Result } from "../types/result";

interface IDeleteRequestParams {
    endpoint: string;
    headers?: HeadersInit;
    token?: string;
}

export async function DELETE<T>(params: IDeleteRequestParams): Promise<Result<T>> {
    const { endpoint, headers, token } = params;
    const requestHeaders: HeadersInit = new Headers(headers);
    if (token) {
        requestHeaders.set("Authorization", `Bearer ${token}`);
    }

    try {
        const response = await fetch(endpoint, {
            headers: requestHeaders,
            method: "DELETE",
        });

        const responseData =
            response.status !== 204 ? await response.json() : { status: "success" };

        if (responseData.status === "error") {
            return { ...responseData, code: response.status };
        }

        return responseData;
    } catch (err) {
        console.log(err);
        return {
            status: "error",
            message: "Network error!",
            code: 400,
        };
    }
}
