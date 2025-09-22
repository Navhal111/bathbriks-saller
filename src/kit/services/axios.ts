import axios, { type AxiosInstance } from "axios";

import authConfig from "@/config/auth";

export const instance: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_API}/v1/`,
});

instance.interceptors.request.use(
  (config) => {
    const storedToken = window.localStorage.getItem(
      authConfig.storageTokenKeyName
    )!;
    if (storedToken) {
      config.headers["Authorization"] = `Bearer ${storedToken}`;
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

/** Add request/response interceptor */
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { config, response } = error;

    if (response && response.status === 401) {
      const storedRefresh = window.localStorage.getItem(
        authConfig.storageRefreshKeyName
      )!;

      instance
        .post(authConfig.refreshEndpoint, { refreshToken: storedRefresh })
        .then((response) => {
          if (response.status === 201) {
            /** set access token */
            window.localStorage.setItem(
              authConfig.storageTokenKeyName,
              response.data.data.accessToken
            );

            /** set refresh token */
            window.localStorage.setItem(
              authConfig.storageRefreshKeyName,
              response.data.data.refreshToken
            );

            const retryOriginalRequest = new Promise((resolve) => {
              config.headers["Authorization"] =
                `Bearer ${response.data.accessToken}`;
              config.headers["Content-Type"] = `application/json`;
              config.headers["Access-Control-Allow-Origin"] = `*`;
              config.headers["Access-Control-Allow-Headers"] =
                `Content-Type, Authorization`;
              config.params = {
                ...config.params,
              };
              resolve(axios(config));
            });

            return retryOriginalRequest;
          } else {
            localStorage.removeItem(authConfig.storageTokenKeyName);
            localStorage.removeItem(authConfig.storageRefreshKeyName);
          }
        });
    }

    return Promise.reject(error);
  }
);

export function get(url: string, params?: any) {
  return instance
    .get(url, params)
    .then(({ data }) => data)
    .catch((error) => Promise.reject(error?.data ? error.data : error));
}

export function post(url: string, payload?: any) {
  return instance
    .post(url, payload)
    .then(({ data }) => data)
    .catch((error) => Promise.reject(error?.data ? error.data : error));
}

export function patch(url: string, payload?: any) {
  return instance
    .patch(url, payload)
    .then(({ data }) => data)
    .catch((error) => Promise.reject(error?.data ? error.data : error));
}

export function put(url: string, payload?: any, options?: any) {
  return instance
    .put(url, payload, options)
    .then(({ data }) => data)
    .catch((error) => Promise.reject(error?.data ? error.data : error));
}

export function remove(url: string, options?: any) {
  return instance
    .delete(url, options)
    .then(({ data }) => data)
    .catch((error) => Promise.reject(error?.data ? error.data : error));
}
