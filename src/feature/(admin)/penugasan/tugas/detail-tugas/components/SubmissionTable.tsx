import { Table } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/table/DataTable";
import { TugasStatus } from "@/api/services/admin/tugas";
import { SearchableSelect } from "@/shared/components/filter/SearchFilter";

interface KelompokOption {
  value: string;
  label: string;
}
interface DistrikOption {
  value: string;
  label: string;
}
interface SubmissionTableProps {
  table: Table<TugasStatus>;
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

const SubmissionTable = ({
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
}: SubmissionTableProps) => {
  return (
    <div className="mt-32">
      <h4 className="text-black text-3xl font-bold ">
        Daftar Pengumpulan Penugasan
      </h4>
      <div className="mb-4 max-w-xs"></div>

      <DataTable<TugasStatus>
        table={table}
        isLoading={isSubmissionLoading}
        error={statusError}
        refresh={refresh}
        title="Status Pengumpulan Tugas"
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

export default SubmissionTable;
