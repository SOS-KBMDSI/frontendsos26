import { useState, useCallback } from "react";
import { kuisService, type CreateQuizPayload } from "@/api/services/admin/quiz";

interface UseCreateQuizProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const useCreateQuiz = ({
  onSuccess,
  onError,
}: UseCreateQuizProps = {}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createQuiz = useCallback(
    async (payload: CreateQuizPayload) => {
      setIsLoading(true);
      setError(null);
      try {
        await kuisService.createKuis(payload);
        if (onSuccess) {
          onSuccess();
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan saat membuat kuis";
        setError(errorMessage);
        if (onError) {
          onError(errorMessage);
        }
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess, onError],
  );

  return { createQuiz, isLoading, error };
};
