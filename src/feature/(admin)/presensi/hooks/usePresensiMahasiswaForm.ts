import { useState, useMemo, useEffect, useCallback } from "react";
import {
  presensiService,
  PresensiMahasiswaSummary,
} from "@/api/services/admin/presensi";

interface UseTugasFormProps {
  presensi_id?: string;
  initialData?: PresensiMahasiswaSummary;
  onSuccess: () => void;
}

export const usePresensiMahasiswaForm = ({
  presensi_id,
  initialData,
  onSuccess,
}: UseTugasFormProps) => {
  const [nim, setNim] = useState<string>(initialData?.nim || "");
  const [status, setStatus] = useState<string>(
    initialData?.status || "tidak-hadir",
  );

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (initialData) {
      setNim(initialData.nim);
      setStatus(initialData.status);
    } else {
      setNim("");
      setStatus("tidak-hadir");
      setStatus("");
    }
  }, [initialData]);

  const isFormValid = useMemo(() => {
    return nim.trim() != "" && status.trim() !== "";
  }, [nim, status]);

  const handleSubmit = useCallback(async () => {
    if (!isFormValid) {
      throw new Error("Harap lengkapi semua kolom yang wajib diisi.");
    }

    setIsSubmitting(true);

    try {
      if (!presensi_id) {
        throw new Error("ID presensi tidak ditemukan");
      }
      const payload: PresensiMahasiswaSummary = {
        nama: null,
        nim,
        status: status as "hadir" | "tidak-hadir",
      };

      await presensiService.updateMahasiswaPresensi(presensi_id, payload);

      onSuccess();
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Gagal menyimpan Presensi. Silakan coba lagi.";
      throw new Error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }, [nim, status, presensi_id, isFormValid, onSuccess]);

  return {
    nim,
    setNim,
    status,
    setStatus,
    isSubmitting,
    isFormValid,
    handleSubmit,
  };
};
