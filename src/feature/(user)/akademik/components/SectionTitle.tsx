import React from "react";
import { cn } from "@/shared/utils/cn";

interface SectionTitleProps {
  children: React.ReactNode;
  lineColor?: string;
  underline?: boolean;
}

export const SectionTitle = ({
  children,
  lineColor = "bg-default-light",
  underline = true,
}: SectionTitleProps) => {
  return (
    <div className="flex flex-col items-center gap-3 w-full px-3 md:px-10 mb-5 md:mb-16">
      <h2 className="text-3xl md:text-7xl font-semibold text-center">
        {children}
      </h2>

      {underline && (
        <div
          className={cn("h-2 w-full md:w-1/2 rounded-full", lineColor)}
        ></div>
      )}
    </div>
  );
};
