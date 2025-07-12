"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DetailAnggotaModalTrigger } from "../components/DetailAnggotaModalTrigger";

export type AnggotaKelompok = {
  nim: string;
  nama: string;
  prodi: string;
  nama_kelompok: string;
};

export const columns: ColumnDef<AnggotaKelompok>[] = [
  {
    accessorKey: "nama",
    header: "Nama",
    size: 200,
  },
  {
    accessorKey: "nim",
    header: "NIM",
    size: 200,
  },
  {
    accessorKey: "prodi",
    header: "Prodi",
    size: 200,
  },
  {
    accessorKey: "nama_kelompok",
    header: "Kelompok",
    size: 200,
  },
  {
    id: "detail",
    header: "Detail",
    cell: ({ row }) => {
      const nim = row.original.nim;
      return <DetailAnggotaModalTrigger nim={nim} />;
    },
    size: 100,
  },
];
