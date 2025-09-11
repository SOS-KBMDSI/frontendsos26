import { StaticImageData } from "next/image";

import SI from "@/assets/stf/caketang-2024/si.png";
import TI from "@/assets/stf/caketang-2024/ti.png";
import PTI from "@/assets/stf/caketang-2024/pti.png";

export interface Prodi {
  id: string;
  nama: string;
  image: StaticImageData;
  shortName: string;
  ketangWaketang: string;
}

export const stfData2024: Prodi[] = [
  {
    id: "sistem_informasi",
    nama: "Sistem Informasi",
    image: SI,
    shortName: "SI",
    ketangWaketang: "Afham & Pras",
  },
  {
    id: "teknologi_informasi",
    nama: "Teknologi Informasi",
    shortName: "TI",
    image: TI,
    ketangWaketang: "Luthfi & Daffa",
  },
  {
    id: "pendidikan_teknologi_informasi",
    nama: "Pendidikan Teknologi Informasi",
    shortName: "PTI",
    image: PTI,
    ketangWaketang: "Steven & Kalingga",
  },
];
