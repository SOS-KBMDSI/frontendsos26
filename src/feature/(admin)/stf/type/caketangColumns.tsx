"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StfSummary } from ".";

export const columns: ColumnDef<StfSummary>[] = [
 {
    accessorKey: "prodi",
    header: () => <div className="text-left">Prodi</div>,
    size: 200,
  },
  {
    accessorKey: "nama",
    header: () => <div className="text-center">Nama Calon</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue("nama")}</div>,
    size: 250,
  },
  {
    accessorKey: "jumlah_vote",
    header: () => <div className="text-center">Jumlah Voting</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("jumlah_vote")} Suara</div>
    ),
    size: 100,
  },
];