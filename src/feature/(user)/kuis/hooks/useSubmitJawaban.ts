import { useState } from "react";
import {
  kuisService,
  SubmitKuisPayload,
  QuizResult,
} from "@/api/services/user/quiz";

export const useSubmitKuis = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<QuizResult | null>(null);

  const submitJawaban = async (
    id_kuis: string,
    payload: SubmitKuisPayload,
  ): Promise<QuizResult | null> => {
    setIsLoading(true);
    setError(null);
    setData(null);

    try {
      const response = await kuisService.submitJawabanKuis(id_kuis, payload);
      const resultData = response.data as QuizResult;
      setData(resultData);
      return resultData;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Gagal mengirim jawaban.";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { submitJawaban, isLoading, error, data };
};
