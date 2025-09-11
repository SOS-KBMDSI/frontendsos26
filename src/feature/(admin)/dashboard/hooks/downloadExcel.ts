import { apiClient } from "@/api/core/AxiosInstance";
import { AxiosResponse } from "axios";
import { useState, useCallback } from "react";

interface UseExcelDownloadReturn {
  isDownloading: boolean;
  error: string | null;
  downloadExcel: (filename?: string) => Promise<void>;
  downloadExcelBlob: () => Promise<Blob | null>;
  clearError: () => void;
}

interface UseExcelDownloadOptions {
  endpoint: string;
  defaultFilename?: string;
  autoDownload?: boolean;
}

export const useExcelDownload = ({
  endpoint,
  defaultFilename = "data.xlsx",
  autoDownload = true,
}: UseExcelDownloadOptions): UseExcelDownloadReturn => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadExcelBlob = useCallback(async (): Promise<Blob | null> => {
    try {
      setIsDownloading(true);
      setError(null);

      try {
        const response: AxiosResponse<Blob> = await apiClient.getBlob(endpoint);

        if (!(response.data instanceof Blob)) {
          throw new Error("Invalid response format: Expected a Blob");
        }

        if (response.data.size === 0) {
          throw new Error("Empty file received from server");
        }

        return response.data;
      } catch (primaryError) {
        console.warn(
          "Primary download method failed, trying fallback:",
          primaryError,
        );

        const response = await apiClient.get<Blob>(endpoint, {
          responseType: "blob",
          headers: {
            Accept:
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          },
        });

        if (!(response.data instanceof Blob)) {
          console.error(
            "Invalid response format: Expected a Blob but received",
            typeof response.data,
          );
          throw new Error("The server response was not a valid file.");
        }

        if (response.data.size === 0) {
          throw new Error("Empty file received from server");
        }

        return response.data;
      }
    } catch (err) {
      console.error("Download excel blob error:", err);
      const errorMessage =
        err instanceof Error
          ? `Failed to download Excel file: ${err.message}`
          : "An unknown error occurred while downloading Excel file.";
      setError(errorMessage);
      return null;
    } finally {
      setIsDownloading(false);
    }
  }, [endpoint]);

  const downloadFile = useCallback((blob: Blob, filename: string): void => {
    try {
      if (!(blob instanceof Blob)) {
        throw new Error("Invalid blob data received");
      }

      if (blob.size === 0) {
        throw new Error("Empty file received from server");
      }

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("Error downloading file:", error);
      throw new Error(
        `Failed to download file: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    }
  }, []);

  const downloadExcel = useCallback(
    async (filename?: string): Promise<void> => {
      try {
        const blob = await downloadExcelBlob();
        if (blob) {
          if (autoDownload) {
            downloadFile(blob, filename || defaultFilename);
          }
        } else {
          throw new Error("Failed to get blob data for download");
        }
      } catch (err) {
        console.error("All download methods failed:", err);
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Failed to download and save Excel file";
        setError(errorMessage);
        throw err;
      }
    },
    [downloadExcelBlob, downloadFile, defaultFilename, autoDownload],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isDownloading,
    error,
    downloadExcel,
    downloadExcelBlob,
    clearError,
  };
};
