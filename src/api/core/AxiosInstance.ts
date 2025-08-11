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

interface AuthError extends Error {
  response?: {
    status: number;
    data?: unknown;
  };
  status?: number;
  code?: number;
}

type AuthErrorHandler = (error: AuthError | AxiosError) => void;

class ApiCore {
  private client: AxiosInstance;
  private static instance: ApiCore;
  private authErrorHandler: AuthErrorHandler | null = null;
  private protectedRoutes: string[] = [];
  private isRouteProtectionEnabled = false;

  private constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
      timeout: 400000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.setupInterceptors();
  }

  public static getInstance(): ApiCore {
    if (!ApiCore.instance) {
      ApiCore.instance = new ApiCore();
    }
    return ApiCore.instance;
  }

  public setProtectedRoutes(routes: string[]): void {
    this.protectedRoutes = routes;
    this.isRouteProtectionEnabled = true;
  }

  public disableRouteProtection(): void {
    this.isRouteProtectionEnabled = false;
  }

  private isCurrentRouteProtected(): boolean {
    if (!this.isRouteProtectionEnabled) return true;

    if (typeof window === "undefined") return false;

    const currentPath = window.location.pathname;

    return this.protectedRoutes.some((route) => {
      if (route.endsWith("/*")) {
        const basePath = route.slice(0, -2);
        return (
          currentPath !== basePath && currentPath.startsWith(basePath + "/")
        );
      }
      return currentPath === route;
    });
  }

  public setAuthErrorHandler(handler: AuthErrorHandler): void {
    this.authErrorHandler = handler;
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config) => {
        if (typeof window !== "undefined") {
          const getCookie = (name: string): string | undefined => {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop()?.split(";").shift();
          };

          const token = getCookie("auth_session");

          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
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
        if (error.code === "ERR_NETWORK") {
          console.log("Network Error detected");
          if (this.authErrorHandler) {
            this.authErrorHandler(error);
          }
        }
        if (error.response?.status === 401 && this.isCurrentRouteProtected()) {
          console.log(
            "401 Unauthorized detected in protected route:",
            window.location.pathname,
          );

          if (this.authErrorHandler) {
            this.authErrorHandler(error);
          } else {
            this.handleDefaultAuthError();
          }
        }

        return Promise.reject(error);
      },
    );
  }

  private handleDefaultAuthError(): void {
    console.warn("No auth error handler set, using default behavior");

    if (typeof window !== "undefined") {
      document.cookie =
        "auth_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    }
  }

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
