"use client";

import { penugasanService } from "@/api/services/user/penugasan";
import { useToast } from "@/shared/hooks/useToast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useDetailTugas = (id_penugasan: string) => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const {
    data: tugas,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tugas", id_penugasan],
    queryFn: async () => {
      const response =
        await penugasanService.getTugasDetailWithStatus(id_penugasan);
      return response.data;
    },
  });

  const { mutate: submitTugas, isPending: isSubmitting } = useMutation({
    mutationFn: (drive_link: string) => {
      return penugasanService.submitTugas(id_penugasan, { drive_link });
    },
    onSuccess: () => {
      showToast({
        type: "success",
        title: "Berhasil!",
        message: "Tugas telah berhasil dikumpulkan.",
      });
      queryClient.invalidateQueries({ queryKey: ["tugas", id_penugasan] });
    },
    onError: (err) => {
      console.error("Gagal submit tugas:", err);
      showToast({
        type: "error",
        title: "Gagal Mengumpulkan",
        message: "Pastikan link valid dan coba lagi nanti.",
      });
    },
  });

  const handleSubmitTugas = (drive_link: string) => {
    submitTugas(drive_link);
  };

  return {
    tugas: tugas || null,
    isLoading,
    error: error ? "Gagal memuat data tugas. Coba lagi nanti." : null,
    isSubmitting,
    handleSubmitTugas,
  };
};
