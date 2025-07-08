import { DataKuis } from "@/api/services/admin/dashboard";
import { createColumnHelper } from "@tanstack/react-table";

const kuisColumnHelper = createColumnHelper<DataKuis>();

export const dataKuisColumn = [
  kuisColumnHelper.accessor("nama", {
    header: "Nama Kuis",
    cell: (info) => info.getValue(),
    size: 250,
  }),
  kuisColumnHelper.accessor("deadline", {
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
  kuisColumnHelper.accessor("terkumpul", {
    header: "Terkumpul",
    cell: (info) => info.getValue(),
    size: 150,
  }),
  kuisColumnHelper.accessor("belum_terkumpul", {
    header: "Belum Terkumpul",
    cell: (info) => info.getValue(),
    size: 150,
  }),
  kuisColumnHelper.accessor("ternilai", {
    header: "Sudah Dinilai",
    cell: (info) => info.getValue(),
    size: 150,
  }),
];
