import { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "@/shared/hooks/useAuthContext";
import { EditProfileRequest, authService } from "@/api/services/auth";
import { useToast } from "@/shared/hooks/useToast";
import { AxiosError } from "axios";

export const useProfile = () => {
  const { showToast } = useToast();

  const { user, refetch } = useAuthContext();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<EditProfileRequest>({
    Phone: "",
    Line: "",
    Agama: "",
    GolonganDarah: "",
    RiwayatPenyakit: "",
    AlergiObat: "",
    AlergiMakanan: "",
    Kelamin: "",
  });

  const resetFormData = useCallback(() => {
    if (user) {
      setFormData({
        Phone: user.telp || "",
        Line: user.line || "",
        Agama: user.agama || "",
        GolonganDarah: user.golongan_darah || "",
        RiwayatPenyakit: user.riwayat_penyakit || "",
        AlergiObat: user.alergi_obat || "",
        AlergiMakanan: user.alergi_makanan || "",
        Kelamin: user.kelamin || "",
      });
    }
  }, [user]);

  useEffect(() => {
    resetFormData();
  }, [user, resetFormData]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleFormChange = (name: keyof EditProfileRequest, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors: string[] = [];

    if (formData.Phone) {
      const phoneLength = formData.Phone.length;
      if (phoneLength < 12 || phoneLength > 15) {
        errors.push("Nomor telepon harus memiliki panjang 12-15 digit");
      }

      if (!/^\d+$/.test(formData.Phone)) {
        errors.push("Nomor telepon hanya boleh berisi angka");
      }
    }

    return errors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      showToast({
        type: "error",
        title: "Validasi Gagal",
        message: validationErrors.join(". "),
      });
      return;
    }

    setLoading(true);
    try {
      await authService.editProfile(formData);
      await refetch();
      setIsEditing(false);
      showToast({
        type: "success",
        title: "Berhasil!",
        message: "Profil Anda berhasil diperbarui.",
      });
    } catch (error) {
      let errorMessage = "Terjadi kesalahan yang tidak diketahui";

      if (error instanceof AxiosError) {
        if (error.response?.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response?.data?.error) {
          errorMessage = error.response.data.error;
        } else if (error.message) {
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      showToast({
        type: "error",
        title: "Gagal Memperbarui Profil",
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    resetFormData();
  };

  return {
    user,
    isEditing,
    loading,
    formData,
    handleEditToggle,
    handleFormChange,
    handleSubmit,
    handleCancel,
  };
};
