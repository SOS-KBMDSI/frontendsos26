import { StaticImageData } from "next/image";
import Rangkaian1 from "@/assets/home/rangkaian-1.png";
import Rangkaian2 from "@/assets/home/rangkaian-2.png";
export interface Rangkaian {
  id: number;
  title: string;
  description: string;
  img: StaticImageData;
}
export const rangkaianData = [
  {
    id: 1,
    title: "Initiating The Odyssey",
    description:
      "Berisi pengenalan Departemen Sistem Informasi, prospek karier di bidang IT, serta cara menyusun CV. Selain itu, mahasiswa juga akan dibekali dengan materi tentang work life balance dan networking agar mampu menata kehidupan pribadi sekaligus membangun relasi sejak awal. Semua ini dikemas secara interaktif melalui aktivitas yang seru.",
    img: Rangkaian1,
  },
  {
    id: 2,
    title: "Orchestrating The Voyage",
    description:
      "Pada rangkaian ini mahasiswa menampilkan hasil kerja tim melalui presentasi tugas, serta proses pengembangan diri dengan saling bertukar pendapat dalam sesi Shaping The Future untuk menentukan calon pemimpin angkatan tiap prodi.",
    img: Rangkaian2,
  },
];
