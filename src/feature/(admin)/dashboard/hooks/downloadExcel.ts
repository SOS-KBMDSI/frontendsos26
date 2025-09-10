import { dashboardService } from "@/api/services/admin/dashboard";
import { AxiosResponse } from "axios";
import { useState, useCallback } from "react";

interface UseDashboardExcelReturn {
  isDownloading: boolean;
  error: string | null;
  downloadExcel: () => Promise<Blob | null>;
  clearError: () => void;
}

export const useDashboardExcel = (): UseDashboardExcelReturn => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadExcel = useCallback(async (): Promise<Blob | null> => {
    try {
      setIsDownloading(true);
      setError(null);

      const res: AxiosResponse<Blob> =
        await dashboardService.downloadDashboardExcel();

      return res.data;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to download Excel file";
      setError(errorMessage);
      return null;
    } finally {
      setIsDownloading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isDownloading,
    error,
    downloadExcel,
    clearError,
  };
};
