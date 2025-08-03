import { kuisService, Quiz } from "@/api/services/user/quiz";
import { useCallback, useEffect, useState } from "react";

export const useGetDetailQuiz = (id_quiz: string) => {
  const [data, setData] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await kuisService.getDetailKuisById(id_quiz);
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
  }, [id_quiz]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return { data, isLoading, error, refresh: fetchDetail };
};
