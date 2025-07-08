"use client";

import { TugasStatus } from "@/api/services/admin/tugas";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
const tugasStatusColumnHelper = createColumnHelper<TugasStatus>();

export const tugasStatusColumns = [
  tugasStatusColumnHelper.accessor("nama_mahasiswa", {
    header: "Nama Mahasiswa",
    cell: (info) => info.getValue(),
    size: 250,
  }),

  tugasStatusColumnHelper.accessor("nim", {
    header: "NIM",
    cell: (info) => info.getValue(),
    size: 150,
  }),

  tugasStatusColumnHelper.accessor("status", {
    header: "Status",
    cell: (info) => info.getValue(),
    size: 150,
  }),

  tugasStatusColumnHelper.accessor("link_pengumpulan", {
    header: "Link Pengumpulan",
    cell: ({ row }) => {
      const link = row.original.link_pengumpulan;

      if (link) {
        return (
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Lihat Pengumpulan
          </Link>
        );
      }

      // Tampilkan strip jika tidak ada link
      return <span className="text-gray-400">-</span>;
    },
    size: 200,
  }),

  tugasStatusColumnHelper.accessor("nilai", {
    header: "Nilai",
    cell: (info) => info.getValue(),
    size: 100,
  }),
];
