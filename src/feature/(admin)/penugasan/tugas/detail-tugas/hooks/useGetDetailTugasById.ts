import { tugasService, TugasSummary } from "@/api/services/admin/tugas";
import { useCallback, useEffect, useState } from "react";

export const useGetDetailTugasById = (id: string) => {
  const [data, setData] = useState<TugasSummary | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await tugasService.getDetailTugasById(id);
      setData(response.data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return { data, isLoading, error, refresh: fetchStatus };
};
