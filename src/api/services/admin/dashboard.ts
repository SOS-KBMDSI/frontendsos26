import { apiClient, ApiResponse } from "@/api/core/AxiosInstance";

export interface DataTugas {
  nama_penugasan: string;
  deadline: string;
  terkumpul: number;
  belum_terkumpul: number;
  sudah_dinilai: number;
}

export interface DataKuis {
  nama: string;
  deadline: string;
  terkumpul: number;
  belum_terkumpul: number;
  ternilai: number;
}

export interface DataPresensi {
  rangkaian: string;
  tanggal: string;
  hadir: number;
  tidak_hadir: number;
}

export interface DashboardData {
  jumlah_maba: number;
  belum_dikumpulkan: number;
  tugas_terkumpul: number;
  terlambat: number;
  dinilai: number;
  belum_dinilai: number;
  jumlah_tugas: number;
  presensi_sekarang: number;
  presensi_total: number;
  data_tugas: DataTugas[];
  data_kuis: DataKuis[];
  data_presensi: DataPresensi[];
}

interface CacheItem<T> {
  data: ApiResponse<T>;
  expiry: number;
}

class DashboardService {
  private static instance: DashboardService;
  private cache = new Map<string, CacheItem<DashboardData>>();
  private readonly cacheDuration = 5 * 60 * 1000;

  public static getInstance(): DashboardService {
    if (!DashboardService.instance) {
      DashboardService.instance = new DashboardService();
    }
    return DashboardService.instance;
  }

  async getDashboardData(): Promise<ApiResponse<DashboardData>> {
    const cacheKey = "dashboard_data";
    const cachedItem = this.cache.get(cacheKey);

    if (cachedItem && cachedItem.expiry > Date.now()) {
      return cachedItem.data;
    }

    try {
      const response = await apiClient.get<DashboardData>("/api/dashboard/");

      this.cache.set(cacheKey, {
        data: response,
        expiry: Date.now() + this.cacheDuration,
      });

      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to fetch dashboard data: ${error.message}`);
      }
      throw new Error(
        "An unknown error occurred while fetching dashboard data.",
      );
    }
  }
}

export const dashboardService = DashboardService.getInstance();
