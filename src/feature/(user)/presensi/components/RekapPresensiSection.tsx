"use client";
import React from "react";
import { SectionTitle } from "../../akademik/components/SectionTitle";
import PresensiCard from "./PresensiCard";
import HeaderPresensiCard from "./HeaderPresensiCard";
import { RekapPresensi } from "@/api/services/user/presensi";

interface RekapPresensiSectionProps {
  presensiData: RekapPresensi[] | null;
  isLoading: boolean;
  error: string | null;
}

const RekapPresensiSection = ({
  presensiData,
  isLoading,
  error,
}: RekapPresensiSectionProps) => {
  if (isLoading) {
    return (
      <div className="w-2/3 mx-auto min-h-[70vh] flex justify-center items-center">
        <p className="text-default-dark text-xl">Loading presensi data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-2/3 mx-auto min-h-[70vh] flex justify-center items-center">
        <p className="text-red-500 text-xl">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full md:w-3/4 mx-auto min-h-[70vh] overflow-hidden">
      <SectionTitle underline={false}>Rekap Presensi</SectionTitle>
      <div className="overflow-x-auto">
        <div className="w-[800px] md:w-full flex flex-col gap-6">
          <HeaderPresensiCard />
          {presensiData?.map((presensi: RekapPresensi, index: number) => (
            <PresensiCard key={index} presensi={presensi} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RekapPresensiSection;
