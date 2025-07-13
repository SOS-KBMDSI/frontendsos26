import React from "react";
import Link from "next/link";
import { Aktivitas } from "../data/aktivitasData";

interface AktivitasListProps {
  aktivitas: Aktivitas;
}

const AktivitasList = ({ aktivitas }: AktivitasListProps) => {
  const Icon = aktivitas.icon;

  return (
    <Link
      href={aktivitas.href}
      className="w-full z-20 block transition-transform duration-300 hover:scale-105 cursor-pointer"
    >
      <div className="h-auto aspect-square flex items-center justify-center rounded-t-[120px] bg-white hover:shadow-lg transition-shadow duration-300">
        <Icon className="text-primary-500 w-1/2 h-fit transition-colors duration-300 hover:text-primary-600" />
      </div>
      <p className="text-2xl lg:text-4xl text-white mt-6 text-center font-semibold transition-opacity duration-300 hover:opacity-90">
        {aktivitas.nama}
      </p>
    </Link>
  );
};

export default AktivitasList;
