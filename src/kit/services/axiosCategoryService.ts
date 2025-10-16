import axios from "axios";
import type {
    AxiosInstance,
    InternalAxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from "axios";
import authConfig from "@/config/auth";
import storage from "@/kit/services/storage";
import type { ApiResponseError } from "@/kit/models/CustomError";

export type SortType = "asc" | "desc" | undefined | null;
export type Params = Record<
    string,
    string | string[] | number | boolean | undefined | SortType
>;
export type Headers = Record<string, string>;

const axiosInstance: AxiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_CATEGORY_BASE_API}`,
});

/** Add request/response interceptor */
let isRefreshing = false; // Flag to prevent multiple refresh calls
let refreshSubscribers: Array<(token: string) => void> = [];

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const accessToken = storage.getItem(authConfig.storageTokenKeyName);

        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
            config.headers["Content-Type"] = `application/json`;
            config.headers["Access-Control-Allow-Origin"] = `*`;
            config.headers["Access-Control-Allow-Headers"] =
                `Content-Type, Authorization`;
            config.params = {
                ...config.params,
            };
        }

        return config;
    },
    (error) => Promise.reject(error)
);

function onRefreshed(token: string) {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
}

function addRefreshSubscriber(callback: (token: string) => void) {
    refreshSubscribers.push(callback);
}

/** Add request/response interceptor */
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
        const originalRequest = error.config;
        const response = error.response;

        //statusCode 10004 os only for refreshToken expire
        if (response.data.statusCode === 10004) {
            handleLogout(); // Logout on refresh failure
        }
        if (response && response.status === 401 && !originalRequest._retry) {
            const storedRefreshToken = storage.getItem(
                authConfig.storageRefreshKeyName
            )!;

            if (!storedRefreshToken) {
                return Promise.reject(error);
            }

            if (isRefreshing) {
                // Queue the failed request until the token is refreshed
                return new Promise((resolve) => {
                    addRefreshSubscriber((token: string) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        originalRequest.headers["Content-Type"] = `application/json`;
                        originalRequest.headers["Access-Control-Allow-Origin"] = `*`;
                        originalRequest.headers["Access-Control-Allow-Headers"] =
                            `Content-Type, Authorization`;
                        resolve(axiosInstance(originalRequest));
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshResponse = await axiosInstance.post(
                    authConfig.refreshEndpoint,
                    {
                        refreshToken: storedRefreshToken,
                    }
                );

                if (refreshResponse.status === 201) {
                    const { accessToken, refreshToken } = refreshResponse.data.data;
                    storage.setItem(authConfig.storageTokenKeyName, accessToken);
                    storage.setItem(authConfig.storageRefreshKeyName, refreshToken);

                    onRefreshed(accessToken);
                    isRefreshing = false;

                    // Retry the original request with the new token
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;

                    return axiosInstance(originalRequest);
                } else {
                    handleLogout();
                }
            } catch (e) {
                handleLogout(); // Logout on refresh failure
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

const get = async (path: string, params?: Params, headers?: Headers) => {
    try {
        const response = await axiosInstance.get(path, {
            params: params,
            headers: headers,
        });

        return handleResponse(response);
    } catch (error) {
        return handleError(error as AxiosError);
    }
};

const post = async (
    path: string,
    payload?: object,
    params?: Params,
    headers?: Headers
) => {
    try {
        const response = await axiosInstance.post(path, payload, {
            params: params,
            headers: headers,
        });

        return handleResponse(response);
    } catch (error) {
        return handleError(error as AxiosError);
    }
};

const patch = async (
    path: string,
    payload?: object,
    params?: Params,
    headers?: Headers
) => {
    try {
        const response = await axiosInstance.patch(path, payload, {
            params: params,
            headers: headers,
        });

        return handleResponse(response);
    } catch (error) {
        return handleError(error as AxiosError);
    }
};

const remove = async (path: string, params?: Params, headers?: Headers) => {
    try {
        const response = await axiosInstance.delete(path, {
            params: params,
            headers: headers,
        });

        return handleResponse(response);
    } catch (error) {
        return handleError(error as AxiosError);
    }
};

export const request = async ({
    path,
    method,
    payload,
    params,
    headers,
}: {
    path: string;
    method: "POST" | "PATCH" | "GET" | "DELETE";
    payload?: object;
    params?: Params;
    headers?: Headers;
}) => {
    try {
        const response = await axiosInstance.request({
            method,
            url: path,
            data: payload,
            params: params,
            headers: headers,
        });

        return handleResponse(response);
    } catch (error) {
        return handleError(error as AxiosError);
    }
};

const handleResponse = (response: AxiosResponse): any => {
    const data = response.data;
    if (typeof data === "string") {
        try {
            return JSON.parse(data);
        } catch (error) {
            return data;
        }
    } else if (typeof data === "object" && data !== null) {
        return data;
    }
};

const handleError = (error: AxiosError): never => {
    const responseData = error.response?.data as ApiResponseError;
    const statusCode = error.response?.status;

    if (statusCode === 500) {
        throw [
            {
                title: "general_error",
                detail: "An error occurred, Please retry again later",
                code: statusCode || 500,
            },
        ];
    } else {
        if (responseData?.errors) {
            const errors = responseData as ApiResponseError;
            throw errors;
        } else {
            throw responseData;
        }
    }
};

/** Handle logout logic */
function handleLogout() {
    storage.removeItem(authConfig.storageUserIDName);
    storage.removeItem(authConfig.storageUserDetailName);
    storage.removeItem(authConfig.storageCompanyDetailName);
    storage.removeItem(authConfig.storageTokenKeyName);
    storage.removeItem(authConfig.storageRefreshKeyName);

    window.location.href = "/sign-in"; // Example: Redirect to login page
}

export default { get, post, patch, remove, request };
