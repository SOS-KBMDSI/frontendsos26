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
      "Web Developers",
      "Entrepreneur IT Business",
      "System Analyst",
      "Database Administrator",
      "Programmer Analyst",
      "IS Project Manager",
    ],
  },
  {
    id: "teknologi_informasi",
    nama: "Teknologi Informasi",
    shortName: "TI",
    logo: LogoTI,
    deskripsi:
      "Program Studi Teknologi Informasi berfokus pada pengembangan, implementasi, dan pengelolaan sistem teknologi berbasis komputer. Mahasiswa dibekali keterampilan dalam pemrograman, jaringan komputer, keamanan siber, serta rekayasa perangkat lunak untuk menjawab tantangan dunia digital yang terus berkembang.",
    prospek: [
      "Softawre Developer / Programmer",
      "Web Developer / Mobile App Developer",
      "Data Analyst / Data Scientist",
      "Network Engineer / Cloud Engineer",
      "System Analyst / IT Consultant",
      "Cyber Security Specialist",
      "DevOps Engineer",
    ],
  },
  {
    id: "pendidikan_teknologi_informasi",
    nama: "Pendidikan Teknologi Informasi",
    shortName: "PTI",
    logo: LogoPTI,
    deskripsi:
      "Program Studi Pendidikan Teknologi Informasi mempersiapkan lulusan yang mampu menguasai bidang teknologi informasi sekaligus memiliki kemampuan untuk mengajarkannya. Mahasiswa dilatih untuk menjadi tenaga pendidik, instruktur, atau pengembang pembelajaran di bidang TI, dengan fokus pada pemanfaatan teknologi secara efektif dan inovatif dalam proses belajar mengajar.",
    prospek: [
      "Guru atau Dosen di bidang TI",
      "Instruktur pelatihan teknologi",
      "Pengembang media dan konten pembelajaran digital",
      "Konsultan pembelajaran berbasis teknologi",
      "Edupreneur",
      "Pengembang E-learning atau Learning Management System (LMS)",
    ],
  },
];
