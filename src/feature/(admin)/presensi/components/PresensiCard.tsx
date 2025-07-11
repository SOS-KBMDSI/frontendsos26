import React from "react";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { Presensi as PresensiDto } from "@/api/services/admin/presensi";
interface PresensiCardProps {
  presensi: PresensiDto;
}

const PresensiCard: React.FC<PresensiCardProps> = ({ presensi }) => {
  const { kode_id, kode, rangkaian_nama, tanggal, status } = presensi;
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid Date Object");
      }
      return date.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch (e) {
      console.error("Error formatting date in PresensiCard:", dateString, e);
      return "Invalid Date";
    }
  };

  const displayDate = formatDate(tanggal);
  const displayStatus = status === "aktif" ? "Aktif" : "Non-aktif";

  const statusColorClass =
    status === "aktif" ? "text-green-600" : "text-red-600";

  return (
    <Link href={`/admin/presensi/${kode_id}`} passHref>
      <div className="px-8 py-3.5 bg-surface-grey-50 rounded-[10px] flex items-center justify-between text-default-dark shadow-sm hover:shadow-md transition-shadow cursor-pointer">
        <div className="flex flex-col gap-y-1">
          <h4 className="text-xl font-normal">{kode}</h4>
          <p className="font-poppins text-gray-600">{rangkaian_nama}</p>
        </div>
        <div className="flex items-center justify-between gap-x-2 text-base text-gray-700">
          <p>{displayDate}</p>
          <span>|</span>
          <p className={`${statusColorClass} font-medium`}>{displayStatus}</p>
        </div>
        <div className="flex items-center justify-center">
          <EllipsisVertical
            size={24}
            className="cursor-pointer text-gray-500 hover:text-gray-900"
          />
        </div>
      </div>
    </Link>
  );
};

export default PresensiCard;
