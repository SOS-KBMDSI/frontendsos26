import { apiClient } from "@/api/core/AxiosInstance";

interface OptionFromApi {
  id_select: string;
  value: string;
}

export interface SelectOption {
  value: string;
  label: string;
}

interface BackendResponse<T> {
  status_code: number;
  message: string;
  data: T;
}
class SelectService {
  private static instance: SelectService;
  private cache = new Map<string, { data: unknown; expiry: number }>();
  private readonly cacheDuration = 10 * 60 * 1000;

  public static getInstance(): SelectService {
    if (!SelectService.instance) {
      SelectService.instance = new SelectService();
    }
    return SelectService.instance;
  }

  async getOptions(
    type: "kelompok" | "distrik" | "rangkaian" | "mahasiswa",
  ): Promise<BackendResponse<SelectOption[]>> {
    const cacheKey = `select_options_${type}`;
    const endpoint = `/api/select/${type}`;

    const cachedItem = this.cache.get(cacheKey);
    if (cachedItem && cachedItem.expiry > Date.now()) {
      return cachedItem.data as BackendResponse<SelectOption[]>;
    }

    const backendResponse = (await apiClient.get(
      endpoint,
    )) as unknown as BackendResponse<OptionFromApi[]>;

    if (!backendResponse || !backendResponse.data) {
      throw new Error(`Data tidak ditemukan untuk tipe: ${type}`);
    }

    const transformedOptions: SelectOption[] = backendResponse.data.map(
      (option) => ({
        value: option.id_select,
        label: option.value,
      }),
    );

    const transformedResponse: BackendResponse<SelectOption[]> = {
      status_code: backendResponse.status_code,
      message: backendResponse.message,
      data: transformedOptions,
    };

    this.cache.set(cacheKey, {
      data: transformedResponse,
      expiry: Date.now() + this.cacheDuration,
    });

    return transformedResponse;
  }
}

export const selectService = SelectService.getInstance();
