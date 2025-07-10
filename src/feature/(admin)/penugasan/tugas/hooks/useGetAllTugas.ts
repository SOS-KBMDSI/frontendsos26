import { useState, useEffect, useCallback } from "react";
import { tugasService, TugasSummary } from "@/api/services/admin/tugas";

export const useGetAllTugas = () => {
  const [data, setData] = useState<TugasSummary[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await tugasService.getAllTugas();
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
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { data, isLoading, error, refresh: fetchAll };
};

export const useUpdateTugas = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const updateTugas = async ({ id, data }: { id: string; data: FormData }) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    try {
      await tugasService.updateTugas(id, data);
      setIsSuccess(true);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Gagal memperbarui tugas";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateTugas, isLoading, error, isSuccess };
};

export const useDeleteTugas = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const deleteTugas = async (id: string) => {
    setIsLoading(true);
    setError(null);
    setIsSuccess(false);
    try {
      await tugasService.deleteTugas(id);
      setIsSuccess(true);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Gagal menghapus tugas";
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteTugas, isLoading, error, isSuccess };
};
