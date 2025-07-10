import { tugasService } from "@/api/services/admin/tugas";
import { useState } from "react";

export const useCreateTugas = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const createTugas = async ({
    id_rangkaian,
    data,
  }: {
    id_rangkaian: string;
    data: FormData;
  }) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    try {
      await tugasService.createTugas(id_rangkaian, data);
      setIsSuccess(true);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Gagal membuat tugas";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { createTugas, isLoading, error, isSuccess };
};
