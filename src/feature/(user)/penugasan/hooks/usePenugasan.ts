"use client";

import { useState, useEffect, useCallback } from "react";
import { mahasiswaService } from "@/api/services/user/maba";
import { penugasanService } from "@/api/services/user/penugasan";
import {
  MahasiswaProfile,
  MahasiswaLevel,
  Tugas,
  Kuis,
  Submission,
} from "../types";

type TugasStatus =
  | "belum tersubmit"
  | "tersubmit"
  | "terlambat"
  | "dinilai"
  | "belum_dikerjakan";

export const usePenugasan = () => {
  const [profile, setProfile] = useState<MahasiswaProfile | null>(null);
  const [level, setLevel] = useState<MahasiswaLevel | null>(null);
  const [tugas, setTugas] = useState<Tugas[]>([]);
  const [kuis, setKuis] = useState<Kuis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"tugas" | "kuis">("tugas");

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const profileRes = await mahasiswaService.getMyProfile();
      const myNim = profileRes.data.nim;

      const [levelRes, tugasRes, kuisRes] = await Promise.all([
        mahasiswaService.getMyLevel(),
        penugasanService.getAllTugas(),
        penugasanService.getAllKuis(),
      ]);

      const allTugas = tugasRes.data;
      const allKuis = kuisRes.data;

      const tugasWithStatusPromises = (allTugas || []).map(async (tugas) => {
        try {
          const submissionRes = await penugasanService.getTugasSubmission(
            tugas.id_penugasan,
          );
          const mySubmission = submissionRes.data.submissions.find(
            (sub: Submission) => sub.nim === myNim,
          );
          const status = (mySubmission?.status ||
            "belum_dikerjakan") as TugasStatus;
          return { ...tugas, Status: status };
        } catch (e) {
          // PERBAIKAN 1: Gunakan variabel 'e' untuk logging
          console.error(
            `Gagal fetch status untuk tugas ${tugas.id_penugasan}:`,
            e,
          );
          return { ...tugas, Status: "belum_dikerjakan" as TugasStatus };
        }
      });

      const kuisWithStatusPromises = (allKuis || []).map(async (kuis) => {
        try {
          const detailRes = await penugasanService.getKuisDetail(kuis.id_kuis);
          return { ...kuis, status_kuis: detailRes.data.status_kuis };
        } catch (e) {
          // PERBAIKAN 2: Gunakan variabel 'e' untuk logging
          console.error(`Gagal fetch status untuk kuis ${kuis.id_kuis}:`, e);
          return { ...kuis, status_kuis: "Belum Mulai" as const };
        }
      });

      const finalTugasList = await Promise.all(tugasWithStatusPromises);
      const finalKuisList = await Promise.all(kuisWithStatusPromises);

      setProfile(profileRes.data);
      setLevel(levelRes.data);
      setTugas(finalTugasList);
      setKuis(finalKuisList);
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
    isLoading,
    activeTab,
    setActiveTab,
  };
};
