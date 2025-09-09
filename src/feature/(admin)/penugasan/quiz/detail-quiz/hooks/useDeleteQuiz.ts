import { useState, useCallback } from "react";
import { kuisService } from "@/api/services/admin/quiz";

interface UseDeleteQuizProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const useDeleteQuiz = ({
  onSuccess,
  onError,
}: UseDeleteQuizProps = {}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteQuiz = useCallback(
    async (kuisId: string) => {
      setIsLoading(true);
      setError(null);
      try {
        await kuisService.deleteKuis(kuisId);
        if (onSuccess) {
          onSuccess();
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan saat menghapus kuis";
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

  return { deleteQuiz, isLoading, error };
};
