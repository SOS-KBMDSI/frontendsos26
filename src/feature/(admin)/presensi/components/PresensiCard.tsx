import React from "react";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";

interface PresensiCardProps {
  href: string;
}

const PresensiCard: React.FC<PresensiCardProps> = ({ href }) => {
  return (
    <Link href={`/admin/presensi/${href}`}>
      <div className="px-8 py-3.5 bg-surface-grey-50 rounded-[10px] flex justify-between text-default-dark">
        <div className="flex flex-col gap-y-2">
          <h4 className="text-xl font-normal">#######</h4>
          <p className="font-poppins">Rangkaian 1</p>
        </div>
        <div className="flex items-center justify-between gap-x-2 text-base">
          <p>4 Mei 2025</p>
          <span>|</span>
          <p>Pukul 11.00 - 11.30 WIB</p>
        </div>
        <div className="flex items-center justify-center">
          <EllipsisVertical size={24} className="cursor-pointer" />
        </div>
      </div>
    </Link>
  );
};

export default PresensiCard;
