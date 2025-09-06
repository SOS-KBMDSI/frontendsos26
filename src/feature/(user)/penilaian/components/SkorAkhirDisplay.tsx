import { Badge } from "@/shared/components/ui/Badge";
import { cn } from "@/shared/utils/cn";

interface SkorAkhirDisplayProps {
  skor: number;
  status: "lulus" | "tidak_lulus" | string;
}

export const SkorAkhirDisplay = ({ skor, status }: SkorAkhirDisplayProps) => {
  const isLulus = status.toLowerCase() === "lulus";

  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 md:gap-4">
        <div
          className={cn(
            "flex justify-between items-center w-full flex-grow",
            "p-3 px-4 md:px-6 md:py-4 rounded-2xl shadow-lg",
            "bg-primary-600 text-white",
          )}
        >
          <h3 className="text-base md:text-2xl font-bold">Skor Akhir</h3>
          <span className="text-lg md:text-3xl font-bold">{skor}</span>
        </div>

        <Badge
          variant={isLulus ? "completed" : "overdue"}
          className="text-xs md:text-base font-bold px-4 py-3 md:px-8 md:py-4 whitespace-nowrap"
        >
          {isLulus ? "LULUS" : "TIDAK LULUS"}
        </Badge>
      </div>

      <p className="text-[10px] md:text-sm text-gray-500 mt-2">
        *Skor akhir adalah akumulasi dari penugasan, kehadiran, keaktifan dan
        pelanggaran
      </p>
    </div>
  );
};
