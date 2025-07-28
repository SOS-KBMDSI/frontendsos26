"use client";

import { usePenugasan } from "../hooks/usePenugasan";
import { LevelSection } from "../components/LevelSection";
import { AktivitasSection } from "../components/AktivitasSection";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";

export const PenugasanContainer = () => {
  const { level, tugas, kuis, isLoading, activeTab, setActiveTab } =
    usePenugasan();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-login">
        <Loader2 className="w-12 h-12 animate-spin text-primary-500" />
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 -z-10 bg-login bg-cover bg-no-repeat" />

      <div className="relative z-10 mycontainer py-8 md:py-12 flex flex-col items-center gap-10 md:gap-14">
        <div className="w-full px-3 md:px-10 mt-5">
          <Link
            href="/aktivitas"
            className="self-start flex items-center gap-1 text-default-dark font-semibold text-lg md:text-xl"
          >
            <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
            Kembali
          </Link>
        </div>

        <div className="w-full px-3 md:px-6 flex flex-col items-center gap-8">
          <div className="flex flex-col items-center gap-3 w-full">
            <h2 className="text-4xl md:text-7xl font-semibold text-center">
              Penugasan
            </h2>
            <div className="h-2 w-3/4 md:w-1/2 rounded-full bg-primary-500"></div>
          </div>

          <div className="md:w-3/5">
            <LevelSection level={level} />
          </div>
        </div>

        <AktivitasSection
          tugas={tugas}
          kuis={kuis}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </div>
  );
};
