import { tugasService, TugasStatus } from "@/api/services/admin/tugas";
import { useCallback, useEffect, useState } from "react";

export const useGetTugasSubmissions = (
  id: string,
  id_kelompok?: string | null,
  id_distrik?: string | null,
) => {
  const [data, setData] = useState<TugasStatus[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissions = useCallback(async () => {
    if (!id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const response = await tugasService.getTugasSubmission(
        id,
        id_kelompok,
        id_distrik,
      );
      setData(response.data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengambil data submission";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [id, id_kelompok, id_distrik]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  return { data, isLoading, error, refresh: fetchSubmissions };
};
