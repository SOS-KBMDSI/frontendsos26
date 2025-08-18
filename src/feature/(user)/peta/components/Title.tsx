import React from "react";
import { cn } from "@/shared/utils/cn";

interface TitleProps {
  children: React.ReactNode;
  lineColor?: string;
}

export const Title = ({
  children,
  lineColor = "bg-default-light",
}: TitleProps) => {
  return (
    <div className="flex flex-col items-center gap-3 w-full px-3 md:px-10 mb-5 md:mb-16">
      <h2 className="text-3xl md:text-7xl font-semibold text-center text-default-light">
        {children}
      </h2>
      <div className={cn("h-2 w-full md:w-1/2 rounded-full", lineColor)}></div>
    </div>
  );
};
