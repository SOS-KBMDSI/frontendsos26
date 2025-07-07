import { apiClient, ApiResponse } from "@/api/core/AxiosInstance";

export interface PJL {
  nim: string;
  nama: string;
  line: string;
}

export interface Distrik {
  id_distrik: string;
  nama_distrik: string;
  list_pjl: PJL[];
}

export interface Kelompok {
  id_kelompok: string;
  nama_kelompok: string;
  distrik: Distrik;
}

export interface MahasiswaDetail {
  nim: string;
  nama: string;
  email: string;
  fakultas: string;
  prodi: string;
  exp: number;
  telp: string;
  line: string;
  agama: string;
  golongan_darah: string;
  riwayat_penyakit: string;
  alergi_obat: string;
  alergi_makanan: string;
  kelompok: Kelompok;
  kelamin: string;
}

interface CacheItem<T> {
  data: ApiResponse<T>;
  expiry: number;
}

class MahasiswaService {
  private static instance: MahasiswaService;
  private cache = new Map<
    string | number,
    CacheItem<MahasiswaDetail | MahasiswaDetail[]>
  >();
  private readonly cacheDuration = 5 * 60 * 1000;

  public static getInstance(): MahasiswaService {
    if (!MahasiswaService.instance) {
      MahasiswaService.instance = new MahasiswaService();
    }
    return MahasiswaService.instance;
  }

  async getAllMahasiswa(): Promise<ApiResponse<MahasiswaDetail[]>> {
    const cacheKey = "all_mahasiswa";
    const cachedItem = this.cache.get(cacheKey);

    if (cachedItem && cachedItem.expiry > Date.now()) {
      return cachedItem.data as ApiResponse<MahasiswaDetail[]>;
    }

    try {
      const response = await apiClient.get<MahasiswaDetail[]>(
        "/api/mahasiswa/search",
      );
      this.cache.set(cacheKey, {
        data: response,
        expiry: Date.now() + this.cacheDuration,
      });

      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Gagal mengambil semua data mahasiswa: ${error.message}`,
        );
      }
      throw new Error("Terjadi kesalahan yang tidak diketahui.");
    }
  }

  async getMahasiswaById(
    id: string | number,
  ): Promise<ApiResponse<MahasiswaDetail>> {
    const cachedItem = this.cache.get(id);

    if (cachedItem && cachedItem.expiry > Date.now()) {
      return cachedItem.data as ApiResponse<MahasiswaDetail>;
    }

    try {
      const response = await apiClient.get<MahasiswaDetail>(
        `/api/mahasiswa/search/${id}`,
      );
      console.log(response);
      this.cache.set(id, {
        data: response,
        expiry: Date.now() + this.cacheDuration,
      });

      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Gagal mengambil data mahasiswa by ID: ${error.message}`,
        );
      }
      throw new Error(
        "Terjadi kesalahan yang tidak diketahui saat mengambil data by ID.",
      );
    }
  }
}

export const mahasiswaService = MahasiswaService.getInstance();
