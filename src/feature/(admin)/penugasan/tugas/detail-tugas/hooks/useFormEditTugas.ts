import { useState, useEffect } from "react";
import { tugasService, TugasStatus } from "@/api/services/admin/tugas";

interface UseFormEditTugasProps {
  submissionData: TugasStatus;
  onSuccess: () => void;
}

export const useFormEditTugas = ({
  submissionData,
  onSuccess,
}: UseFormEditTugasProps) => {
  const [nilai, setNilai] = useState(submissionData.nilai);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setNilai(submissionData.nilai);
  }, [submissionData]);

  const performSubmit = async () => {
    setIsSubmitting(true);
    try {
      await tugasService.updateSubmissionScore(submissionData.id, {
        score: Number(nilai),
      });
      onSuccess();
    } catch (error) {
      console.error("Gagal memperbarui nilai:", error);
      throw new Error("Gagal memperbarui nilai. Silakan coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    nilai,
    setNilai,
    isSubmitting,
    performSubmit,
  };
};
