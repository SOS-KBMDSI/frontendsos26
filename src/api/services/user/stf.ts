// api/services/user/stf.ts

import { apiClient } from "@/api/core/AxiosInstance";

export interface Caketang {
  id_caketang: string;
  nama: string;
  prodi: string;
  visi: string;
  misi: string;
  foto: string;
}

export interface StfData {
  pemilihan_is_active: boolean;
  waktu_pemilihan: string;
  kesempatan: boolean;
  data_ketang: Caketang[];
  data_dipilih: Caketang;
}

export interface BackendResponse<T> {
  status_code: number;
  message: string;
  data: T;
}

class StfService {
  private static instance: StfService;

  public static getInstance(): StfService {
    if (!StfService.instance) {
      StfService.instance = new StfService();
    }
    return StfService.instance;
  }

  async getStfData(): Promise<BackendResponse<StfData>> {
    const response = await apiClient.get("/api/stf/pemilihan");
    return response as unknown as BackendResponse<StfData>;
  }

  async voteForCaketang(id: string): Promise<BackendResponse<null>> {
    const response = await apiClient.post(`/api/stf/pemilihan`, {
      id_caketang: id,
    });
    return response as unknown as BackendResponse<null>;
  }
}

export const stfService = StfService.getInstance();
