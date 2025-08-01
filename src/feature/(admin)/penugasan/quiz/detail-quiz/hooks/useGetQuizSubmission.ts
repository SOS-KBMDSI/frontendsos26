import { kuisService, QuizSubmission } from "@/api/services/admin/quiz";
import { useCallback, useEffect, useState } from "react";

export const useGetQuizSubmissions = (kuisId: string) => {
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
      const response = await kuisService.getQuizSubmissions(kuisId);
      setData(response.data.records);
    } catch {
    } finally {
      setIsLoading(false);
    }
  }, [kuisId]);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  return { data, isLoading, error, refresh: fetchSubmissions };
};
