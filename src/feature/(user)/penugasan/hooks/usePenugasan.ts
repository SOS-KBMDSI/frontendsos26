"use client";

import { useState } from "react";
import { mahasiswaService } from "@/api/services/user/maba";
import { penugasanService } from "@/api/services/user/penugasan";
import { useQuery } from "@tanstack/react-query";

export const usePenugasan = () => {
  const [activeTab, setActiveTab] = useState<"tugas" | "kuis">("tugas");
  const { data: profile } = useQuery({
    queryKey: ["mahasiswaProfile"],
    queryFn: () => mahasiswaService.getMyProfile().then((res) => res.data),
  });

  const { data: level } = useQuery({
    queryKey: ["mahasiswaLevel"],
    queryFn: () => mahasiswaService.getMyLevel().then((res) => res.data),
  });

  const { data: kuis } = useQuery({
    queryKey: ["kuisList"],
    queryFn: () => penugasanService.getAllKuis().then((res) => res.data),
  });

  const { data: rangkaian, isSuccess: isRangkaianSuccess } = useQuery({
    queryKey: ["rangkaianList"],
    queryFn: () => penugasanService.getAllRangkaian().then((res) => res.data),
  });

  const { data: tugas, isLoading: isTugasLoading } = useQuery({
    queryKey: ["tugasListWithStatus", rangkaian?.[0]?.ID],
    queryFn: async () => {
      if (!rangkaian || rangkaian.length === 0) return [];

      const firstRangkaianId = rangkaian[0].ID;
      const tugasRes =
        await penugasanService.getTugasByRangkaian(firstRangkaianId);
      const tugasList = tugasRes.data || [];

      const tugasWithStatusPromises = tugasList.map(async (tugasItem) => {
        try {
          const detailRes = await penugasanService.getTugasDetailWithStatus(
            tugasItem.id_penugasan,
          );
          return { ...tugasItem, status: detailRes.data.status };
        } catch (e) {
          console.error(
            `Gagal fetch status untuk tugas ${tugasItem.id_penugasan}:`,
            e,
          );
          return { ...tugasItem, status: "Belum Selesai" };
        }
      });

      return Promise.all(tugasWithStatusPromises);
    },
    enabled: isRangkaianSuccess && !!rangkaian && rangkaian.length > 0,
  });

  return {
    profile: profile || null,
    level: level || null,
    tugas: tugas || [],
    kuis: kuis || [],
    rangkaian: rangkaian || [],
    isLoading: isTugasLoading,
    activeTab,
    setActiveTab,
  };
};
