"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ChevronLeft, Search } from "lucide-react";
import DateTimeDisplay from "../components/DateTimeDisplay";
import { Button } from "@/shared/components/ui/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/Select";
import { Input } from "@/shared/components/ui/Input";

const DetailPresensiContainer = () => {
  const [selectedDistric, setSelectedDistric] = useState<string>("");
  const [selectedGroup, setSelectedGroup] = useState<string>("");

  const router = useRouter();
  const districs = [
    { value: "1", label: "Distrik 1" },
    { value: "2", label: "Distrik 2" },
    { value: "3", label: "Distrik 3" },
    { value: "4", label: "Distrik 4" },
  ];
  const groups = [
    { value: "1", label: "Kelompok 1" },
    { value: "2", label: "Kelompok 2" },
    { value: "3", label: "Kelompok 3" },
    { value: "4", label: "Kelompok 4" },
  ];
  return (
    <main className="flex flex-col gap-y-16">
      <div className="flex flex-col gap-y-11">
        <button
          className="flex items-center gap-2 text-primary-500 hover:text-primary-700 transition-colors"
          onClick={() => router.back()}
          type="button"
        >
          <ChevronLeft /> Kembali
        </button>
        <div className="flex flex-col gap-y-9">
          <div className="flex flex-col text-default-dark gap-y-4">
            <h4 className="text-4xl font-normal">########</h4>
            <p>Rangkaian (1/2)</p>
          </div>
          <div className="text-default-dark flex gap-x-12 items-center">
            <div className="flex flex-col gap-y-2">
              <h6 className="text-lg font-semibold">Mulai</h6>
              <div className="flex items-center gap-x-4">
                <DateTimeDisplay variant="date" value="18-09-2025" />
                <div className="w-[1px] h-6 bg-default-dark"></div>
                <DateTimeDisplay variant="clock" value="23:59" />
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <h6 className="text-lg font-semibold">Mulai</h6>
              <div className="flex items-center gap-x-4">
                <DateTimeDisplay variant="date" value="18-09-2025" />
                <div className="w-[1px] h-6 bg-default-dark"></div>
                <DateTimeDisplay variant="clock" value="23:59" />
              </div>
            </div>
          </div>
          <Button className="w-fit">Edit Presensi</Button>
        </div>
      </div>
      <div className="w-full h-[1px] bg-surface-divider"></div>
      <div>
        <div className="flex flex-col gap-y-8">
          <h2 className="text-3xl font-medium">Daftar Presensi</h2>
          <div className="flex items-center gap-x-6">
            <div className="flex gap-x-6">
              <Select
                onValueChange={(value) => setSelectedDistric(value)}
                value={selectedDistric}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Distrik" />
                </SelectTrigger>

                <SelectContent>
                  {districs.map((distric) => (
                    <SelectItem key={distric.value} value={distric.value}>
                      {distric.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value) => setSelectedGroup(value)}
                value={selectedGroup}
              >
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Kelompok" />
                </SelectTrigger>

                <SelectContent>
                  {groups.map((group) => (
                    <SelectItem key={group.value} value={group.value}>
                      {group.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Input placeholder="Search..." leftIcon={<Search size={24} />} />
          </div>
          <Button disabled className="w-fit">
            Edit Kehadiran
          </Button>
        </div>
      </div>
    </main>
  );
};

export default DetailPresensiContainer;
