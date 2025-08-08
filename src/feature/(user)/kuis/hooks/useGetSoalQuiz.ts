import { kuisService, QuizSoal } from "@/api/services/user/quiz";
import { useCallback, useEffect, useState } from "react";

export const useGetSoalKuis = (id_quiz: string) => {
  const [data, setData] = useState<QuizSoal | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSoal = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await kuisService.getSoalKuisById(id_quiz);
      setData(response.data);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat mengambil soal kuis";
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [id_quiz]);

  useEffect(() => {
    if (id_quiz) {
      fetchSoal();
    }
  }, [fetchSoal, id_quiz]);

  return { data, isLoading, error, refresh: fetchSoal };
};
