import { StaticImageData } from "next/image";

import LogoSI from "@/assets/user/logo-si.svg";
import LogoTI from "@/assets/user/logo-ti.svg";
import LogoPTI from "@/assets/user/logo-pti.svg";

export interface Prodi {
  id: string;
  nama: string;
  logo: StaticImageData;
  deskripsi: string;
  prospek: string[];
  shortName: string;
}

export const prodiData: Prodi[] = [
  {
    id: "sistem_informasi",
    nama: "Sistem Informasi",
    logo: LogoSI,
    shortName: "SI",
    deskripsi:
      "Berfokus pada peningkatan kemampuan manajerial teknologi informasi dan komunikasi serta sumber daya manusia dimana diharapkan akan menciptakan sebuah sistem yang mampu mengakomodir akan kebutuhan informasi yang berkembang pesat.",
    prospek: [
      "Database dan e-Business",
      "System Design",
      "Web Developer",
      "Entrepreneur IT Business",
      "System Analyst",
      "Database Administrator",
      "IS Project Manager",
    ],
  },
  {
    id: "teknologi_informasi",
    nama: "Teknologi Informasi",
    shortName: "TI",
    logo: LogoTI,
    deskripsi:
      "Berfokus pada pengembangan keterampilan teknis dan manajerial di bidang teknologi informasi untuk menciptakan solusi digital yang inovatif dan sesuai kebutuhan industri modern. Mengasah kemampuan dalam membangun perangkat lunak hingga mampu menghadirkan sistem yang efektif dan berdaya saing.",
    prospek: [
      "Softawre Developer",
      "Network Engineer",
      "System Analyst",
      "Database Administrator",
      "Cyber Security Analyst",
      "Cloud Computing Specialist",
      "Web Developer",
      "IT Consultant",
    ],
  },
  {
    id: "pendidikan_teknologi_informasi",
    nama: "Pendidikan Teknologi Informasi",
    shortName: "PTI",
    logo: LogoPTI,
    deskripsi:
      "Berfokus pada pengembangan keahlian dalam memanfaatkan teknologi informasi untuk mendukung proses pembelajaran yang kreatif dan inovatif. Mendorong pemanfaatan media digital, platform pembelajaran daring, serta metode pengajaran inovatif guna memperkuat transformasi pendidikan berbasis teknologi.",
    prospek: [
      "Guru TIK",
      "Instruktur Pelatihan IT",
      "Pengembang Media Pembelajaran Digital",
      "Dosen Pendidikan TI",
      "LMS Administrator",
      "Konsultan Teknologi Pendidikan",
      "IT Support Pendidikan",
      "Pengembang e-Learning",
    ],
  },
];
