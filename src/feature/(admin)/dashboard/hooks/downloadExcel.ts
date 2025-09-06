import { dashboardService } from "@/api/services/admin/dashboard";
import { useState, useCallback } from "react";

interface UseDashboardExcelReturn {
  isDownloading: boolean;
  error: string | null;
  downloadExcel: (filename?: string) => Promise<void>;
  clearError: () => void;
}

export const useDashboardExcel = (): UseDashboardExcelReturn => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const downloadExcel = useCallback(async () => {
    try {
      setIsDownloading(true);
      setError(null);

      const now = new Date();
      const formattedDate = now.toISOString().split("T")[0];
      const formattedTime = now.toTimeString().split(" ")[0].replace(/:/g, "-");
      const filename = `dashboard_data_${formattedDate}_${formattedTime}.xlsx`;

      await dashboardService.downloadAndSaveDashboardExcel(filename);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to download Excel file";
      setError(errorMessage);
      throw err;
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
