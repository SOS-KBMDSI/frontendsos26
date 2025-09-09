import React from "react";
import { Table } from "@tanstack/react-table";
import { DataTable } from "@/shared/components/table/DataTable";
import { RekapPenilaianItem } from "../types";

interface PenilaianTableProps {
  table: Table<RekapPenilaianItem>;
  refresh: () => void;
  globalFilter: string;
}

export const PenilaianTable = ({ table, refresh }: PenilaianTableProps) => {
  return (
    <DataTable
      table={table}
      whenOnClick={true}
      hideSearchInput={true}
      title="Penilaian"
      isLoading={false}
      error={null}
      refresh={refresh}
    />
  );
};
