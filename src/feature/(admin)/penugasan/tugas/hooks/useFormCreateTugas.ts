import { useState, useMemo } from "react";
import { tugasService } from "@/api/services/admin/tugas";

interface FeedbackState {
  type: "error" | "success";
  message: string;
}

interface UseFormCreateTugasProps {
  onSuccess: () => void;
}

export const useFormCreateTugas = ({ onSuccess }: UseFormCreateTugasProps) => {
  const [judul, setJudul] = useState<string>("");
  const [deskripsi, setDeskripsi] = useState<string>("");
  const [tenggat, setTenggat] = useState<string>("");
  const [fileLink, setFileLink] = useState<string>("");
  const [idRangkaian, setIdRangkaian] = useState<string>("");

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);

  const isFormValid = useMemo(() => {
    return (
      judul.trim() !== "" &&
      deskripsi.trim() !== "" &&
      tenggat.trim() !== "" &&
      idRangkaian.trim() !== "" &&
      fileLink.trim() !== ""
    );
  }, [judul, deskripsi, tenggat, idRangkaian, fileLink]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!isFormValid) {
      setFeedback({
        type: "error",
        message: "Harap lengkapi semua kolom yang ditandai dengan *.",
      });
      return;
    }

    setIsSubmitting(true);

    const date = new Date(tenggat);
    const pad = (num: number) => num.toString().padStart(2, "0");
    const formattedTenggat =
      `${pad(date.getDate())}-${pad(
        date.getMonth() + 1,
      )}-${date.getFullYear()} ` +
      `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
        date.getSeconds(),
      )}`;

    const formData = new FormData();
    formData.append("judul", judul);
    formData.append("deskripsi", deskripsi);
    formData.append("tenggat", formattedTenggat);
    formData.append("file", fileLink);
    formData.append("is_visible", "true");

    try {
      await tugasService.createTugas(idRangkaian, formData);
      setFeedback({
        type: "success",
        message: "Tugas berhasil dibuat! Modal akan segera ditutup.",
      });
      setTimeout(() => onSuccess(), 1500);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Gagal membuat Tugas. Silakan coba lagi.";
      setFeedback({ type: "error", message: errorMessage });
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setJudul("");
    setDeskripsi("");
    setTenggat("");
    setFileLink("");
    setIdRangkaian("");
    setFeedback(null);
    setIsSubmitting(false);
  };

  return {
    judul,
    setJudul,
    deskripsi,
    setDeskripsi,
    tenggat,
    setTenggat,
    fileLink,
    setFileLink,
    idRangkaian,
    setIdRangkaian,
    isSubmitting,
    feedback,
    setFeedback,
    isFormValid,
    handleSubmit,
    resetForm,
  };
};
