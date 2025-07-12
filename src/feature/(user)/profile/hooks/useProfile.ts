import { useState, useEffect, useCallback } from "react";
import { useAuthContext } from "@/shared/hooks/useAuthContext";
import { EditProfileRequest, authService } from "@/api/services/auth";
import { useToast } from "@/shared/hooks/useToast";

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

  const handleSubmit = async () => {
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
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
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
