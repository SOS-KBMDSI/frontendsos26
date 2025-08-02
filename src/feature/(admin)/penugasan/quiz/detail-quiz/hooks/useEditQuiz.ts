import { useState, useCallback } from "react";
import { kuisService, UpdateQuizPayload } from "@/api/services/admin/quiz";
import { AxiosError } from "axios";

interface UseUpdateKuisProps {
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const useUpdateKuis = ({
  onSuccess,
  onError,
}: UseUpdateKuisProps = {}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const updateQuiz = useCallback(
    async (kuisId: string, data: UpdateQuizPayload) => {
      setIsLoading(true);
      setIsSuccess(false);

      try {
        await kuisService.updateKuis(kuisId, data);
        setIsSuccess(true);
        if (onSuccess) {
          onSuccess();
        }
      } catch (err: unknown) {
        if (onError && err instanceof AxiosError) {
          const errorMessage = err.response?.data?.message || err.message;
          onError(errorMessage);
        } else if (onError) {
          onError("Terjadi kesalahan saat memperbarui kuis");
        }
      } finally {
        setIsLoading(false);
      }
    },
    [onSuccess, onError],
  );

  return { updateQuiz, isLoading, isSuccess };
};
