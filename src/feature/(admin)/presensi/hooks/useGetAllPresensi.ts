import { Presensi, presensiService } from "@/api/services/admin/presensi";

import { useState, useEffect, useCallback } from "react";

export interface PresensiDetailFilters {
  nama?: string;
  page?: number;
  pageSize?: number;
}

export const useGetAllPresensi = () => {
  const [data, setData] = useState<Presensi[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllPresensi = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await presensiService.getAllPresensi();
      setData(response.data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllPresensi();
  }, [fetchAllPresensi]);

  return {
    data,
    isLoading,
    error,
    refresh: fetchAllPresensi,
  };
};
