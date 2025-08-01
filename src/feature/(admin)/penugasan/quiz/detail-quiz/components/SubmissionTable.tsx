import React from "react";
import { Table } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/table/DataTable";
import { QuizSubmission } from "@/api/services/admin/quiz";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/Select";

// 1. Definisikan tipe untuk opsi filter
interface KelompokOption {
  value: string;
  label: string;
}
interface DistrikOption {
  value: string;
  label: string;
}

// 2. Tambahkan props untuk filter ke dalam interface
interface QuizSubmissionTableProps {
  table: Table<QuizSubmission>;
  isSubmissionLoading: boolean;
  statusError: string | null;
  refresh: () => void;
  kelompokOptions: KelompokOption[];
  selectedKelompok: string | null;
  onKelompokChange: (value: string | null) => void;
  distrikOptions: DistrikOption[];
  selectedDistrik: string | null;
  onDistrikChange: (value: string | null) => void;
}

const QuizSubmissionTable = ({
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
}: QuizSubmissionTableProps) => {
  // 3. Terima props baru
  return (
    <div className="mt-32">
      <h4 className="text-black text-3xl font-bold ">
        Daftar Pengumpulan Kuis
      </h4>
      <div className="mb-4 max-w-xs"></div>

      <DataTable<QuizSubmission>
        table={table}
        isLoading={isSubmissionLoading}
        error={statusError}
        refresh={refresh}
        title="Status Pengumpulan Kuis"
        searchPlaceholder="Cari mahasiswa..."
        // 4. Tambahkan prop filterComponent dengan JSX dropdown
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
      />
    </div>
  );
};

export default QuizSubmissionTable;
