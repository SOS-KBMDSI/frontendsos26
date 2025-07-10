"use client";

import React from "react";
import { flexRender, Table } from "@tanstack/react-table";
import { Input } from "@/shared/components/ui/Input";
import { Loader2, Search } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { cn } from "@/shared/utils/cn";

interface DataTableProps<TData> {
  table: Table<TData>;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
  title: string;
  searchPlaceholder?: string;
  hideSearchInput?: boolean;
  headerClassName?: string;
  hideMeta?: boolean;
  hidePagination?: boolean;
  filterComponent?: React.ReactNode;
}

export const DataTable = <TData,>({
  table,
  isLoading,
  error,
  title,
  searchPlaceholder,
  hideSearchInput = false,
  headerClassName,
  hideMeta = false,
  hidePagination = false,
  filterComponent,
}: DataTableProps<TData>) => {
  if (isLoading) {
    return (
      <div className="flex h-60 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  const { pageIndex, pageSize } = table.getState().pagination;
  const totalRows = table.getFilteredRowModel().rows.length;
  const firstRowIndex = pageIndex * pageSize + 1;
  const lastRowIndex = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div className="mt-12">
      <div className="flex gap-6 items-center  mb-10">
        {filterComponent}
        {!hideSearchInput && (
          <div className="relative flex items-center w-full md:w-1/3 h-14">
            <Input
              className="text-base w-full pl-10 h-full"
              variant={"default"}
              value={(table.getState().globalFilter as string) ?? ""}
              onChange={(e) => table.setGlobalFilter(e.target.value)}
              placeholder={searchPlaceholder}
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        )}
      </div>
      <div className="bg-white w-full rounded-2xl shadow-xl overflow-hidden">
        <div className="flex justify-between items-center border-b px-6 pb-6 pt-6 border-b-black">
          <h4 className="text-2xl font-bold text-primary-500">{title}</h4>
          {!hideMeta && (
            <span className="text-sm font-medium text-primary-500">
              Showing {firstRowIndex} - {lastRowIndex} of {totalRows}
            </span>
          )}
        </div>
        <div className="w-full overflow-x-auto">
          <table className="min-w-[800px] w-full text-sm text-left text-black table-auto">
            <thead className={cn("text-black text-lg", headerClassName)}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="py-4 px-6"
                      style={{ width: header.getSize() }}
                    >
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`h-20 transition-colors ${
                    row.getIsSelected()
                      ? "bg-primary-500 text-white"
                      : index % 2 === 1
                        ? "bg-white"
                        : "bg-primary-500/10"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="py-4 px-6 font-medium"
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {!hidePagination && (
        <div className="pagination-controls mt-6 flex justify-end gap-10">
          <Button
            arrow="left"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="pagination-arrow"
          ></Button>
          <Button
            arrow="right"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="pagination-arrow"
          ></Button>
        </div>
      )}
    </div>
  );
};
