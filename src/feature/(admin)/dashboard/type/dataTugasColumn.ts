"use client";

import { DataTugas } from "@/api/services/admin/dashboard";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<DataTugas>();

export const dataTugascolumn = [
  columnHelper.accessor("nama_penugasan", {
    header: "Nama Penugasan",
    cell: (info) => info.getValue(),
    size: 200,
  }),

  columnHelper.accessor("deadline", {
    header: "Deadline",
    cell: (info) =>
      new Date(info.getValue()).toLocaleString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
    size: 200,
  }),

  columnHelper.accessor("terkumpul", {
    header: "Terkumpul",
    cell: (info) => info.getValue(),
    size: 200,
  }),

  columnHelper.accessor("belum_terkumpul", {
    header: "Belum Terkumpul",
    cell: (info) => info.getValue(),
    size: 200,
  }),

  columnHelper.accessor("sudah_dinilai", {
    header: "Sudah Dinilai",
    cell: (info) => info.getValue(),
    size: 200,
  }),
];
