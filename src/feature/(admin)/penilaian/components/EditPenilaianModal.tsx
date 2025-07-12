"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "@/shared/components/ui/Modal";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/Select";
import { Loader2, Info, X, Plus } from "lucide-react";
import { PelanggaranItem } from "../types";
import { usePenilaianModal } from "../hooks/usePenilaianModal";
import { cn } from "@/shared/utils/cn";

type PelanggaranInput = PelanggaranItem & { id: number };

interface EditPenilaianModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  nim: string | null;
  rangkaianId: string;
  rangkaianName: string;
}

export const EditPenilaianModal = ({
  isOpen,
  onClose,
  onSuccess,
  nim,
  rangkaianId,
  rangkaianName,
}: EditPenilaianModalProps) => {
  const { detailMaba, isLoading, handleSubmit } = usePenilaianModal(
    nim,
    rangkaianId,
    isOpen,
  );

  const [keaktifan, setKeaktifan] = useState(0);
  const [pelanggaranList, setPelanggaranList] = useState<PelanggaranInput[]>(
    [],
  );

  useEffect(() => {
    if (detailMaba) {
      setKeaktifan(detailMaba.keaktifan);
      setPelanggaranList([]);
    }
  }, [detailMaba]);

  const handleAddPelanggaran = () =>
    setPelanggaranList([
      ...pelanggaranList,
      { id: Date.now(), nama: "", kategori: "" },
    ]);
  const handleRemovePelanggaran = (id: number) =>
    setPelanggaranList(pelanggaranList.filter((p) => p.id !== id));
  const handlePelanggaranChange = (
    id: number,
    field: "nama" | "kategori",
    value: string,
  ) => {
    setPelanggaranList(
      pelanggaranList.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    );
  };

  const onSimpanClick = () => {
    const finalPelanggaran = pelanggaranList.map((p) => ({
      nama: p.nama,
      kategori: p.kategori,
    }));

    handleSubmit(keaktifan, finalPelanggaran, onSuccess);
  };

  const renderTugasFields = () => {
    if (!detailMaba) return null;

    const tugasFields = detailMaba.penilaian.map((tugas) => (
      <div key={tugas.nama_penilaian} className="w-full">
        <Input label={tugas.nama_penilaian} value={tugas.nilai} disabled />
      </div>
    ));

    if (
      rangkaianName === "Rangkaian SOS 1" ||
      rangkaianName === "Rangkaian SOS 2"
    ) {
      tugasFields.unshift(
        <div key="keaktifan" className="w-full">
          <Input
            label="Keaktifan"
            type="number"
            value={keaktifan}
            onChange={(e) => setKeaktifan(Number(e.target.value))}
          />
        </div>,
      );
    }

    return (
      <div
        className={cn("grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mt-4")}
      >
        {tugasFields}
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      containerClassName="max-w-4xl py-10"
    >
      {isLoading || !detailMaba ? (
        <div className="flex h-96 items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary-500" />
        </div>
      ) : (
        <div className="flex flex-col h-full max-h-[80vh]">
          <div className="flex-shrink-0">
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-3xl font-bold text-default-dark">
                Penilaian {detailMaba.nama_mahasiswa}
              </h2>
              <p className="text-default-dark/50 text-lg">
                Isi form di bawah ini untuk memberikan penilaian mahasiswa
              </p>
            </div>
          </div>

          <div className="flex-grow overflow-y-auto mt-6 pr-4">
            <div className={"space-y-4"}>
              {pelanggaranList.map((p) => (
                <div
                  key={p.id}
                  className="p-4 border rounded-lg border-default-dark/50 relative"
                >
                  <button
                    onClick={() => handleRemovePelanggaran(p.id)}
                    className="absolute top-2 right-2 text-default-dark hover:text-red-500"
                  >
                    <X size={20} />
                  </button>
                  <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Nama Pelanggaran"
                      placeholder="Masukkan nama pelanggaran"
                      value={p.nama}
                      onChange={(e) =>
                        handlePelanggaranChange(p.id, "nama", e.target.value)
                      }
                    />
                    <div className="flex flex-col">
                      <label className="block text-lg font-semibold mb-2 text-primary-500">
                        Keterangan
                      </label>
                      <Select
                        value={p.kategori}
                        onValueChange={(value) =>
                          handlePelanggaranChange(p.id, "kategori", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih tingkat pelanggaran" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ringan">
                            Tingkat Ringan (-70 poin)
                          </SelectItem>
                          <SelectItem value="sedang">
                            Tingkat Sedang (-80 poin)
                          </SelectItem>
                          <SelectItem value="berat">
                            Tingkat Berat (-100 poin)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={handleAddPelanggaran}
              className="mt-4 font-medium"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Pelanggaran
            </Button>

            <div className="mt-6 flex items-center gap-4 p-4 bg-infoNotif text-blue-800 border border-borderNotif rounded-xl">
              <Info className="h-6 w-6" />
              <p className="text-lg text-default-dark">
                Input dan edit nilai tugas hanya dapat dilakukan di menu
                Penugasan.
              </p>
            </div>

            {renderTugasFields()}
          </div>

          <div className="flex-shrink-0 mt-8">
            <Button onClick={onSimpanClick} className="w-full" size="large">
              Simpan
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
