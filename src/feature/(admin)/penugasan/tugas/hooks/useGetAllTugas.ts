import { tugasService, TugasSummary } from "@/api/services/admin/tugas";
import { useState, useEffect, useCallback } from "react";

export const useGetAllTugas = () => {
  const [data, setData] = useState<TugasSummary[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await tugasService.getAllTugas();
      setData(response.data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengambil data";
      setError(errorMessage);
      console.error(err);
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
