// lib/api-service.ts
import { env } from "@/env";
import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosResponse,
} from "axios";

interface ApiServiceOptions {
  baseURL: string;
  timeout?: number;
}

export type ApiResponse<T = unknown> = Promise<T>;

export interface ApiServiceInterface {
  get: <T = unknown>(
    url: string,
    params?: Record<string, unknown>,
  ) => ApiResponse<T>;
  post: <T = unknown>(url: string, data?: unknown) => ApiResponse<T>;
  put: <T = unknown>(url: string, data?: unknown) => ApiResponse<T>;
  patch: <T = unknown>(url: string, data?: unknown) => ApiResponse<T>;
  delete: <T = unknown>(url: string) => ApiResponse<T>;
}

export const createApiService = (
  defaultParams: Record<string, unknown>,
  options: ApiServiceOptions,
): ApiServiceInterface => {
  const { baseURL, timeout = 10000 } = options;

  const axiosInstance: AxiosInstance = axios.create({
    baseURL,
    timeout,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (config.method?.toLowerCase() === "get") {
        config.params = {
          ...(config.params as Record<string, unknown>),
          ...defaultParams,
        };
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  return {
    get: <T = unknown>(
      url: string,
      params: Record<string, unknown> = {},
    ): ApiResponse<T> =>
      axiosInstance
        .get<T>(url, { params })
        .then((response: AxiosResponse<T>) => response.data),

    post: <T = unknown>(url: string, data?: unknown): ApiResponse<T> =>
      axiosInstance
        .post<T>(url, data)
        .then((response: AxiosResponse<T>) => response.data),

    put: <T = unknown>(url: string, data?: unknown): ApiResponse<T> =>
      axiosInstance
        .put<T>(url, data)
        .then((response: AxiosResponse<T>) => response.data),

    patch: <T = unknown>(url: string, data?: unknown): ApiResponse<T> =>
      axiosInstance
        .patch<T>(url, data)
        .then((response: AxiosResponse<T>) => response.data),

    delete: <T = unknown>(url: string): ApiResponse<T> =>
      axiosInstance
        .delete<T>(url)
        .then((response: AxiosResponse<T>) => response.data),
  };
};

const { HG_API_KEY, HG_FINANCE_BASE_URL } = env as {
  HG_API_KEY: string;
  HG_FINANCE_BASE_URL: string;
};

export const hgHttpService = createApiService(
  { key: HG_API_KEY },
  { baseURL: HG_FINANCE_BASE_URL },
);
