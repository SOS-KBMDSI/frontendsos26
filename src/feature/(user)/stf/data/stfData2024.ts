import { StaticImageData } from "next/image";

import SI from "@/assets/assetsos26/stf/caketang-2025/si.webp";
import PTI from "@/assets/assetsos26/stf/caketang-2025/pti.webp";
import TI from "@/assets/assetsos26/stf/caketang-2025/ti.webp";

export interface Prodi {
  id: string;
  nama: string;
  image: StaticImageData | null;
  shortName: string;
  ketangWaketang: string;
  imageClassName?: string;
}

export const stfData2024: Prodi[] = [
  {
    id: "sistem_informasi",
    nama: "Sistem Informasi",
    image: SI,
    shortName: "SI",
    ketangWaketang: "Ildza & Claudio",
  },
  {
    id: "teknologi_informasi",
    nama: "Teknologi Informasi",
    shortName: "TI",
    image: TI,
    ketangWaketang: "Tama & Herda",
    imageClassName: "translate-y-2 md:translate-y-4",
  },
  {
    id: "pendidikan_teknologi_informasi",
    nama: "Pendidikan Teknologi Informasi",
    shortName: "PTI",
    image: PTI,
    ketangWaketang: "Wafi & Shereen",
    imageClassName: "-translate-x-4 md:-translate-x-6",
  },
];
