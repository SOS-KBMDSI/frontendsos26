import { apiClient, ApiResponse } from "@/api/core/AxiosInstance";

export interface Presensi {
  kode_id: string;
  kode: string;
  rangkaian_nama: string;
  tanggal: string;
  status: "aktif" | "non-aktif";
}

export interface presensiInfo {
  presensi_id: string;
  rangkaian_nama: string;
  kode: string;
  sesi: string;
  start_at: string;
  end_at: string;
  status: "aktif" | "non-aktif";
}

export interface PresensiMahasiswaDetail {
  nim: string;
  nama: string;
  presensi_at: string;
  status: string;
}

export interface Pagination {
  page: number;
  limit: number;
  total_record: number;
  total_pages: number;
  from: number;
  to: number;
  next: boolean;
  previous: boolean;
}

export interface PresensiMahasiswaListFilters {
  nama?: string;
  page?: number;
  pageSize?: number;
  distrik?: string | null;
  kelompok?: string | null;
}

export interface MahasiswaListResponse {
  mahasiswa_list: PresensiMahasiswaDetail[];
  pagination: Pagination;
}

export interface PresensiDetailData {
  presensi_info: presensiInfo;
}

interface BackendResponse<T> {
  status_code: number;
  message: string;
  data: T;
}

interface CacheItem<T> {
  data: ApiResponse<T>;
  expiry: number;
}

class PresensiService {
  private static instance: PresensiService;
  private cache = new Map<
    string | number,
    CacheItem<
      Presensi | Presensi[] | PresensiDetailData | MahasiswaListResponse
    >
  >();
  private readonly cacheDuration = 5 * 60 * 1000;

  public static getInstance(): PresensiService {
    if (!PresensiService.instance) {
      PresensiService.instance = new PresensiService();
    }
    return PresensiService.instance;
  }

  async getAllPresensi(): Promise<ApiResponse<Presensi[]>> {
    const cacheKey = "all_tugas";
    const cachedItem = this.cache.get(cacheKey);

    if (cachedItem && cachedItem.expiry > Date.now()) {
      return cachedItem.data as ApiResponse<Presensi[]>;
    }

    const response = await apiClient.get("/api/presensi/");
    const responseData = response as unknown as BackendResponse<Presensi[]>;
    const apiResponse: ApiResponse<Presensi[]> = {
      success: responseData.status_code === 200,
      message: responseData.message,
      data: responseData.data,
    };
    this.cache.set(cacheKey, {
      data: apiResponse,
      expiry: Date.now() + this.cacheDuration,
    });

    return apiResponse;
  }

  async getPresensiDetail(
    kodeId: string,
  ): Promise<ApiResponse<PresensiDetailData>> {
    const cacheKey = `presensi_info_${kodeId}`;
    const cachedItem = this.cache.get(cacheKey);

    if (cachedItem && cachedItem.expiry > Date.now()) {
      return cachedItem.data as ApiResponse<PresensiDetailData>;
    }

    try {
      const response = await apiClient.get(`/api/presensi/${kodeId}`);
      const responseData =
        response as unknown as BackendResponse<PresensiDetailData>;
      const apiResponse: ApiResponse<PresensiDetailData> = {
        success: responseData.status_code === 200,
        message: responseData.message,
        data: responseData.data,
      };
      this.cache.set(cacheKey, {
        data: apiResponse,
        expiry: Date.now() + this.cacheDuration,
      });

      return apiResponse;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(
          `Gagal mengambil presensi by ID ERROR: ${error.message}`,
        );
      }
      throw new Error(
        "Terjadi kesalahan yang tidak diketahui saat mengambil data by ID.",
      );
    }
  }

  async getPresensiMahasiswaList(
    kodeId: string,
    filters?: PresensiMahasiswaListFilters,
  ): Promise<ApiResponse<MahasiswaListResponse>> {
    const params = new URLSearchParams();
    if (filters?.nama) {
      params.append("nama", filters.nama);
    }
    if (filters?.page) {
      params.append("page", String(filters.page));
    }
    if (filters?.pageSize) {
      params.append("pageSize", String(filters.pageSize));
    }
    if (filters?.distrik) {
      params.append("distrik", filters.distrik);
    }
    if (filters?.kelompok) {
      params.append("kelompok", filters.kelompok);
    }

    const queryString = params.toString();
    const apiUrl = `/api/presensi/${kodeId}${
      queryString ? `?${queryString}` : ""
    }`;

    const cacheKey = `mahasiswa_list_${kodeId}_${queryString}`;
    const cachedItem = this.cache.get(cacheKey);

    if (cachedItem && cachedItem.expiry > Date.now()) {
      return cachedItem.data as ApiResponse<MahasiswaListResponse>;
    }

    try {
      const response = await apiClient.get(apiUrl);
      const responseData = response as unknown as BackendResponse<{
        presensi_info: presensiInfo;
        mahasiswa_list: PresensiMahasiswaDetail[];
        pagination: Pagination;
      }>;

      const apiResponseData: MahasiswaListResponse = {
        mahasiswa_list: responseData.data.mahasiswa_list,
        pagination: responseData.data.pagination,
      };

      const apiResponse: ApiResponse<MahasiswaListResponse> = {
        success: responseData.status_code === 200,
        message: responseData.message,
        data: apiResponseData,
      };

      this.cache.set(cacheKey, {
        data: apiResponse,
        expiry: Date.now() + this.cacheDuration,
      });

      return apiResponse;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(
          `Gagal mengambil presensi by ID ERROR: ${error.message}`,
          `Gagal mengambil semua data presensi: ${error.message}`,
        );
      }
      throw new Error(
        "Terjadi kesalahan yang tidak diketahui saat mengambil data by ID.",
      );
    }
  }
}

export const presensiService = PresensiService.getInstance();
