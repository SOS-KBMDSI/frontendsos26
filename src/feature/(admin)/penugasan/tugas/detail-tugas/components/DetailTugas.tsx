"use client";

import { TugasSummary } from "@/api/services/admin/tugas";
import { Button } from "@/shared/components/ui/Button";
import { Input } from "@/shared/components/ui/Input";
import { Calendar, Clock } from "lucide-react";
import React from "react";

interface DetailTugasProps {
  tugas: TugasSummary | null;
}

const DetailTugas = ({ tugas }: DetailTugasProps) => {
  const formatTenggat = (tenggat: string | undefined) => {
    if (!tenggat) {
      return { date: "N/A", time: "N/A" };
    }
    const deadlineDate = new Date(tenggat);
    const date = deadlineDate
      .toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\./g, " / ");

    const time = deadlineDate
      .toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(/\./g, " : ");

    return { date, time };
  };

  const { date, time } = formatTenggat(tugas?.tenggat);

  const displayRangkaian = tugas?.id_rangkaian.split("-")[0] || "N/A";

  return (
    <div className="w-full">
      <h4 className="font-semibold text-2xl md:text-3xl lg:text-4xl text-black">
        Tugas {tugas?.judul || "Judul Tugas Tidak Ditemukan"}
      </h4>

      <p
        className="mt-8 md:mt-12 text-justify text-base md:text-lg lg:text-base text-gray-800"
        data-testid="tugas-description"
      >
        {tugas?.deskripsi || "Deskripsi tidak tersedia."}
      </p>

      <div className="mt-12 md:mt-16">
        <div className="space-y-2">
          <label htmlFor="drive-link" className="block text-sm md:text-base">
            Link Drive File Pendukung
          </label>
          <Input
            id="drive-link"
            value={tugas?.file_link || ""}
            className="w-full"
            disabled
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          <div className="flex flex-col space-y-2 text-gray-700">
            <span className="text-primary-500 font-medium">Deadline:</span>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Calendar />
                <span>{date}</span>
              </div>
              <div className="h-6 border-l border-gray-300"></div>
              <div className="flex items-center space-x-2">
                <Clock />
                <span>{time}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2 text-gray-700">
            <span className="text-primary-500 font-medium">Rangkaian:</span>
            <span className="w-fit">{displayRangkaian}</span>
          </div>
        </div>

        <div className="mt-12">
          <Button variant={"primary"}>Edit Tugas</Button>
        </div>
      </div>
    </div>
  );
};

export default DetailTugas;
