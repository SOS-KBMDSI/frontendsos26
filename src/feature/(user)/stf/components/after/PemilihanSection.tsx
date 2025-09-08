"use client";
import React, { useState } from "react";
import PemilihanCard from "./PemilihanCard";
import { Button } from "@/shared/components/ui/Button";
import { Caketang } from "@/api/services/user/stf";
import { useVoteForCaketang } from "../../hooks/useVoteForCaketang";
import { Modal } from "@/shared/components/ui/Modal";
import { useGetStfData } from "../../hooks/useGetStfData";
import Image from "next/image";
import SuccessIcon from "@/assets/stf/success.png";
import ErrorIcon from "@/assets/stf/error.png";

interface PemilihanSectionProps {
  caketangList: Caketang[];
  isLoading: boolean;
  error: string | null;
  activeCardId: string | null;
  kesempatan: boolean;
  setActiveCardId: (id: string) => void;
}

const PemilihanSection = ({
  caketangList,
  activeCardId,
  setActiveCardId,
  kesempatan = false,
}: PemilihanSectionProps) => {
  const { vote, isVoting, voteSuccess } = useVoteForCaketang();
  const { refresh } = useGetStfData();

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const activeCaketang = caketangList?.find(
    (caketang: Caketang) => caketang.id_caketang === activeCardId,
  );

  const handleVote = () => {
    if (activeCaketang) {
      vote(activeCaketang.id_caketang);
      setIsConfirmationModalOpen(false);
      setIsResultModalOpen(true);
      refresh();
    }
  };

  return (
    <>
      <section className="bg-no-repeat bg-cover bg-login">
        <div className="mycontainer text-center py-24 text-default-dark w-10/12 flex flex-col gap-12">
          <h4 className="text-3xl md:text-5xl lg:text-5xl font-semibold text-default-dark mb-4 md:mb-6 lg:mb-8">
            Saatnya Memilih!
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9">
            {caketangList?.map((caketang: Caketang) => (
              <PemilihanCard
                key={caketang.id_caketang}
                data={caketang}
                isActive={caketang.id_caketang === activeCardId}
                onClick={() => setActiveCardId(caketang.id_caketang)}
              />
            ))}
          </div>
          <Button
            disabled={!kesempatan}
            onClick={() => setIsConfirmationModalOpen(true)}
          >
            Pilih
          </Button>
        </div>
      </section>

      <Modal
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        title="Konfirmasi Pilihan"
        desc={`Apakah Anda yakin ingin memilih ${activeCaketang?.nama}? Pilihan tidak dapat diubah.`}
      >
        <div className="mt-4 flex justify-end space-x-4">
          <Button
            variant="outline"
            onClick={() => setIsConfirmationModalOpen(false)}
          >
            Batal
          </Button>
          <Button onClick={handleVote} disabled={isVoting}>
            {isVoting ? "Memilih..." : "Ya, Yakin"}
          </Button>
        </div>
      </Modal>

      <Modal
        isOpen={isResultModalOpen}
        onClose={() => setIsResultModalOpen(false)}
      >
        {voteSuccess ? (
          <div className="mt-4 flex justify-center items-center flex-col p-4 md:p-8 gap-10">
            <Image
              src={SuccessIcon}
              width={300}
              height={300}
              alt="Success Icon"
              className="w-1/3 mx-auto"
            />
            <div className="flex flex-col justify-center items-center gap-6">
              <div className="text-default-dark flex flex-col justify-center items-center gap-3">
                <h5 className="text-xl md:text-3xl font-bold text-center">
                  🎉 Yeay, Kamu Sudah Memilih!
                </h5>
                <p className="text-center text-sm">
                  Satu suara darimu berarti besar! Terima kasih telah ikut
                  menentukan masa depan angkatan kita.
                </p>
              </div>
              <Button
                className="px-8 md:px-14"
                onClick={() => setIsResultModalOpen(false)}
              >
                Selesai
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex justify-center items-center flex-col p-4 md:p-8 gap-10">
            <Image
              src={ErrorIcon}
              width={300}
              height={300}
              alt="Error Icon"
              className="w-1/3 mx-auto"
            />
            <div className="flex flex-col justify-center items-center gap-6">
              <div className="text-default-dark flex flex-col justify-center items-center gap-3">
                <h5 className="text-xl md:text-3xl font-bold text-center">
                  Gagal Melakukan Pemilihan 😣
                </h5>
                <p className="text-center text-sm">
                  Maaf suara kamu belum diterima, silakan coba lagi atau hubungi
                  panitia
                </p>
              </div>
              <Button
                className="px-8 md:px-14"
                onClick={() => setIsResultModalOpen(false)}
              >
                Baiklah
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default PemilihanSection;
