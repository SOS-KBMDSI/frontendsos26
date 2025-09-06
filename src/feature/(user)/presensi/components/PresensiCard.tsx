import { RekapPresensi } from "@/api/services/user/presensi";
import React from "react";

interface Props {
  presensi: RekapPresensi;
}

const PresensiCard = ({ presensi }: Props) => {
  const centerClass = "flex items-center";
  return (
    <div className="flex bg-default-light rounded-md px-12 text-default-dark font-normal py-4 gap-4 text-lg">
      <div className={`w-3/12 ${centerClass}`}>
        <span>{presensi.rangkaian}</span>
      </div>
      <div className={`w-2/12 ${centerClass}`}>
        <span>{presensi.sesi}</span>
      </div>
      <div className={`w-3/12 ${centerClass}`}>
        <span>{presensi.waktu}</span>
      </div>
      <div className={`w-4/12 ${centerClass}`}>
        <span>{presensi.tanggal}</span>
      </div>
    </div>
  );
};

export default PresensiCard;
