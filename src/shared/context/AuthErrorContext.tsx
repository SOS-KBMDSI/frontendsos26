"use client";

import { apiClient, ApiResponse } from "@/api/core/AxiosInstance";
import { AxiosError } from "axios";
import { createContext, ReactNode, useRef, useEffect } from "react";
import { useToast } from "../hooks/useToast";

interface AuthErrorContextType {
  handleAuthError: (error: AuthError | AxiosError) => void;
  checkAndHandleAuthError: (
    response: ApiResponse<unknown> | AuthError,
  ) => boolean;
}

interface AuthError extends Error {
  response?: {
    status: number;
    data?: unknown;
  };
  status?: number;
  code?: number;
}

export const AuthErrorContext = createContext<AuthErrorContextType | undefined>(
  undefined,
);

interface AuthErrorProviderProps {
  children: ReactNode;
  protectedRoutes?: string[];
}

export const AuthErrorProvider = ({
  children,
  protectedRoutes,
}: AuthErrorProviderProps) => {
  const { showToast } = useToast();

  // Anti-spam references
  const hasShownAuthToastRef = useRef(false);
  const hasShownNetworkToastRef = useRef(false);
  const lastAuthErrorTimeRef = useRef(0);
  const lastNetworkErrorTimeRef = useRef(0);
  const isRedirectingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Debounce intervals (in milliseconds)
  const AUTH_ERROR_DEBOUNCE = 5000; // 5 seconds
  const NETWORK_ERROR_DEBOUNCE = 3000; // 3 seconds

  const isAuthError = (
    error: AuthError | AxiosError | ApiResponse<unknown>,
  ): boolean => {
    return (
      ("response" in error && error.response?.status === 401) ||
      ("status" in error && error.status === 401) ||
      ("code" in error && error.code === 401) ||
      ("message" in error &&
        error.message &&
        (error.message.includes("401") ||
          error.message.toLowerCase().includes("unauthorized"))) ||
      (typeof error === "string" && (error as string).includes("401"))
    );
  };

  const checkInternetConnection = async (): Promise<boolean> => {
    if (!navigator.onLine) {
      return false;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      await fetch("https://www.google.com/favicon.ico", {
        method: "HEAD",
        cache: "no-cache",
        mode: "no-cors",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      return true;
    } catch {
      return false;
    }
  };

  const handleNetworkError = async (): Promise<void> => {
    const now = Date.now();

    // Prevent spam - only show network error toast if enough time has passed
    if (
      hasShownNetworkToastRef.current &&
      now - lastNetworkErrorTimeRef.current < NETWORK_ERROR_DEBOUNCE
    ) {
      return;
    }

    hasShownNetworkToastRef.current = true;
    lastNetworkErrorTimeRef.current = now;

    const hasInternet = await checkInternetConnection();

    if (!hasInternet) {
      showToast({
        type: "error",
        title: "Koneksi Internet Gagal",
        message:
          "Anda tidak terhubung ke internet. Mohon periksa koneksi Anda.",
        duration: 10000,
      });
    } else {
      showToast({
        type: "error",
        title: "Server Bermasalah",
        message:
          "Server sedang mengalami gangguan. Mohon coba beberapa saat lagi.",
        duration: 8000,
      });
    }

    // Reset network error flag after debounce period
    setTimeout(() => {
      hasShownNetworkToastRef.current = false;
    }, NETWORK_ERROR_DEBOUNCE);
  };

  const showSessionExpiredToast = (): void => {
    const now = Date.now();

    // Prevent spam - only show auth error toast if enough time has passed
    if (
      hasShownAuthToastRef.current &&
      now - lastAuthErrorTimeRef.current < AUTH_ERROR_DEBOUNCE
    ) {
      return;
    }

    // Prevent multiple redirects
    if (isRedirectingRef.current) {
      return;
    }

    hasShownAuthToastRef.current = true;
    lastAuthErrorTimeRef.current = now;
    isRedirectingRef.current = true;

    showToast({
      type: "error",
      title: "Sesi Berakhir",
      message: "Sesi anda telah berakhir",
      duration: 4000,
    });

    // Clear auth cookie
    if (typeof window !== "undefined") {
      document.cookie =
        "auth_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  };

  const handleAuthError = async (
    error: AuthError | AxiosError,
  ): Promise<void> => {
    console.log("Auth error handled:", error);

    // Handle network errors
    if (error.code === "ERR_NETWORK") {
      await handleNetworkError();
      return;
    }

    // Handle auth errors
    if (isAuthError(error)) {
      showSessionExpiredToast();
    }
  };

  const checkAndHandleAuthError = (
    response: ApiResponse<unknown> | AuthError,
  ): boolean => {
    if (isAuthError(response)) {
      showSessionExpiredToast();
      return true;
    }
    return false;
  };

  useEffect(() => {
    apiClient.setAuthErrorHandler(handleAuthError);

    if (protectedRoutes && protectedRoutes.length > 0) {
      apiClient.setProtectedRoutes(protectedRoutes);
    } else {
      apiClient.disableRouteProtection();
    }

    const resetFlags = () => {
      // Only reset if not currently redirecting
      if (!isRedirectingRef.current) {
        hasShownAuthToastRef.current = false;
        hasShownNetworkToastRef.current = false;
        lastAuthErrorTimeRef.current = 0;
        lastNetworkErrorTimeRef.current = 0;
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && !isRedirectingRef.current) {
        resetFlags();
      }
    };

    const handleOnline = () => {
      // Reset network error flag when back online
      hasShownNetworkToastRef.current = false;

      // Only show success toast if we're not redirecting
      if (!isRedirectingRef.current) {
        showToast({
          type: "success",
          title: "Koneksi Pulih",
          message: "Koneksi internet telah pulih",
          duration: 3000,
        });
      }
    };

    const handleOffline = () => {
      // Don't show offline toast if we're redirecting
      if (!isRedirectingRef.current) {
        showToast({
          type: "error",
          title: "Koneksi Terputus",
          message: "Koneksi internet terputus",
          duration: 5000,
        });
      }
    };

    // Add page unload handler to prevent spam on refresh
    const handleBeforeUnload = () => {
      hasShownAuthToastRef.current = true;
      hasShownNetworkToastRef.current = true;
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [protectedRoutes, showToast]);

  const contextValue: AuthErrorContextType = {
    handleAuthError,
    checkAndHandleAuthError,
  };

  return (
    <AuthErrorContext.Provider value={contextValue}>
      {children}
    </AuthErrorContext.Provider>
  );
};
