import LogoSI from "@/assets/user/logo-si.svg";
import LogoTI from "@/assets/user/logo-ti.svg";
import LogoPTI from "@/assets/user/logo-pti.svg";
import { StaticImageData } from "next/image";

export interface ProdiItem {
  id: number;
  image: string | StaticImageData;
  title: string;
}

export const prodiData: ProdiItem[] = [
  {
    id: 1,
    image: LogoSI,
    title: "Sistem Informasi",
  },
  {
    id: 2,
    image: LogoTI,
    title: "Teknologi Informasi",
  },
  {
    id: 3,
    image: LogoPTI,
    title: "Pendidikan Teknologi Informasi",
  },
];
