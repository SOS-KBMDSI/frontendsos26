import React from "react";
import { Table } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/table/DataTable";
import { QuizSubmission } from "@/api/services/admin/quiz";
import { SearchableSelect } from "@/shared/components/filter/SearchFilter";

interface KelompokOption {
  value: string;
  label: string;
}
interface DistrikOption {
  value: string;
  label: string;
}

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

export default QuizSubmissionTable;
