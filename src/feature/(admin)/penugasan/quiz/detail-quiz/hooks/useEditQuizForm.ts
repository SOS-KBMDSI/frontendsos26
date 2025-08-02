import { useState, useEffect } from "react";
import {
  DetailQuiz,
  UpdateQuizPayload,
  pertanyaan as Pertanyaan,
} from "@/api/services/admin/quiz";

interface ValidationErrors {
  [key: string]: string;
}

const formatDurasiToHHMM = (totalMenit: number): string => {
  if (isNaN(totalMenit) || totalMenit < 0) return "00:00";
  const jam = Math.floor(totalMenit / 60);
  const menit = totalMenit % 60;
  return `${String(jam).padStart(2, "0")}:${String(menit).padStart(2, "0")}`;
};

const parseHHMMToMenit = (hhmm: string): number => {
  if (typeof hhmm !== "string" || !hhmm.includes(":")) {
    const parsed = parseInt(hhmm, 10);
    return isNaN(parsed) ? 0 : parsed;
  }
  const [jam, menit] = hhmm.split(":").map(Number);
  return jam * 60 + menit;
};

const createDefaultState = (): UpdateQuizPayload => ({
  kuis_nama: "",
  kuis_deskripsi: "",
  tenggat: "",
  kesempatan: 1,
  id_rangkaian: "",
  durasi_kuis: "60",
  pertanyaan_list: [],
});

export const useEditQuizForm = (initialData: DetailQuiz | null) => {
  const [formData, setFormData] =
    useState<UpdateQuizPayload>(createDefaultState);
  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    if (initialData) {
      setFormData({
        kuis_nama: initialData.nama_kuis || "",
        kuis_deskripsi: initialData.deskripsi_kuis || "",
        tenggat: initialData.tenggat_kuis
          ? new Date(initialData.tenggat_kuis).toISOString().slice(0, 16)
          : "",
        kesempatan: initialData.kesempatan || 1,
        id_rangkaian: initialData.data_rangkaian?.ID || "",
        durasi_kuis: String(parseHHMMToMenit(initialData.durasi_kuis || "60")),
        pertanyaan_list: initialData.list_pertanyaan || [],
      });
    }
  }, [initialData]);

  const clearError = (fieldName: string) => {
    setErrors((prev) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { [fieldName]: _, ...rest } = prev;
      return prev[fieldName] ? rest : prev;
    });
  };

  const validateForm = (): { isValid: boolean; errors: ValidationErrors } => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    if (!formData.kuis_nama?.trim()) {
      newErrors.kuis_nama = "Nama kuis tidak boleh kosong";
      isValid = false;
    }

    if (!formData.kuis_deskripsi?.trim()) {
      newErrors.kuis_deskripsi = "Deskripsi tidak boleh kosong";
      isValid = false;
    }

    if (!formData.tenggat) {
      newErrors.tenggat = "Tenggat tidak boleh kosong";
      isValid = false;
    }

    if (!formData.durasi_kuis || Number(formData.durasi_kuis) <= 0) {
      newErrors.durasi_kuis = "Durasi kuis harus lebih dari 0";
      isValid = false;
    }

    if (!formData.kesempatan || formData.kesempatan <= 0) {
      newErrors.kesempatan = "Kesempatan harus lebih dari 0";
      isValid = false;
    }

    if (!formData.id_rangkaian) {
      newErrors.id_rangkaian = "Rangkaian harus dipilih";
      isValid = false;
    }

    // Safe check for pertanyaan_list
    const pertanyaanList = formData.pertanyaan_list || [];
    if (pertanyaanList.length === 0) {
      newErrors.pertanyaan_list = "Minimal harus ada 1 soal";
      isValid = false;
    }

    pertanyaanList.forEach((question, index) => {
      const questionPrefix = `question_${index}`;

      if (!question.judul_pertanyaan?.trim()) {
        newErrors[`${questionPrefix}_title`] =
          "Judul pertanyaan tidak boleh kosong";
        isValid = false;
      }

      if (!question.pilihan_a?.trim()) {
        newErrors[`${questionPrefix}_a`] = "Pilihan A tidak boleh kosong";
        isValid = false;
      }

      if (!question.pilihan_b?.trim()) {
        newErrors[`${questionPrefix}_b`] = "Pilihan B tidak boleh kosong";
        isValid = false;
      }

      if (!question.pilihan_c?.trim()) {
        newErrors[`${questionPrefix}_c`] = "Pilihan C tidak boleh kosong";
        isValid = false;
      }

      if (!question.pilihan_d?.trim()) {
        newErrors[`${questionPrefix}_d`] = "Pilihan D tidak boleh kosong";
        isValid = false;
      }

      if (!question.pilihan_e?.trim()) {
        newErrors[`${questionPrefix}_e`] = "Pilihan E tidak boleh kosong";
        isValid = false;
      }
    });

    setErrors(newErrors);
    return { isValid, errors: newErrors };
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    const finalValue =
      type === "number" ? (value === "" ? 0 : Number(value)) : value;

    setFormData((prev) => ({ ...prev, [name]: finalValue }));

    if (name === "kuis_nama" && value.trim()) clearError("kuis_nama");
    if (name === "kuis_deskripsi" && value.trim()) clearError("kuis_deskripsi");
    if (name === "tenggat" && value) clearError("tenggat");
    if (name === "durasi_kuis" && Number(value) > 0) clearError("durasi_kuis");
    if (name === "kesempatan" && Number(value) > 0) clearError("kesempatan");
  };

  const handleSelectChange = (name: keyof UpdateQuizPayload, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "id_rangkaian" && value) clearError("id_rangkaian");
  };

  const handleQuestionChange = (
    index: number,
    field: keyof Pertanyaan,
    value: string | number,
  ) => {
    setFormData((prev) => {
      const updatedQuestions = [...(prev.pertanyaan_list || [])];
      const finalValue =
        field === "durasi_pertanyaan"
          ? value === ""
            ? 0
            : Number(value)
          : value;

      // Ensure the question exists before updating
      if (updatedQuestions[index]) {
        updatedQuestions[index] = {
          ...updatedQuestions[index],
          [field]: finalValue,
        };
      }

      return { ...prev, pertanyaan_list: updatedQuestions };
    });

    const questionPrefix = `question_${index}`;
    if (field === "judul_pertanyaan" && String(value).trim()) {
      clearError(`${questionPrefix}_title`);
    }
    if (field === "pilihan_a" && String(value).trim()) {
      clearError(`${questionPrefix}_a`);
    }
    if (field === "pilihan_b" && String(value).trim()) {
      clearError(`${questionPrefix}_b`);
    }
    if (field === "pilihan_c" && String(value).trim()) {
      clearError(`${questionPrefix}_c`);
    }
    if (field === "pilihan_d" && String(value).trim()) {
      clearError(`${questionPrefix}_d`);
    }
    if (field === "pilihan_e" && String(value).trim()) {
      clearError(`${questionPrefix}_e`);
    }
  };

  const addQuestion = () => {
    setFormData((prev) => {
      const currentList = prev.pertanyaan_list || [];
      const newQuestion = {
        id_pertanyaan: `new_${Date.now()}`,
        judul_pertanyaan: "",
        pilihan_a: "",
        pilihan_b: "",
        pilihan_c: "",
        pilihan_d: "",
        pilihan_e: "",
        jawaban_benar: "A",
        durasi_pertanyaan: 30,
      };

      return {
        ...prev,
        pertanyaan_list: [...currentList, newQuestion],
      };
    });

    // Clear pertanyaan_list error when adding a question
    clearError("pertanyaan_list");
  };

  const removeQuestion = (index: number) => {
    setFormData((prev) => {
      const currentList = prev.pertanyaan_list || [];
      return {
        ...prev,
        pertanyaan_list: currentList.filter((_, i) => i !== index),
      };
    });
  };

  const getSubmitPayload = () => {
    const pertanyaanList = formData.pertanyaan_list || [];

    const payloadSesuaiDokumentasi = {
      kuis_nama: formData.kuis_nama || "",
      kuis_deskripsi: formData.kuis_deskripsi || "",
      tenggat: `${formData.tenggat}:00Z`,
      kesempatan: formData.kesempatan || 1,
      id_rangkaian: formData.id_rangkaian || "",
      durasi_kuis: formatDurasiToHHMM(Number(formData.durasi_kuis) || 60),
      pertanyaan_list: pertanyaanList.map((q) => ({
        id_pertanyaan: q.id_pertanyaan?.startsWith("new_")
          ? undefined
          : q.id_pertanyaan,
        title: q.judul_pertanyaan || "",
        opsi_a: q.pilihan_a || "",
        opsi_b: q.pilihan_b || "",
        opsi_c: q.pilihan_c || "",
        opsi_d: q.pilihan_d || "",
        opsi_e: q.pilihan_e || "",
        jawaban_benar: q.jawaban_benar || "A",
        durasi: q.durasi_pertanyaan || 30,
      })),
    };
    return payloadSesuaiDokumentasi as unknown as UpdateQuizPayload;
  };

  return {
    formData,
    errors,
    validateForm,
    handleInputChange,
    handleSelectChange,
    handleQuestionChange,
    addQuestion,
    removeQuestion,
    getSubmitPayload,
  };
};
