import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosResponseHeaders,
  RawAxiosResponseHeaders,
} from "axios";

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface BlobResponse {
  data: Blob;
  headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
  status: number;
}

class ApiCore {
  private client: AxiosInstance;
  private static instance: ApiCore;

  private constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      timeout: 400000,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    this.setupInterceptors();
  }

  public static getInstance(): ApiCore {
    if (!ApiCore.instance) {
      ApiCore.instance = new ApiCore();
    }
    return ApiCore.instance;
  }

  private setupInterceptors(): void {
    // Interceptor to add the token from the cookie to every request
    this.client.interceptors.request.use(
      (config) => {
        // This check ensures the code only runs in the browser
        if (typeof window !== "undefined") {
          // 👇 --- DEBUGGING LOGS START --- 👇
          console.log("--- Axios Interceptor ---");
          console.log("Current document.cookie:", document.cookie);
          // 👆 --- DEBUGGING LOGS END --- 👆

          // Helper function to read a cookie
          const getCookie = (name: string): string | undefined => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(";").shift();
          };

          const token = getCookie("auth_session");

          // 👇 --- DEBUGGING LOGS START --- 👇
          if (token) {
            console.log("Token found in cookie:", token);
            config.headers.Authorization = `Bearer ${token}`;
            console.log(
              "Authorization header set:",
              config.headers.Authorization,
            );
          } else {
            console.log("Auth token not found in cookie.");
          }
          console.log("-------------------------");
          // 👆 --- DEBUGGING LOGS END --- 👆
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      },
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          if (typeof window !== "undefined") {
            // If unauthenticated, redirect to the login page
            window.location.href = "/login";
          }
        }
        return Promise.reject(error);
      },
    );
  }

  // --- API Methods (GET, POST, PUT, PATCH, DELETE) ---
  public async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.client.get<ApiResponse<T>>(url, config).then((res) => res.data);
  }

  public async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.client
      .post<ApiResponse<T>>(url, data, config)
      .then((res) => res.data);
  }

  public async put<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.client
      .put<ApiResponse<T>>(url, data, config)
      .then((res) => res.data);
  }

  public async patch<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.client
      .patch<ApiResponse<T>>(url, data, config)
      .then((res) => res.data);
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    return this.client
      .delete<ApiResponse<T>>(url, config)
      .then((res) => res.data);
  }

  public async getBlob(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<BlobResponse> {
    const response = await this.client.get<Blob>(url, {
      ...config,
      responseType: "blob",
    });
    return {
      data: response.data,
      headers: response.headers,
      status: response.status,
    };
  }
}

export const apiClient = ApiCore.getInstance();
