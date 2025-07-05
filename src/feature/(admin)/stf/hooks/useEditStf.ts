"use client";

import { useState, useEffect, FormEvent } from "react";
import { stfService } from "@/api/services/admin/stf";
import { useRouter } from "next/navigation";

export const useEditStf = (id: string) => {
  const router = useRouter();
  const [nama, setNama] = useState("");
  const [prodi, setProdi] = useState("");
  const [visi, setVisi] = useState("");
  const [misi, setMisi] = useState("");
  const [foto, setFoto] = useState<File | null>(null);
  const [initialDataLoading, setInitialDataLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await stfService.getCaketangById(id);
        if (response && response.data) {
          const { nama, prodi, visi, misi } = response.data;
          setNama(nama);
          setProdi(prodi);
          setVisi(visi);
          setMisi(misi);
        } else {
          throw new Error("Data caketang tidak ditemukan.");
        }
      } catch (error) {
        console.error(error);
        alert("Gagal memuat data caketang.");
      } finally {
        setInitialDataLoading(false);
      }
    };

    fetchInitialData();
  }, [id]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("nama", nama);
    formData.append("prodi", prodi);
    formData.append("visi", visi);
    formData.append("misi", misi);
    if (foto) {
      formData.append("foto", foto);
    }

    try {
      const response = await stfService.updateCaketang(id, formData);
      if (response.status_code === 200) {
        alert("Data berhasil diperbarui!");
        router.push("/admin/stf");
      } else {
        throw new Error(response.message || "Gagal memperbarui data.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan saat memperbarui data.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    nama, setNama,
    prodi, setProdi,
    visi, setVisi,
    misi, setMisi,
    setFoto,
    initialDataLoading,
    isSubmitting,
    handleSubmit,
  };
};