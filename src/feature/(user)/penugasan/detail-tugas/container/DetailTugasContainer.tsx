"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useDetailTugas } from "../hooks/useDetailTugas";
import { Button } from "@/shared/components/ui/Button";
import { TaskStepper } from "../components/TaskStepper";
import { DetailHeader } from "../components/DetailHeader";
import { DetailContent } from "../components/DetailContent";
import { AnimatedDiv } from "@/shared/components/ui/AnimatedDiv";

export const DetailTugasContainer = ({
  id_penugasan,
}: {
  id_penugasan: string;
}) => {
  const { tugas, isLoading, error, isSubmitting, handleSubmitTugas } =
    useDetailTugas(id_penugasan);
  const [activeStep, setActiveStep] = useState(1);
  const [driveLink, setDriveLink] = useState("");

  useEffect(() => {
    if (tugas?.link_pengumpulan) {
      setDriveLink(tugas.link_pengumpulan);
    }
  }, [tugas]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-login">
        <Loader2 className="w-12 h-12 animate-spin text-primary-500" />
      </div>
    );
  }

  if (error || !tugas) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-login text-center px-4">
        <p className="text-xl text-red-500 mb-4">
          {error || "Tugas tidak ditemukan."}
        </p>
        <Link href="/aktivitas/penugasan">
          <Button variant="outline">Kembali ke Daftar Tugas</Button>
        </Link>
      </div>
    );
  }

  const isSubmitted = tugas.status === "Selesai";

  const isDeadlinePassed = new Date() > new Date(tugas.tenggat);
  // const isOverdue = isDeadlinePassed && !isSubmitted;

  let statusText: string;
  let statusVariant: "not_started" | "completed" | "overdue";

  if (isSubmitted) {
    statusText = "Selesai";
    statusVariant = "completed";
  } else if (isDeadlinePassed) {
    statusText = "Terlewat";
    statusVariant = "overdue";
  } else {
    statusText = "Belum Dikerjakan";
    statusVariant = "not_started";
  }

  const deadlineDate = new Date(tugas.tenggat);
  const formattedDeadline = `${deadlineDate.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })} • ${deadlineDate.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  })}`;

  const handleFormSubmit = () => {
    if (!driveLink.trim()) {
      alert("Link pengumpulan tidak boleh kosong.");
      return;
    }
    handleSubmitTugas(driveLink);
  };

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-login bg-cover bg-no-repeat" />
      <div className="relative z-10 content-container py-8 md:py-12 flex flex-col items-center gap-6 md:gap-8">
        <AnimatedDiv className="w-full">
          <div className="w-full">
            <Link
              href="/aktivitas/penugasan"
              className="self-start flex items-center gap-1 text-default-dark font-semibold text-lg md:text-xl"
            >
              <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
              Kembali
            </Link>
          </div>
        </AnimatedDiv>

        <AnimatedDiv className="w-full flex justify-center" delay={0.1}>
          <div className="w-full bg-white rounded-2xl shadow-lg px-6 py-12 md:px-20 md:py-20 flex flex-col gap-6 md:gap-10">
            <DetailHeader
              judul={tugas.judul}
              deadline={formattedDeadline}
              statusText={statusText}
              statusVariant={statusVariant}
            />

            <TaskStepper
              activeStep={activeStep}
              setActiveStep={setActiveStep}
            />

            <DetailContent
              activeStep={activeStep}
              setActiveStep={setActiveStep}
              tugas={tugas}
              driveLink={driveLink}
              setDriveLink={setDriveLink}
              isSubmitted={isSubmitted}
              isOverdue={isDeadlinePassed}
              isSubmitting={isSubmitting}
              handleFormSubmit={handleFormSubmit}
            />
          </div>
        </AnimatedDiv>
      </div>
    </div>
  );
};
