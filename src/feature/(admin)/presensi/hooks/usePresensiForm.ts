import { useState, useMemo, useEffect, useCallback } from "react";
import {
  presensiService,
  PresensiSummary,
} from "@/api/services/admin/presensi";

interface UseTugasFormProps {
  initialData?: PresensiSummary;
  onSuccess: () => void;
}

export const usePresensiForm = ({
  initialData,
  onSuccess,
}: UseTugasFormProps) => {
  const isEditMode = !!initialData;

  const [kode, setKode] = useState<string>(initialData?.kode || "");
  const [rangkaianId, setRangkaianId] = useState<string>(
    initialData?.rangkaian_id || "",
  );
  const [sesi, setSesi] = useState<string>(initialData?.sesi || "");
  const [status, setStatus] = useState<string>(
    initialData?.status || "non-aktif",
  );

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (initialData) {
      setKode(initialData.kode);
      setRangkaianId(initialData.rangkaian_id);
      setSesi(initialData.sesi);
      setStatus(initialData.status);
    } else {
      setKode("");
      setRangkaianId("");
      setSesi("");
      setStatus("non-aktif");
    }
  }, [initialData]);

  const isFormValid = useMemo(() => {
    return (
      kode.trim() !== "" &&
      rangkaianId.trim() !== "" &&
      sesi.trim() !== "" &&
      status.trim() !== "" &&
      (isEditMode || rangkaianId.trim() !== "")
    );
  }, [kode, rangkaianId, sesi, status, isEditMode]);

  const handleSubmit = useCallback(async () => {
    if (!isFormValid) {
      throw new Error("Harap lengkapi semua kolom yang wajib diisi.");
    }

    setIsSubmitting(true);

    try {
      const payload: PresensiSummary = {
        kode,
        rangkaian_id: rangkaianId,
        sesi,
        status: status as "aktif" | "non-aktif",
        presensi_id: null,
      };
      if (isEditMode) {
        if (!initialData.presensi_id) {
          throw new Error("ID presensi tidak ditemukan untuk mode edit");
        }

        const updateData: PresensiSummary = {
          kode,
          rangkaian_id: rangkaianId,
          sesi: sesi as string,
          status: status as "aktif" | "non-aktif",
          presensi_id: null,
        };

        await presensiService.updatePresensi(
          initialData.presensi_id,
          updateData,
        );
      } else {
        await presensiService.createPresensi(payload);
      }
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
  }, [
    kode,
    rangkaianId,
    sesi,
    status,
    isEditMode,
    initialData?.presensi_id,
    isFormValid,
    onSuccess,
  ]);

  return {
    kode,
    setKode,
    rangkaianId,
    setRangkaianId,
    sesi,
    setSesi,
    status,
    setStatus,
    isSubmitting,
    isFormValid,
    isEditMode,
    handleSubmit,
  };
};
