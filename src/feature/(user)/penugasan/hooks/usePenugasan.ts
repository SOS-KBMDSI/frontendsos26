"use client";

import { useState, useEffect, useCallback } from "react";
import { mahasiswaService } from "@/api/services/user/maba";
import { penugasanService } from "@/api/services/user/penugasan";
import {
  MahasiswaProfile,
  MahasiswaLevel,
  Tugas,
  Kuis,
  Rangkaian,
} from "../types";

export const usePenugasan = () => {
  const [profile, setProfile] = useState<MahasiswaProfile | null>(null);
  const [level, setLevel] = useState<MahasiswaLevel | null>(null);
  const [tugas, setTugas] = useState<Tugas[]>([]);
  const [kuis, setKuis] = useState<Kuis[]>([]);
  const [rangkaian, setRangkaian] = useState<Rangkaian[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"tugas" | "kuis">("tugas");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [profileRes, levelRes, kuisRes, rangkaianRes] = await Promise.all([
        mahasiswaService.getMyProfile(),
        mahasiswaService.getMyLevel(),
        penugasanService.getAllKuis(),
        penugasanService.getAllRangkaian(),
      ]);

      setProfile(profileRes.data);
      setLevel(levelRes.data);
      setKuis(kuisRes.data || []);
      setRangkaian(rangkaianRes.data || []);

      if (rangkaianRes.data && rangkaianRes.data.length > 0) {
        const firstRangkaianId = rangkaianRes.data[0].ID;
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

        const finalTugasList = await Promise.all(tugasWithStatusPromises);
        setTugas(finalTugasList);
      }
    } catch (error) {
      console.error("Gagal mengambil data halaman penugasan:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    profile,
    level,
    tugas,
    kuis,
    rangkaian,
    isLoading,
    activeTab,
    setActiveTab,
  };
};
