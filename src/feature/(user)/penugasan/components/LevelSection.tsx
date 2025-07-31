import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";
import { MahasiswaLevel } from "../types";
import Image from "next/image";
import Maskot from "@/assets/user/maskot-sos-basic.svg";
import { cn } from "@/shared/utils/cn";

interface LevelSectionProps {
  level: MahasiswaLevel | null;
}

export const LevelSection = ({ level }: LevelSectionProps) => {
  const [progressValue, setProgressValue] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgressValue(45), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!level) {
    return null;
  }

  const completedTaskCount = level.level;
  const displayLevel = completedTaskCount + 1;

  return (
    <div
      className={cn(
        "bg-secondary-200 border border-secondary-700 backdrop-blur-sm rounded-3xl p-4 flex flex-col w-full shadow-md gap-2",
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
            Level {displayLevel}
          </p>
          <p className="text-xs text-default-dark md:text-base">
            Selamat! kamu telah mengumpulkan {completedTaskCount} penugasan
          </p>
        </div>
      </div>

      <ProgressPrimitive.Root
        className={cn(
          "relative mt-1 h-3 w-full overflow-hidden rounded-full bg-primary-500/10",
          "md:h-4",
        )}
      >
        <ProgressPrimitive.Indicator
          className={cn(
            "relative h-full w-full flex-1 bg-gradient-to-b from-primary-500 via-primary-500/90 to-primary-400",
            "transition-transform duration-1000 ease-out",
            "overflow-hidden",
          )}
          style={{ transform: `translateX(-${100 - (progressValue || 0)}%)` }}
        >
          <div
            className={cn(
              "absolute inset-0",
              "bg-gradient-to-r from-transparent via-white/30 to-transparent",
              "animate-shimmer-bar",
            )}
          />
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>
    </div>
  );
};
