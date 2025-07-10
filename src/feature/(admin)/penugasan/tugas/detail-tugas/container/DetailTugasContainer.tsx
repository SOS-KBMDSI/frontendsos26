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
import { useGetDetailTugasById } from "../hooks/useGetDetailTugasById";
import { useGetTugasSubmissions } from "../hooks/useGetTugasSubmissions";
import SubmissionTable from "../components/SubmissionTable";
import { useSelectOptions } from "@/shared/hooks/useSelectOptions";

interface DetailTugasContainerProps {
  id_penugasan: string;
}

const DetailTugasContainer: React.FC<DetailTugasContainerProps> = ({
  id_penugasan,
}) => {
  const [selectedKelompok, setSelectedKelompok] = useState<string | null>(null);
  const [selectedDistrik, setSelectedDistrik] = useState<string | null>(null);
  const { options: kelompokOptions } = useSelectOptions("kelompok");
  const { options: distrikOptions } = useSelectOptions("distrik");
  const { data: detailTugas, error: statusError } =
    useGetDetailTugasById(id_penugasan);
  const {
    data: tugasSubmissions,
    isLoading: isSubmissionLoading,
    refresh: refreshSubmission,
  } = useGetTugasSubmissions(id_penugasan, selectedKelompok, selectedDistrik);
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
  const handleKelompokChange = (value: string | null) => {
    setSelectedKelompok(value);
  };
  const handleDistrikChange = (value: string | null) => {
    setSelectedDistrik(value);
  };
  return (
    <section>
      <DetailTugas tugas={detailTugas} />
      <SubmissionTable
        isSubmissionLoading={isSubmissionLoading}
        table={table}
        statusError={statusError}
        refresh={refreshSubmission}
        kelompokOptions={kelompokOptions}
        selectedKelompok={selectedKelompok}
        onKelompokChange={handleKelompokChange}
        distrikOptions={distrikOptions}
        selectedDistrik={selectedDistrik}
        onDistrikChange={handleDistrikChange}
      />
    </section>
  );
};

export default DetailTugasContainer;
