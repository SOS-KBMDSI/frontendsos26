"use client";

import React from "react";
import { Table } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/table/DataTable";
import {
  PresensiMahasiswaDetail,
  PresensiMahasiswaSummary,
} from "@/api/services/admin/presensi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/Select";

interface KelompokOption {
  value: string;
  label: string;
}
interface DistrikOption {
  value: string;
  label: string;
}

interface PresensiTableProps {
  table: Table<PresensiMahasiswaDetail>;
  isSubmissionLoading: boolean;
  statusError: string | null;
  refresh: () => void;
  kelompokOptions: KelompokOption[];
  selectedKelompok: string | null;
  onKelompokChange: (value: string | null) => void;
  distrikOptions: DistrikOption[];
  selectedDistrik: string | null;
  onDistrikChange: (value: string | null) => void;
  onRowSelect: (rowData: PresensiMahasiswaSummary) => void;
}

const PresensiTable = ({
  table,
  isSubmissionLoading,
  statusError,
  refresh,
  kelompokOptions,
  selectedKelompok,
  onKelompokChange,
  distrikOptions,
  selectedDistrik,
  onDistrikChange,
  onRowSelect,
}: PresensiTableProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <h4 className="text-black text-3xl font-bold ">
        Daftar Pengumpulan Penugasan
      </h4>
      <DataTable<PresensiMahasiswaDetail>
        table={table}
        isLoading={isSubmissionLoading}
        error={statusError}
        refresh={refresh}
        title="Status Presensi"
        searchPlaceholder="Cari mahasiswa..."
        filterComponent={
          <>
            <Select
              value={selectedKelompok ?? "all"}
              onValueChange={(value) => {
                const newSelectedValue = value === "all" ? null : value;
                onKelompokChange(newSelectedValue);
              }}
            >
              <SelectTrigger
                id="kelompok-filter"
                className="w-full md:w-[200px]"
              >
                <SelectValue placeholder="Filter berdasarkan Kelompok" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">Semua Kelompok</SelectItem>
                {kelompokOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedDistrik ?? "all"}
              onValueChange={(value) => {
                onDistrikChange(value === "all" ? null : value);
              }}
            >
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Filter Distrik" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Distrik</SelectItem>
                {distrikOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </>
        }
        whenOnClick={true}
        onRowClick={(rowData) => {
          const summary: PresensiMahasiswaSummary = {
            nama: rowData.nama,
            nim: rowData.nim,
            status: rowData.status as "hadir" | "tidak-hadir",
          };
          onRowSelect(summary);
        }}
      />
    </div>
  );
};

export default PresensiTable;
