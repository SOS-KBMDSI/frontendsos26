import { apiClient } from "@/api/core/AxiosInstance";
import {
  BackendResponse,
  Rangkaian,
  Kuis,
  Tugas,
  PaginatedSubmission,
  KuisDetail,
} from "@/feature/(user)/penugasan/types";

class PenugasanService {
  private static instance: PenugasanService;

  public static getInstance(): PenugasanService {
    if (!PenugasanService.instance) {
      PenugasanService.instance = new PenugasanService();
    }
    return PenugasanService.instance;
  }

  async getAllRangkaian(): Promise<BackendResponse<Rangkaian[]>> {
    const response = await apiClient.get("/api/rangkaian/");
    return response as unknown as BackendResponse<Rangkaian[]>;
  }

  // Mengambil daftar semua kuis
  async getAllKuis(): Promise<BackendResponse<Kuis[]>> {
    const response = await apiClient.get("/api/kuis/");
    return response as unknown as BackendResponse<Kuis[]>;
  }

  // FUNGSI BARU: Mengambil detail dan status untuk satu kuis
  async getKuisDetail(id_kuis: string): Promise<BackendResponse<KuisDetail>> {
    const response = await apiClient.get(`/api/kuis/${id_kuis}`);
    return response as unknown as BackendResponse<KuisDetail>;
  }

  async getAllTugas(): Promise<BackendResponse<Tugas[]>> {
    const response = await apiClient.get("/api/penugasan/");
    return response as unknown as BackendResponse<Tugas[]>;
  }

  // FUNGSI BARU: Mengambil data submission untuk satu tugas
  async getTugasSubmission(
    id_tugas: string,
  ): Promise<BackendResponse<PaginatedSubmission>> {
    const response = await apiClient.get(`/api/submission/${id_tugas}`);
    return response as unknown as BackendResponse<PaginatedSubmission>;
  }
}

export const penugasanService = PenugasanService.getInstance();
