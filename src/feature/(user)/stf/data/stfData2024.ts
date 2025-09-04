import { StaticImageData } from "next/image";

import Dummy from "@/assets/stf/dummy.png";

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
    image: Dummy,
    shortName: "SI",
    ketangWaketang: "Steven & Kalingga",
  },
  {
    id: "teknologi_informasi",
    nama: "Teknologi Informasi",
    shortName: "TI",
    image: Dummy,
    ketangWaketang: "Mark & Pricilla",
  },
  {
    id: "pendidikan_teknologi_informasi",
    nama: "Pendidikan Teknologi Informasi",
    shortName: "PTI",
    image: Dummy,
    ketangWaketang: "Jack & Cathy",
  },
];
