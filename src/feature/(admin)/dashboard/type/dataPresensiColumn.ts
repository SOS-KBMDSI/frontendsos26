import { DataPresensi } from "@/api/services/admin/dashboard";
import { createColumnHelper } from "@tanstack/react-table";

const presensiColumnHelper = createColumnHelper<DataPresensi>();
export const dataPresensiColumn = [
  presensiColumnHelper.accessor("rangkaian", {
    header: "Nama Rangkaian",
    cell: (info) => info.getValue(),
    size: 250,
  }),
  presensiColumnHelper.accessor("tanggal", {
    header: "Tanggal",
    cell: (info) =>
      new Date(info.getValue()).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    size: 200,
  }),
  presensiColumnHelper.accessor("hadir", {
    header: "Hadir",
    cell: (info) => info.getValue(),
    size: 150,
  }),
  presensiColumnHelper.accessor("tidak_hadir", {
    header: "Tidak Hadir",
    cell: (info) => info.getValue(),
    size: 150,
  }),
];
