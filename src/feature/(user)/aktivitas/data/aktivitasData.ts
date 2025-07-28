import { CalendarDays, FileText, Star, LucideIcon } from "lucide-react";

export interface Aktivitas {
  nama: string;
  icon: LucideIcon;
  href: string;
}

export const daftarAktivitas: Aktivitas[] = [
  {
    nama: "Presensi",
    icon: CalendarDays,
    href: "/aktivitas/presensi",
  },
  {
    nama: "Penugasan",
    icon: FileText,
    href: "/aktivitas/penugasan",
  },
  {
    nama: "Penilaian",
    icon: Star,
    href: "/aktivitas/penilaian",
  },
];
