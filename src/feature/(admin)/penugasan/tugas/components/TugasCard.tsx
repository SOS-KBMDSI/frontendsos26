import { TugasSummary } from "@/api/services/admin/tugas";
import { Ellipsis } from "lucide-react";
import React from "react";
interface TugasCardProps {
  tugas: TugasSummary;
  idx: number;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export const TugasCard: React.FC<TugasCardProps> = ({ tugas, idx }) => {
  return (
    <div className="bg-gray-200/50 hover:cursor-pointer  flex justify-between rounded-lg px-6 py-5">
      <div className="text-2xl text-black">
        Tugas {idx} : ({tugas.judul})
      </div>
      <div>
        <Ellipsis className="rotate-90" />
      </div>
    </div>
  );
};
