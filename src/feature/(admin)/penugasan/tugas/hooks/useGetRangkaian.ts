import {
  rangkaianService,
  RangkaianSummary,
} from "@/api/services/admin/rangkaian";
import { useState, useEffect, useCallback } from "react";

export const useGetRangkaian = () => {
  const [data, setData] = useState<RangkaianSummary[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await rangkaianService.getAllRangkaian();
      setData(response.data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengambil data rangkaian";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return {
    data,
    isLoading,
    error,
    refresh: fetchAll,
  };
};
