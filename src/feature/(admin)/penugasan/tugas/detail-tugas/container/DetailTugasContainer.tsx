import React, { useState } from "react";
import DetailTugas from "../components/DetailTugas";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  type SortingState,
  type PaginationState,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { tugasStatusColumns } from "../type/TugasStatusColumn";
import { DataTable } from "@/shared/components/table/DataTable";
import {
  useGetDetailTugasById,
  useGetTugasSubmissions,
} from "../../hooks/useGetAllTugas";
import { TugasStatus } from "@/api/services/admin/tugas";

interface DetailTugasContainerProps {
  id_penugasan: string;
}

const DetailTugasContainer: React.FC<DetailTugasContainerProps> = ({
  id_penugasan,
}) => {
  const {
    data: detailTugas,
    error: statusError,
    refresh,
  } = useGetDetailTugasById(id_penugasan);
  const { data: tugasSubmissions, isLoading: isSubmissionLoading } =
    useGetTugasSubmissions(id_penugasan);
  const [globalFilter, setGlobalFilter] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const tableData = tugasSubmissions ?? [];

  const table = useReactTable({
    data: tableData,
    columns: tugasStatusColumns,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      pagination,
      globalFilter,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <section>
      <DetailTugas tugas={detailTugas} />

      <div className="mt-8">
        <DataTable<TugasStatus>
          table={table}
          isLoading={isSubmissionLoading}
          error={statusError}
          refresh={refresh}
          title="Status Pengumpulan Tugas"
          searchPlaceholder="Cari mahasiswa..."
        />
      </div>
    </section>
  );
};

export default DetailTugasContainer;
