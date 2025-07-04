"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import PresensiCard from "../components/PresensiCard";
import { Modal } from "@/shared/components/ui/Modal";
import { Input } from "@/shared/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/Select";
// import { usePresensi } from "../hooks/usePresensi";

const PresensiContainer = () => {
  // const { data } = usePresensi();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedSession, setSelectedSession] = React.useState<string>("");
  const [selectedNetwork, setSelectedNetwork] = React.useState<string>("");

  const sessions = [
    { value: "1", label: "Sesi 1" },
    { value: "2", label: "Sesi 2" },
    { value: "3", label: "Sesi 3" },
    { value: "4", label: "Sesi 4" },
  ];

  const networks = [
    { value: "1", label: "Rangkaian 1" },
    { value: "2", label: "Rangkaian 2" },
    { value: "3", label: "Rangkaian 3" },
    { value: "4", label: "Rangkaian 4" },
  ];

  const handleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const router = useRouter();
  return (
    <main className="bg-white p-20 h-screen rounded-xl shadow-lg">
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
        <PresensiCard href="1" />
        <PresensiCard href="1" />
        <PresensiCard href="1" />
        <PresensiCard href="1" />
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModal}
        title="Tambah Kode Presensi"
        desc="Isi form di bawah ini untuk menambahkan kode presensi baru"
      >
        <div className="w-full flex flex-col gap-y-10">
          <Input
            type="text"
            label="Tambah Kode Absensi"
            placeholder="contoh. SELAMATDATANGMABA"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-y-2">
              <label className="text-lg text-primary-500 font-semibold">
                Sesi
              </label>
              <Select
                onValueChange={(value) => setSelectedSession(value)}
                value={selectedSession}
              >
                <SelectTrigger className="col-span-1">
                  <SelectValue placeholder="Sesi" />
                </SelectTrigger>

                <SelectContent>
                  {sessions.map((session) => (
                    <SelectItem key={session.value} value={session.value}>
                      {session.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-y-2">
              <label className="text-lg text-primary-500 font-semibold">
                Rangkaian
              </label>
              <Select
                onValueChange={(value) => setSelectedNetwork(value)}
                value={selectedNetwork}
              >
                <SelectTrigger className="col-span-1">
                  <SelectValue placeholder="Rangkaian" />
                </SelectTrigger>

                <SelectContent>
                  {networks.map((network) => (
                    <SelectItem key={network.value} value={network.value}>
                      {network.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-x-2 items-center text-default-dark-50">
              <input id="active" type="checkbox" />
              <label htmlFor="active">Aktifkan Kode Ini</label>
            </div>
          </div>
          <Button>Simpan</Button>
        </div>
      </Modal>
    </main>
  );
};

export default PresensiContainer;
