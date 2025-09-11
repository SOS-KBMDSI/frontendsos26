import {
  DashboardData,
  dashboardService,
} from "@/api/services/admin/dashboard";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await dashboardService.getDashboardData();
      setData(response.data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return useMemo(
    () => ({
      data,
      isLoading,
      error,
      refresh: fetchData,
    }),
    [data, isLoading, error, fetchData],
  );
};
