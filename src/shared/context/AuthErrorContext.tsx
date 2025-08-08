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
  protectedRoutes?: string[]; // Optional protected routes
}

export const AuthErrorProvider = ({
  children,
  protectedRoutes,
}: AuthErrorProviderProps) => {
  const { showToast } = useToast();
  const hasShownToastRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const showSessionExpiredToast = (): void => {
    if (hasShownToastRef.current) return;

    hasShownToastRef.current = true;

    showToast({
      type: "error",
      title: "Sesi Berakhir",
      message: "Sesi anda telah berakhir",
    });

    // Clear auth cookie
    if (typeof window !== "undefined") {
      document.cookie =
        "auth_session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    timeoutRef.current = setTimeout(() => {
      window.location.href = "/login";
    }, 2000);
  };

  const handleAuthError = (error: AuthError | AxiosError): void => {
    console.log("Auth error handled:", error);
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

    const resetFlag = () => {
      hasShownToastRef.current = false;
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        resetFlag();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("beforeunload", resetFlag);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", resetFlag);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
