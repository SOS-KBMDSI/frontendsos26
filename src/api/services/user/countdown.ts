import { apiClient } from "@/api/core/AxiosInstance";

export interface CountdownData {
  is_active: boolean;
  tanggal: string;
  nama: string;
}

export interface BackendResponse<T> {
  status_code: number;
  message: string;
  data: T;
}

class CountdownService {
  private static instance: CountdownService;

  public static getInstance(): CountdownService {
    if (!CountdownService.instance) {
      CountdownService.instance = new CountdownService();
    }
    return CountdownService.instance;
  }

  async getCountdownData(): Promise<BackendResponse<CountdownData>> {
    const response = await apiClient.get("/api/rangkaian/countdown");
    const responseData = response as unknown as BackendResponse<CountdownData>;
    return responseData;
  }
}

export const countdownService = CountdownService.getInstance();
