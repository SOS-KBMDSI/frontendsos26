import { Progress } from "@/shared/components/ui/progress";
import { MahasiswaLevel } from "../types";
import Image from "next/image";
import Maskot from "@/assets/user/maskot-sos-basic.svg";
import { cn } from "@/shared/utils/cn";

interface LevelSectionProps {
  level: MahasiswaLevel | null;
}

export const LevelSection = ({ level }: LevelSectionProps) => {
  if (!level) return null;

  const progressValue = 30;

  return (
    <div
      className={cn(
        "bg-secondary-200 border border-secondary-700 backdrop-blur-sm rounded-3xl p-4 flex flex-col shadow-md gap-2",
        "md:p-8 md:gap-3",
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <Image
          src={Maskot}
          alt="Maskot"
          className="w-14 h-14 md:w-20 md:h-20"
        />

        <div className="flex flex-col gap-2">
          <p className="text-default-dark font-semibold text-lg md:text-2xl">
            Level {level.level}
          </p>
          <p className="text-xs text-default-dark md:text-base">
            Selamat! kamu telah mengumpulkan {level.level} penugasan
          </p>
        </div>
      </div>

      <Progress
        value={progressValue}
        className={cn(
          "mt-1 h-3 bg-primary-500/10 rounded-full",
          "md:h-4",
          "[&>div]:bg-gradient-to-b",
          "[&>div]:from-primary-500",
          "[&>div]:via-primary-500/90",
          "[&>div]:to-primary-400",
        )}
      />
    </div>
  );
};
