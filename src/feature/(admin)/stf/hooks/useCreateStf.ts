"use client";

import { useState, FormEvent } from "react";
import { stfService } from "@/api/services/admin/stf";

export const useCreateStf = () => {
  const [nama, setNama] = useState("");
  const [prodi, setProdi] = useState("");
  const [visi, setVisi] = useState("");
  const [misi, setMisi] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    if (!nama || !prodi || !visi || !misi || !foto) {
      alert("Semua field wajib diisi!");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("prodi", prodi);
    formData.append("visi", visi);
    formData.append("misi", misi);
    formData.append("foto", foto);

    try {
      const response = await stfService.createCaketang(formData);
      if (response.status_code === 201) {
        alert("Caketang berhasil dibuat!");
        window.location.reload();
      } else {
        throw new Error(response.message || "Gagal membuat caketang.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    nama,
    setNama,
    prodi,
    setProdi,
    visi,
    setVisi,
    misi,
    setMisi,
    foto,
    setFoto,
    isLoading,
    handleSubmit,
  };
};
