import { kuisService, QuizSubmission } from "@/api/services/admin/quiz";
import { useCallback, useEffect, useState } from "react";

export const useGetQuizSubmissions = (
  kuisId: string,
  id_kelompok?: string | null,
  id_distrik?: string | null,
) => {
  const [data, setData] = useState<QuizSubmission[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissions = useCallback(async () => {
    if (!kuisId) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const response = await kuisService.getQuizSubmissions(
        kuisId,
        id_kelompok,
        id_distrik,
      );

      // PERBAIKAN PENTING: Pastikan data tidak pernah null, default ke array kosong
      setData(response.data ?? []);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengambil data submission";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [kuisId, id_kelompok, id_distrik]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  return { data, isLoading, error, refresh: fetchSubmissions };
};
