import { apiClient } from "@/api/core/AxiosInstance";

export interface RekapPresensi {
  rangkaian: string;
  sesi: string;
  waktu: string;
  tanggal: string;
}

export type PresensiRekapData = RekapPresensi[];

export interface BackendResponse<T> {
  status_code: number;
  message: string;
  data: T;
}

class PresensiService {
  private static instance: PresensiService;
  private cache = new Map<
    string,
    { data: BackendResponse<PresensiRekapData>; expiry: number }
  >();
  private readonly cacheDuration = 10 * 60 * 1000;

  public static getInstance(): PresensiService {
    if (!PresensiService.instance) {
      PresensiService.instance = new PresensiService();
    }
    return PresensiService.instance;
  }

  async getRekapPresensi(): Promise<BackendResponse<PresensiRekapData>> {
    const cacheKey = "rekap_presensi";
    const cachedItem = this.cache.get(cacheKey);

    console.log(cachedItem);

    if (cachedItem && cachedItem.expiry > Date.now()) {
      return cachedItem.data;
    }

    const response = await apiClient.get("/api/presensi/rekapmahasiswa");
    const responseData =
      response as unknown as BackendResponse<PresensiRekapData>;

    this.cache.set(cacheKey, {
      data: responseData,
      expiry: Date.now() + this.cacheDuration,
    });

    return responseData;
  }

  async submitPresensi(kode: string): Promise<BackendResponse<null>> {
    const response = await apiClient.post("/api/presensi/submit", {
      kode: kode,
    });
    const responseData = response as unknown as BackendResponse<null>;

    if (responseData.status_code === 200) {
      this.cache.delete("rekap_presensi");
    }

    return responseData;
  }
}

export const presensiService = PresensiService.getInstance();
