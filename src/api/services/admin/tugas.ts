import { apiClient } from "@/api/core/AxiosInstance";
export interface Rangkaian {
  ID: string;
  Name: string;
  Description: string;
  Start_Date: string;
  End_Date: string;
}
export interface TugasStatus {
  nama_mahasiswa: string;
  nim: string;
  status: string;
  link_pengumpulan: string;
  nilai: number;
}

export interface TugasSummary {
  id_penugasan: string;
  id_rangkaian: string;
  judul: string;
  deskripsi: string;
  tenggat: string;
  file_link: string | null;
  is_visible: string;
  rangkaian: Rangkaian;
}

export type TugasDetail = TugasSummary;

interface BackendResponse<T> {
  status_code: number;
  message: string;
  data: T;
}

class TugasService {
  private static instance: TugasService;
  private cache = new Map<string, { data: unknown; expiry: number }>();
  private readonly cacheDuration = 5 * 60 * 1000;

  public static getInstance(): TugasService {
    if (!TugasService.instance) {
      TugasService.instance = new TugasService();
    }
    return TugasService.instance;
  }

  async getAllTugas(): Promise<BackendResponse<TugasSummary[]>> {
    const cacheKey = "all_tugas";
    const cachedItem = this.cache.get(cacheKey);

    if (cachedItem && cachedItem.expiry > Date.now()) {
      return cachedItem.data as BackendResponse<TugasSummary[]>;
    }

    const response = await apiClient.get("/api/penugasan/admin");
    const responseData = response as unknown as BackendResponse<TugasSummary[]>;
    this.cache.set(cacheKey, {
      data: responseData,
      expiry: Date.now() + this.cacheDuration,
    });

    return responseData;
  }

  async createTugas(
    id_rangkaian: string,
    data: FormData,
  ): Promise<BackendResponse<null>> {
    this.cache.delete("all_tugas");

    const response = await apiClient.post(
      `/api/penugasan/${id_rangkaian}`,
      data,
      {
        headers: { "Content-Type": "multipart/form-data" },
      },
    );
    return response as unknown as BackendResponse<null>;
  }
  async getDetailTugasById(
    id: string,
  ): Promise<BackendResponse<TugasStatus[]>> {
    const cacheKey = `tugas_status_${id}`;
    const cachedItem = this.cache.get(cacheKey);

    if (cachedItem && cachedItem.expiry > Date.now()) {
      return cachedItem.data as BackendResponse<TugasStatus[]>;
    }

    const response = await apiClient.get(`/api/penugasan/${id}/status`);
    const responseData = response as unknown as BackendResponse<TugasStatus[]>;
    this.cache.set(cacheKey, {
      data: responseData,
      expiry: Date.now() + this.cacheDuration,
    });

    return responseData;
  }
  async updateTugas(
    id: string,
    data: FormData,
  ): Promise<BackendResponse<null>> {
    this.cache.delete("all_tugas");
    const response = await apiClient.patch(`/api/tugas/admin/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response as unknown as BackendResponse<null>;
  }

  async deleteTugas(id: string): Promise<BackendResponse<null>> {
    this.cache.delete("all_tugas");
    const response = await apiClient.delete(`/api/tugas/admin/${id}`);
    return response as unknown as BackendResponse<null>;
  }
}

export const tugasService = TugasService.getInstance();
