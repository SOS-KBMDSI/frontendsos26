"use client";

import { cn } from "@/shared/utils/cn";
import { prodiData } from "@/feature/(user)/akademik/data/prodiData";

interface ProdiTabsProps {
  activeProdiId: string;
  onSelectProdi: (id: string) => void;
}

export const ProdiTabs = ({ activeProdiId, onSelectProdi }: ProdiTabsProps) => {
  return (
    <div className="grid grid-cols-3 md:flex md:flex-col gap-4 w-full">
      {prodiData.map((prodi) => (
        <button
          key={prodi.id}
          onClick={() => onSelectProdi(prodi.id)}
          className={cn(
            "px-4 rounded-2xl border-2 border-primary-500 transition-all duration-500 ease-in-out text-center text-primary-500 hover:text-secondary",
            "py-3",
            activeProdiId === prodi.id
              ? "bg-primary-500 text-secondary"
              : "bg-transparent border-primary-500 hover:bg-primary-500",
          )}
        >
          <div
            className={cn(
              "hidden md:flex flex-col justify-center items-center gap-2",
              activeProdiId === prodi.id,
            )}
          >
            <span className="text-sm font-medium">{prodi.nama}</span>
          </div>
          <div className="md:hidden flex justify-center items-center">
            <span className="text-base font-medium">{prodi.shortName}</span>
          </div>
        </button>
      ))}
    </div>
  );
};
