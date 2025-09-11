import { apiClient } from "@/api/core/AxiosInstance";
import {
  BackendResponse,
  PaginatedData,
  Rangkaian,
  Distrik,
  Maba,
  RekapPenilaianItem,
  DetailPenilaianMaba,
  PayloadPelanggaran,
  PayloadKeaktifan,
  PenilaianUpdatePayload,
} from "@/feature/(admin)/penilaian-pelanggaran/types";

class PenilaianService {
  private static instance: PenilaianService;

  public static getInstance(): PenilaianService {
    if (!PenilaianService.instance) {
      PenilaianService.instance = new PenilaianService();
    }
    return PenilaianService.instance;
  }

  async getRangkaian(): Promise<BackendResponse<Rangkaian[]>> {
    const response = await apiClient.get("/api/rangkaian/");
    return response as unknown as BackendResponse<Rangkaian[]>;
  }

  async getRekapPenilaian(
    id_rangkaian: string,
  ): Promise<BackendResponse<RekapPenilaianItem[]>> {
    const response = await apiClient.get(
      `/api/penilaian/rekap/${id_rangkaian}`,
    );
    return response as unknown as BackendResponse<RekapPenilaianItem[]>;
  }

  async getDetailPenilaianMaba(
    nim: string,
    id_rangkaian: string,
  ): Promise<DetailPenilaianMaba> {
    const response = await apiClient.get(
      `/api/penilaian/${nim}/rangkaian/${id_rangkaian}`,
    );
    return response as unknown as DetailPenilaianMaba;
  }

  async postPelanggaran(
    data: PayloadPelanggaran,
  ): Promise<BackendResponse<null>> {
    const response = await apiClient.post("/api/penilaian/pelanggaran", data);
    return response as unknown as BackendResponse<null>;
  }

  async postKeaktifan(
    nim: string,
    id_rangkaian: string,
    data: PayloadKeaktifan,
  ): Promise<BackendResponse<null>> {
    const response = await apiClient.post(
      `/api/penilaian/${id_rangkaian}/keaktifan?nim=${nim}`,
      data,
    );
    return response as unknown as BackendResponse<null>;
  }

  async getDistrik(): Promise<BackendResponse<Distrik[]>> {
    const response = await apiClient.get("/api/distrik/");
    return response as unknown as BackendResponse<Distrik[]>;
  }

  async getMabaByFilter(
    distrikId: string,
    kelompokId?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<BackendResponse<PaginatedData<Maba>>> {
    if (!distrikId) {
      return Promise.resolve({
        status_code: 200,
        message: "OK",
        data: {
          pagination: { page: 1, limit: 10, total_record: 0, total_pages: 0 },
          records: [],
        },
      });
    }

    const params = new URLSearchParams();
    if (kelompokId) {
      params.append("id_kelompok", kelompokId);
    }
    params.append("page", page.toString());
    params.append("limit", limit.toString());

    const url = `/api/distrik/${distrikId}/maba?${params.toString()}`;

    const response = await apiClient.get(url);
    return response as unknown as BackendResponse<PaginatedData<Maba>>;
  }

  async updatePenilaian(
    nim: string,
    id_rangkaian: string,
    data: PenilaianUpdatePayload,
  ): Promise<BackendResponse<null>> {
    const url = `/api/penilaian/${nim}/rangkaian/${id_rangkaian}`;
    const response = await apiClient.put(url, data);
    return response as unknown as BackendResponse<null>;
  }
}

export const penilaianService = PenilaianService.getInstance();
