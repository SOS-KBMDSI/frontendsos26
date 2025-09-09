import { apiClient } from "@/api/core/AxiosInstance";
export interface Rangkaian {
  ID: string;
  Name: string;
  Description: string;
  Start_Date: string;
  End_Date: string;
}

export type RangkaianSummary = Rangkaian;

export type RangkaianDetail = Rangkaian;
interface BackendResponse<T> {
  status_code: number;
  message: string;
  data: T;
}

class RangkaianService {
  private static instance: RangkaianService;
  private cache = new Map<string, { data: unknown; expiry: number }>();
  private readonly cacheDuration = 5 * 60 * 1000;

  public static getInstance(): RangkaianService {
    if (!RangkaianService.instance) {
      RangkaianService.instance = new RangkaianService();
    }
    return RangkaianService.instance;
  }

  async getAllRangkaian(): Promise<BackendResponse<RangkaianSummary[]>> {
    const cacheKey = "all_rangkaian";
    const cachedItem = this.cache.get(cacheKey);
    if (cachedItem && cachedItem.expiry > Date.now()) {
      return cachedItem.data as BackendResponse<RangkaianSummary[]>;
    }

    const response = await apiClient.get("/api/rangkaian/");
    const responseData = response as unknown as BackendResponse<
      RangkaianSummary[]
    >;

    this.cache.set(cacheKey, {
      data: responseData,
      expiry: Date.now() + this.cacheDuration,
    });

    return responseData;
  }
}

export const rangkaianService = RangkaianService.getInstance();
