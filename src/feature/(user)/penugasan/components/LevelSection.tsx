"use client"; // 1. Tandai sebagai Client Component

import * as ProgressPrimitive from "@radix-ui/react-progress";
import * as React from "react";
import Image from "next/image";
import { MahasiswaLevel } from "../types";
import Maskot from "@/assets/user/maskot-sos-basic.svg";
import { cn } from "@/shared/utils/cn";

interface LevelSectionProps {
  level: MahasiswaLevel | null;
}

export const LevelSection = ({ level }: LevelSectionProps) => {
  const [progressValue, setProgressValue] = React.useState(0);
  const percentage = React.useMemo(() => {
    if (!level || level.max_level === 0) {
      return 0;
    }
    return (level.level / level.max_level) * 100;
  }, [level]);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgressValue(percentage), 100);
    return () => clearTimeout(timer);
  }, [percentage]);

  if (!level) {
    return null;
  }

  const progressMessage =
    level.level === 0
      ? "Kerjakan penugasan untuk membuka level"
      : `Kamu telah menyelesaikan ${level.level} dari ${level.max_level} penugasan.`;

  return (
    <div
      className={cn(
        "bg-secondary-200 border border-secondary-700 backdrop-blur-sm rounded-3xl py-4 px-2 flex flex-col w-full shadow-md gap-2",
        "md:p-8 md:gap-3",
      )}
    >
      <div className="flex flex-row items-center gap-4">
        <Image
          src={Maskot}
          alt="Maskot"
          className="w-14 h-14 md:w-20 md:h-20"
          priority
        />
        <div className="flex flex-col gap-2 w-full">
          <p className="text-default-dark font-semibold text-lg md:text-2xl">
            Level {level.level}
          </p>
          <p className="text-xs text-default-dark md:text-lg">
            {progressMessage}
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
          style={{ transform: `translateX(-${100 - progressValue}%)` }}
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
