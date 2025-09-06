export interface PenilaianItem {
  nama_penilaian: string;
  nilai: number;
}

export interface PelanggaranItem {
  nama: string;
  kategori: "sedang" | "berat" | "ringan";
  nilai: number;
}

export interface DetailNilaiRangkaian {
  penilaian: PenilaianItem[];
  pelanggaran: PelanggaranItem[];
  keaktifan: number;
  skor_akhir: number;
  status: "lulus" | "tidak_lulus";
}

export interface BackendResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface RangkaianDetailForKegiatan {
  ID: string;
  Name: string;
  Description: string;
  Start_Date: string;
  End_Date: string;
}

export interface Kegiatan {
  id_kegiatan: string;
  nama: string;
  rangkaian: string;
  waktu_mulai: string;
  active: boolean;
  rangkaian_detail: RangkaianDetailForKegiatan;
}
