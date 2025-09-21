"use client";

import React from "react";
import { Table } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/table/DataTable";
import {
  PresensiMahasiswaDetail,
  PresensiMahasiswaSummary,
} from "@/api/services/admin/presensi";

import { SearchableSelect } from "@/shared/components/filter/SearchFilter";

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
  onRowSelect?: (rowData: PresensiMahasiswaSummary) => void;
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
}: PresensiTableProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <h4 className="text-black text-3xl font-bold ">Daftar Presensi</h4>
      <DataTable<PresensiMahasiswaDetail>
        table={table}
        isLoading={isSubmissionLoading}
        error={statusError}
        refresh={refresh}
        title="Status Presensi"
        searchPlaceholder="Cari mahasiswa..."
        filterComponent={
          <div className="flex flex-col sm:flex-row gap-4">
            <SearchableSelect
              options={kelompokOptions}
              value={selectedKelompok}
              onValueChange={onKelompokChange}
              placeholder="Filter berdasarkan Kelompok"
              searchPlaceholder="Cari kelompok..."
              allLabel="Semua Kelompok"
            />

            <SearchableSelect
              options={distrikOptions}
              value={selectedDistrik}
              onValueChange={onDistrikChange}
              placeholder="Filter Distrik"
              searchPlaceholder="Cari distrik..."
              allLabel="Semua Distrik"
            />
          </div>
        }
      />
    </div>
  );
};

export default PresensiTable;
