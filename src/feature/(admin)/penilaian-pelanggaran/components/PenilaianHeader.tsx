import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/Select";
import { Button } from "@/shared/components/ui/Button";
import { Rangkaian, Distrik, Kelompok } from "../types";
import { SearchableSelect } from "@/shared/components/filter/SearchFilter";

interface PenilaianHeaderProps {
  rangkaianOptions: Rangkaian[];
  distrikOptions: Distrik[];
  kelompokOptions: Kelompok[];
  selectedRangkaian: string;
  onRangkaianChange: (value: string) => void;
  selectedDistrik: string;
  onDistrikChange: (value: string) => void;
  selectedKelompok: string;
  onKelompokChange: (value: string) => void;
  isEditButtonDisabled: boolean;
  onEditClick: () => void;
  isRangkaianLoading: boolean;
  isDistrikLoading: boolean;
}

export const PenilaianHeader = ({
  rangkaianOptions,
  distrikOptions,
  kelompokOptions,
  selectedRangkaian,
  onRangkaianChange,
  selectedDistrik,
  onDistrikChange,
  selectedKelompok,
  onKelompokChange,
  isEditButtonDisabled,
  onEditClick,
  isRangkaianLoading,
}: PenilaianHeaderProps) => {
  return (
    <div className="mt-6 flex flex-col gap-6">
      <div className="flex gap-4">
        <SearchableSelect
          options={distrikOptions.map((distrik) => ({
            value: distrik.id_distrik,
            label: distrik.nama_distrik,
          }))}
          value={selectedDistrik}
          onValueChange={(value) => onDistrikChange(value ?? "")}
          placeholder="Filter Distrik"
          searchPlaceholder="Cari distrik..."
          allLabel="Semua Distrik"
        />

        <Select
          value={selectedKelompok}
          onValueChange={onKelompokChange}
          disabled={!selectedDistrik || kelompokOptions.length === 0}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih Kelompok" />
          </SelectTrigger>
          <SelectContent>
            {kelompokOptions.map((kelompok) => (
              <SelectItem
                key={kelompok.id_kelompok}
                value={kelompok.id_kelompok}
              >
                {kelompok.nama_kelompok}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedRangkaian}
          onValueChange={onRangkaianChange}
          disabled={isRangkaianLoading}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih Rangkaian" />
          </SelectTrigger>
          <SelectContent>
            {isRangkaianLoading ? (
              <SelectItem value="loading" disabled>
                Memuat...
              </SelectItem>
            ) : (
              rangkaianOptions.map((rangkaian) => (
                <SelectItem key={rangkaian.ID} value={rangkaian.ID}>
                  {rangkaian.Name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      {}
      <div>
        <Button onClick={onEditClick} disabled={isEditButtonDisabled}>
          Edit Penilaian dan Pelanggaran
        </Button>
      </div>
    </div>
  );
};
