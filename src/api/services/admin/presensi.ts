import { apiClient, ApiResponse } from "@/api/core/AxiosInstance";

export interface RangkaianPresensi {
  ID: string;
  Name: string;
  Description: string;
  Start_Date: string;
  End_Date: string;
}

export interface Presensi {
  id: string;
  kode: string;
  rangkaian_id: string;
  sesi: string;
  rangkaian: RangkaianPresensi[];
  start_at: string;
  end_at: string;
  created_at: string;
  updated_at: string;
  PresensiMahasiswa: string | null;
}

class PresensiService {
  private static instance: PresensiService;

  public static getInstance(): PresensiService {
    if (!PresensiService.instance) {
      PresensiService.instance = new PresensiService();
    }
    return PresensiService.instance;
  }

  async getAllPresensi(): Promise<ApiResponse<Presensi[]>> {
    try {
      const response = await apiClient.get<Presensi[]>("/api/presensi");
      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Gagal mengambil semua data presensi: ${error.message}`
        );
      }
      throw new Error("Gagal mengambil semua data presensi");
    }
  }
}

export const presensiService = PresensiService.getInstance();
