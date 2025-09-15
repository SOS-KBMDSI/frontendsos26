"use client";
import React, { useState } from "react";
import { DashboardCard } from "../components/DashboardCard";
import { DataTable } from "@/shared/components/table/DataTable";
import {
  Archive,
  Check,
  Clock,
  File,
  FileWarning,
  Loader2,
  Star,
  User,
} from "lucide-react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import {
  DataTugas,
  DataKuis,
  DataPresensi,
} from "@/api/services/admin/dashboard";
import { useDashboardData } from "../hooks/useDashboardData";
import { dataTugascolumn } from "../type/dataTugasColumn";
import { dataKuisColumn } from "../type/dataQuixColumn";
import { dataPresensiColumn } from "../type/dataPresensiColumn";
import { Button } from "@/shared/components/ui/Button";

const DashboardContainer = () => {
  const { data, isLoading, error, refresh } = useDashboardData();

  const [tugasSorting, setTugasSorting] = useState<SortingState>([]);
  const [tugasPagination, setTugasPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [presensiSorting, setPresensiSorting] = useState<SortingState>([]);
  const [presensiPagination, setPresensiPagination] = useState<PaginationState>(
    { pageIndex: 0, pageSize: 5 },
  );
  const [kuisSorting, setKuisSorting] = useState<SortingState>([]);
  const [kuisPagination, setKuisPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const tugasData = data?.data_tugas ?? [];
  const presensiData = data?.data_presensi ?? [];
  const kuisData = data?.data_kuis ?? [];

  const presensiTable = useReactTable({
    data: presensiData,
    columns: dataPresensiColumn,
    state: {
      sorting: presensiSorting,
      pagination: presensiPagination,
    },
    onSortingChange: setPresensiSorting,
    onPaginationChange: setPresensiPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableSorting: false,
  });

  const tugasTable = useReactTable({
    data: tugasData,
    columns: dataTugascolumn,
    state: {
      sorting: tugasSorting,
      pagination: tugasPagination,
    },
    onSortingChange: setTugasSorting,
    onPaginationChange: setTugasPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableSorting: false,
  });

  const kuisTable = useReactTable({
    data: kuisData,
    columns: dataKuisColumn,
    state: {
      sorting: kuisSorting,
      pagination: kuisPagination,
    },
    onSortingChange: setKuisSorting,
    onPaginationChange: setKuisPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    enableSorting: false,
  });

  React.useEffect(() => {
    if (tugasData.length === 0 && tugasSorting.length > 0) {
      setTugasSorting([]);
    }
    if (presensiData.length === 0 && presensiSorting.length > 0) {
      setPresensiSorting([]);
    }
    if (kuisData.length === 0 && kuisSorting.length > 0) {
      setKuisSorting([]);
    }
  }, [tugasData.length, presensiData.length, kuisData.length]);
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error.toString()}</div>;
  }

  if (!data) {
    return <div className="p-6">No data available.</div>;
  }

  return (
    <main className="font-poppins p-4 md:p-6">
      <h4 className="text-black font-semibold text-2xl">Halo, Admin SOS!</h4>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        <DashboardCard
          title="Jumlah Mahasiswa baru"
          value={data.jumlah_maba}
          prefix="Mahasiswa"
          icon={<User className="w-12 h-12" />}
        />
        <DashboardCard
          title="Sudah Dinilai"
          value={data.dinilai}
          prefix={"/ " + data.belum_dinilai + " Penilaian"}
          icon={<Star className="w-12 h-12" />}
        />
        <DashboardCard
          title="Presensi Hari Ini"
          value={data.presensi_sekarang}
          prefix={"/ " + data.presensi_total + " Hadir"}
          icon={<Check className="w-12 h-12" />}
        />
        <DashboardCard
          title="Tugas Terkumpul"
          value={data.tugas_terkumpul}
          prefix={"/ " + data.jumlah_tugas + " Tugas"}
          icon={<Archive className="w-12 h-12" />}
        />
        <DashboardCard
          title="Terlewat Dikumpulkan"
          value={data.terlambat}
          prefix="Tugas"
          icon={<FileWarning className="w-12 h-12" />}
        />
        <DashboardCard
          title="Belum Dikumpulkan"
          value={data.belum_dikumpulkan}
          prefix="Tugas"
          icon={<Clock className="w-12 h-12" />}
        />
      </section>

      <div className="mt-10">
        <Button
          variant="primary"
          onClick={() => (window.location.href = "/admin/dashboard-download")}
        >
          <File className="mr-2 mb-1 h-5 w-5" />
          Export As Excel
        </Button>
      </div>

      {/* Tugas Table */}
      <section className="mt-10">
        <DataTable<DataTugas>
          hideSearchInput
          table={tugasTable}
          isLoading={isLoading}
          error={error}
          refresh={refresh}
          title="Ringkasan Penugasan"
        />
      </section>

      {/* Kuis Table */}
      <section className="mt-10">
        <DataTable<DataKuis>
          hideSearchInput
          table={kuisTable}
          isLoading={isLoading}
          error={error}
          refresh={refresh}
          title="Ringkasan Kuis"
        />
      </section>

      <section className="mt-10">
        <DataTable<DataPresensi>
          hideSearchInput
          table={presensiTable}
          isLoading={isLoading}
          error={error}
          refresh={refresh}
          title="Ringkasan Presensi"
        />
      </section>
    </main>
  );
};

export default DashboardContainer;
