"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import PresensiCard from "../components/PresensiCard";
import { Modal } from "@/shared/components/ui/Modal";
import { useGetAllPresensi } from "../hooks/useGetAllPresensi";
import PresensiForm from "../components/PresensiForm";
const PresensiContainer = () => {
  const router = useRouter();
  const { data: allPresensi, isLoading, error, refresh } = useGetAllPresensi();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleCreateSuccess = () => {
    setIsModalOpen(false);
    refresh();
  };

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  if (isLoading) {
    return <div>loading</div>;
  }
  if (!allPresensi) {
    return <div>Tugas Masih Kosong Jir</div>;
  }
  if (error) {
    return (
      <div>
        Error: {error} <button onClick={refresh}>Coba Lagi</button>
      </div>
    );
  }

  return (
    <main className="bg-white p-20 min-h-screen h-fit rounded-xl shadow-lg">
      <button
        type="button"
        className="flex items-center gap-2 text-primary-500 hover:text-primary-700 transition-colors mb-6"
        onClick={() => router.back()}
      >
        <ChevronLeft /> Kembali
      </button>
      <div className="flex items-center justify-between">
        <h4 className="text-4xl font-semibold text-black">Kode Presensi</h4>
        <Button onClick={handleModal}>Tambah Presensi</Button>
      </div>
      <div className="mt-10 flex flex-col gap-y-5">
        {allPresensi.map((presensi) => (
          <PresensiCard key={presensi.kode_id} presensi={presensi} />
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModal}
        title="Tambah Kode Presensi"
        desc="Isi form di bawah ini untuk menambahkan kode presensi baru"
      >
        <PresensiForm onSuccess={handleCreateSuccess} />
      </Modal>
    </main>
  );
};

export default PresensiContainer;
