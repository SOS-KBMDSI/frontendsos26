import { Rangkaian, rangkaianService } from "@/api/services/admin/rangkaian";
import { useState, useEffect, useCallback } from "react";

interface UseRangkaianHook {
  data: Rangkaian[] | undefined;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
}

export const useGetAllRangkaian = (): UseRangkaianHook => {
  const [data, setData] = useState<Rangkaian[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAllRangkaian = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await rangkaianService.getAllRangkaian();
      setData(response.data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err : new Error("Terjadi kesalahan"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllRangkaian();
  }, [fetchAllRangkaian]);

  return {
    data,
    isLoading,
    error,
    refresh: fetchAllRangkaian,
  };
};
