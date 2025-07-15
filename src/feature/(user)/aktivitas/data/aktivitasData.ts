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
    href: "/presensi",
  },
  {
    nama: "Penugasan",
    icon: FileText,
    href: "/penugasan",
  },
  {
    nama: "Penilaian",
    icon: Star,
    href: "/penilaian",
  },
];
