"use client";

import { createColumnHelper, RowData } from "@tanstack/react-table";
import { Edit3Icon, Trash2Icon } from "lucide-react";
import { StfSummary } from ".";

// Deklarasi global yang digabung dan dibuat opsional
declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    handleEdit?: (data: TData) => void;
    handleDelete?: (data: TData) => void;
    openEditModal?: (data: TData) => void;
  }
}

const columnHelper = createColumnHelper<StfSummary>();

export const columns = [
  columnHelper.accessor("prodi", {
    header: () => <div className="text-left">Prodi</div>,
    cell: (info) => <div className="text-left">{info.getValue()}</div>,
    size: 200,
  }),
  columnHelper.accessor("nama", {
    header: () => <div className="text-center">Nama Calon</div>,
    cell: (info) => <div className="text-left">{info.getValue()}</div>,
    size: 250,
  }),
  columnHelper.accessor("jumlah_vote", {
    header: () => <div className="text-center">Jumlah Voting</div>,
    cell: ({ row }) => (
      <div className="text-left">{row.getValue("jumlah_vote")} Suara</div>
    ),
    size: 200,
  }),
  columnHelper.display({
    id: "aksi",
    header: () => <div className="text-right">Aksi</div>,
    cell: ({ row, table }) => (
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => table.options.meta?.handleEdit?.(row.original)}
          className="p-2 rounded-full hover:bg-orange-100 transition-colors"
          title="Edit Data"
        >
          <Edit3Icon className="text-orange-500 h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => table.options.meta?.handleDelete?.(row.original)}
          className="p-2 rounded-full hover:bg-red-100 transition-colors"
          title="Hapus Calon"
        >
          <Trash2Icon className="text-red-500 h-5 w-5" />
        </button>
      </div>
    ),
    size: 100,
  }),
];
