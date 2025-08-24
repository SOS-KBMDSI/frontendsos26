// src/feature/(user)/presensi/hooks/useGetPresensiRekap.ts

import { useState, useEffect, useCallback } from "react";
import {
  presensiService,
  PresensiRekapData,
} from "@/api/services/user/presensi";

interface UseGetPresensiRekapHook {
  data: PresensiRekapData | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const useGetPresensiRekap = (): UseGetPresensiRekapHook => {
  const [data, setData] = useState<PresensiRekapData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await presensiService.getRekapPresensi();
      if (response.status_code === 200) {
        setData(response.data);
      } else {
        setError(response.message || "Failed to fetch presensi data.");
        setData(null);
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat memuat rekap presensi.";
      setError(errorMessage);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refresh: fetchData,
  };
};
