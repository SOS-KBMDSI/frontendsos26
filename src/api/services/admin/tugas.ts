import { apiClient } from "@/api/core/AxiosInstance";
export interface Rangkaian {
  ID: string;
  Name: string;
  Description: string;
  Start_Date: string;
  End_Date: string;
}
interface ApiSubmission {
  id: string;
  nim: string;
  assignment_id: string;
  student_name: string;
  distrik: string;
  kelompok: string;
  status: string;
  drive_link: string;
  submission_date: string;
  score: number;
}
interface Pagination {
  page: number;
  limit: number;
  total_record: number;
  total_pages: number;
  from: number;
  to: number;
  next: boolean;
  previous: boolean;
}
interface SubmissionData {
  pagination: Pagination;
  submissions: ApiSubmission[];
}

export interface TugasStatus {
  nama_mahasiswa: string;
  nim: string;
  distrik: string;
  kelompok: string;
  status: string;
  link_pengumpulan: string;
  tenggat: string;
  nilai: string | number;
  file_link: string | null;
  is_visible: boolean;
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
  async getDetailTugasById(id: string): Promise<BackendResponse<TugasSummary>> {
    const cacheKey = `tugas_status_${id}`;
    const cachedItem = this.cache.get(cacheKey);

    if (cachedItem && cachedItem.expiry > Date.now()) {
      return cachedItem.data as BackendResponse<TugasSummary>;
    }

    const response = await apiClient.get(`/api/penugasan/${id}`);
    const responseData = response as unknown as BackendResponse<TugasSummary>;
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
  async getTugasSubmission(
    id: string,
    id_kelompok?: string | null,
    id_distrik?: string | null, // 1. Tambahkan parameter id_distrik
  ): Promise<BackendResponse<TugasStatus[]>> {
    const cacheKey = `tugas_submission_${id}_kelompok_${
      id_kelompok || "all"
    }_distrik_${id_distrik || "all"}`;
    const cachedItem = this.cache.get(cacheKey);

    if (cachedItem && cachedItem.expiry > Date.now()) {
      return cachedItem.data as BackendResponse<TugasStatus[]>;
    }

    // 3. Gunakan URLSearchParams untuk membangun query string secara dinamis
    const params = new URLSearchParams();
    if (id_kelompok) {
      params.append("id_kelompok", id_kelompok);
    }
    if (id_distrik) {
      // Asumsi nama query param di API adalah "distrik"
      params.append("id_distrik", id_distrik);
    }

    const queryString = params.toString();
    let apiUrl = `/api/submission/${id}`;

    if (queryString) {
      apiUrl += `?${queryString}`;
    }

    const response = await apiClient.get(apiUrl);
    const responseData = response as unknown as BackendResponse<SubmissionData>;

    // Tidak perlu ada perubahan di bagian transformasi data
    const transformedSubmissions: TugasStatus[] =
      responseData.data.submissions.map((sub) => ({
        nama_mahasiswa: sub.student_name,
        nim: sub.nim,
        status: sub.status,
        link_pengumpulan: sub.drive_link,
        nilai: sub.score,
        tenggat: sub.submission_date,
        file_link: sub.drive_link,
        is_visible: false,
        distrik: sub.distrik,
        kelompok: sub.kelompok,
      }));

    const transformedResponse: BackendResponse<TugasStatus[]> = {
      status_code: responseData.status_code,
      message: responseData.message,
      data: transformedSubmissions,
    };

    this.cache.set(cacheKey, {
      data: transformedResponse,
      expiry: Date.now() + this.cacheDuration,
    });

    return transformedResponse;
  }
  async deleteTugas(id: string): Promise<BackendResponse<null>> {
    this.cache.delete("all_tugas");
    const response = await apiClient.delete(`/api/tugas/admin/${id}`);
    return response as unknown as BackendResponse<null>;
  }
}

export const tugasService = TugasService.getInstance();
