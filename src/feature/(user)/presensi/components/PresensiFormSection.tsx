"use client";

import React, { useState } from "react";
import MaskotPresensi from "@/assets/presensi/presensi-bg.svg";
import ArrowBack from "@/assets/presensi/back-arrow.svg";
import { Input } from "@/shared/components/ui/Input";
import { Button } from "@/shared/components/ui/Button";
import { SectionTitle } from "../../akademik/components/SectionTitle";
import { Modal } from "@/shared/components/ui/Modal";
import { useSubmitPresensi } from "../hooks/useSubmitPresensi";
import Link from "next/link";
import Image from "next/image";

interface PresensiFormSectionProps {
  refreshPresensi: () => void;
}

const PresensiFormSection = ({ refreshPresensi }: PresensiFormSectionProps) => {
  const [kode, setKode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { submit, isSubmitting, submitError, submitSuccess } =
    useSubmitPresensi();

  const handleSubmit = () => {
    if (kode) {
      submit(kode);
    }
  };

  React.useEffect(() => {
    if (submitSuccess) {
      refreshPresensi();
      setIsModalOpen(true);
      setKode("");
    }
  }, [submitSuccess, refreshPresensi]);

  React.useEffect(() => {
    if (submitError) {
      setIsModalOpen(true);
    }
  }, [submitError]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-full">
          <div className="w-full">
            <Link
              href={"/aktivitas"}
              className="flex items-center gap-4 text-lg  font-medium text-default-dark"
            >
              <Image
                src={ArrowBack}
                width={200}
                height={200}
                alt="ArrowBack"
                className="w-6"
              />
              Kembali
            </Link>
          </div>
          <div className="text-center mt-12 md:mt-24">
            <SectionTitle lineColor="bg-primary-500">
              Masukan Kode Presensi
            </SectionTitle>
          </div>
        </div>
        <div className="hidden md:block w-2/3 mx-auto">
          <div className="w-full">
            <div
              className="text-default-dark drop-shadow flex justify-center items-center flex-col h-[40rem] lg:h-[48rem]"
              style={{
                borderStyle: "solid",
                borderWidth: "40px",
                borderImageSource: `url(${MaskotPresensi.src})`,
                borderImageSlice: "45 fill",
                borderImageRepeat: "stretch",
              }}
            >
              <div className="w-5/12 flex flex-col gap-4 justify-center items-center mr-10">
                <Input value={kode} onChange={(e) => setKode(e.target.value)} />
                <Button
                  className="w-1/2"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Mengirim..." : "Kirim"}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="md:hidden w-full mx-auto">
          <div className="w-full">
            <div
              className="text-default-dark drop-shadow flex justify-center items-center flex-col h-[24rem]"
              style={{
                borderImageSource: `url(${MaskotPresensi.src})`,
                borderImageSlice: "45 fill",
                borderImageRepeat: "stretch",
              }}
            >
              <div className="w-5/12 flex flex-col gap-4 justify-center items-center mr-4">
                <Input
                  className="h-10"
                  value={kode}
                  onChange={(e) => setKode(e.target.value)}
                />
                <Button
                  className="w-10/12 py-2 rounded-lg"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Mengirim..." : "Kirim"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={submitSuccess ? "Berhasil!" : "Terjadi Kesalahan"}
        desc={
          submitSuccess
            ? "Presensi Anda berhasil dicatat."
            : submitError || "Gagal mengirim presensi. Silakan coba lagi."
        }
      >
        <div className="mt-4 flex justify-center">
          <Button onClick={() => setIsModalOpen(false)}>Tutup</Button>
        </div>
      </Modal>
    </>
  );
};

export default PresensiFormSection;
