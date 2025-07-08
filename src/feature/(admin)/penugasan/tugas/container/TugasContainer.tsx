import React, { useState } from "react";
import { useGetAllTugas } from "../hooks/useGetAllTugas";
import { TugasCard } from "../components/TugasCard";
import { Button } from "@/shared/components/ui/Button";
import { Modal } from "@/shared/components/ui/Modal";
import { FormCreateTugas } from "../components/FormCreateTugas";

const TugasContainer = () => {
  const { data: tugas, isLoading, error, refresh } = useGetAllTugas();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCreateSuccess = () => {
    setIsModalOpen(false);
    refresh();
  };
  if (isLoading) {
    return <div>loading</div>;
  }
  if (!tugas) {
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
    <section>
      <div className="flex justify-end">
        <Button variant={"outline"} onClick={() => setIsModalOpen(true)}>
          Tambah Penugasan
        </Button>
      </div>
      <div className="mt-8 flex gap-9 flex-col">
        {tugas.map((tugas, idx) => (
          <TugasCard key={idx} tugas={tugas} idx={idx} />
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Buat Penugasan Baru"
        desc="Isi semua kolom untuk menambahkan data penugasan."
      >
        <FormCreateTugas onSuccess={handleCreateSuccess} />
      </Modal>
    </section>
  );
};

export default TugasContainer;
