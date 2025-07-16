"use client";

import Image from "next/image";
import { cn } from "@/shared/utils/cn";
import { prodiData } from "../data/prodiData";

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
            "px-4 rounded-2xl border-2 transition-all duration-300 ease-in-out text-center",
            "py-3 md:py-6",
            activeProdiId === prodi.id
              ? "bg-secondary-500 border-none text-default-dark shadow-lg scale-100"
              : "bg-transparent border-white/50 hover:bg-white/10",
          )}
        >
          <div
            className={cn(
              "hidden md:flex flex-col justify-center items-center gap-2",
              activeProdiId === prodi.id && "min-h-[200px]",
            )}
          >
            {activeProdiId === prodi.id && (
              <Image
                src={prodi.logo}
                alt={`Logo ${prodi.nama}`}
                className="w-30"
              />
            )}
            <span className="text-base font-medium">{prodi.nama}</span>
          </div>
          <div className="md:hidden flex justify-center items-center">
            <span className="text-base font-medium">{prodi.shortName}</span>
          </div>
        </button>
      ))}
    </div>
  );
};
