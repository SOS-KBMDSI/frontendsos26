import { apiClient, ApiResponse, BlobResponse } from "@/api/core/AxiosInstance";

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

  async downloadDashboardExcel(): Promise<BlobResponse> {
    try {
      const response = await apiClient.getBlob("/api/dashboard/excel");

      if (!(response.data instanceof Blob)) {
        console.error(
          "Invalid response format: Expected a Blob but received",
          typeof response.data,
        );
        throw new Error("The server response was not a valid file.");
      }

      return response;
    } catch (err: unknown) {
      console.error("Download dashboard excel error:", err);
      if (err instanceof Error) {
        throw new Error(`Download failed: ${err.message}`);
      }
      throw new Error("An unknown error occurred while downloading the file.");
    }
  }

  async downloadDashboardExcelFallback(): Promise<Blob> {
    try {
      const response = await apiClient.get<Blob>("/api/dashboard/excel", {
        responseType: "blob",
        headers: {
          Accept:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        },
      });

      if (!(response.data instanceof Blob)) {
        console.error(
          "Invalid response format: Expected a Blob but received",
          typeof response.data,
        );
        throw new Error("The server response was not a valid file.");
      }

      if (response.data.size === 0) {
        throw new Error("Empty file received from server");
      }

      return response.data;
    } catch (error) {
      console.error("Download dashboard excel error:", error);
      if (error instanceof Error) {
        throw new Error(`Failed to download dashboard Excel: ${error.message}`);
      }
      throw new Error(
        "An unknown error occurred while downloading dashboard Excel.",
      );
    }
  }

  downloadExcelFile(blob: Blob, filename = "dashboard_data.xlsx"): void {
    try {
      if (!(blob instanceof Blob)) {
        throw new Error("Invalid blob data received");
      }

      if (blob.size === 0) {
        throw new Error("Empty file received from server");
      }

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      console.error("Error downloading file:", error);
      throw new Error(
        `Failed to download file: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      );
    }
  }

  async downloadAndSaveDashboardExcel(
    filename = "dashboard_data.xlsx",
  ): Promise<void> {
    try {
      try {
        const blobResponse = await this.downloadDashboardExcel();
        this.downloadExcelFile(blobResponse.data, filename);
        return;
      } catch (primaryError) {
        console.warn(
          "Primary download method failed, trying fallback:",
          primaryError,
        );

        const blob = await this.downloadDashboardExcelFallback();
        this.downloadExcelFile(blob, filename);
      }
    } catch (error) {
      console.error("All download methods failed:", error);
      throw error;
    }
  }
}

export const dashboardService = DashboardService.getInstance();
