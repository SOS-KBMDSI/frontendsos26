import { useState, useEffect, useCallback, useMemo } from "react";
import {
  presensiService,
  PresensiDetailData,
  PresensiMahasiswaDetail,
  Pagination,
  PresensiMahasiswaListFilters,
} from "@/api/services/admin/presensi";
import { ApiResponse } from "@/api/core/AxiosInstance";

export interface ReactTableState {
  globalFilter: string;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
}

export const usePresensiDetailPage = (
  kodeId: string,
  tableState: ReactTableState,
  selectedDistrik: string | null,
  selectedKelompok: string | null,
) => {
  const [presensiInfo, setPresensiInfo] = useState<
    PresensiDetailData["presensi_info"] | null
  >(null);
  const [isLoadingInfo, setIsLoadingInfo] = useState<boolean>(true);
  const [errorInfo, setErrorInfo] = useState<string | null>(null);

  const [mahasiswaList, setMahasiswaList] = useState<
    PresensiMahasiswaDetail[] | null
  >(null);
  const [mahasiswaPagination, setMahasiswaPagination] =
    useState<Pagination | null>(null);
  const [isLoadingList, setIsLoadingList] = useState<boolean>(true);
  const [errorList, setErrorList] = useState<string | null>(null);

  const mahasiswaListFilters: PresensiMahasiswaListFilters = useMemo(() => {
    return {
      nama: tableState.globalFilter || undefined,
      page: tableState.pagination.pageIndex + 1,
      pageSize: tableState.pagination.pageSize,
      distrik: selectedDistrik,
      kelompok: selectedKelompok,
    };
  }, [
    tableState.globalFilter,
    tableState.pagination.pageIndex,
    tableState.pagination.pageSize,
    selectedDistrik,
    selectedKelompok,
  ]);

  const fetchPresensiInfo = useCallback(async () => {
    if (!kodeId) {
      setErrorInfo("Presensi Kode ID is required for info.");
      setIsLoadingInfo(false);
      return;
    }
    setIsLoadingInfo(true);
    setErrorInfo(null);
    try {
      const response: ApiResponse<PresensiDetailData> =
        await presensiService.getPresensiDetail(kodeId);
      if (response.success && response.data) {
        setPresensiInfo(response.data.presensi_info);
      } else {
        setErrorInfo(response.message || "Failed to load presensi info.");
        setPresensiInfo(null);
      }
    } catch (err: unknown) {
      const apiError = err as ApiResponse<null>;
      setErrorInfo(
        apiError?.message || "An unexpected error occurred fetching info.",
      );
      setPresensiInfo(null);
      console.error("Error in fetchPresensiInfo:", err);
    } finally {
      setIsLoadingInfo(false);
    }
  }, [kodeId]);

  const fetchMahasiswaList = useCallback(async () => {
    if (!kodeId) {
      setErrorList("Presensi Kode ID is required for student list.");
      setIsLoadingList(false);
      return;
    }
    setIsLoadingList(true);
    setErrorList(null);
    try {
      const response: ApiResponse<{
        mahasiswa_list: PresensiMahasiswaDetail[];
        pagination: Pagination;
      }> = await presensiService.getPresensiMahasiswaList(
        kodeId,
        mahasiswaListFilters,
      );

      if (response.success && response.data) {
        setMahasiswaList(response.data.mahasiswa_list);
        setMahasiswaPagination(response.data.pagination);
      } else {
        setErrorList(response.message || "Failed to load student list.");
        setMahasiswaList(null);
        setMahasiswaPagination(null);
      }
    } catch (err: unknown) {
      const apiError = err as ApiResponse<null>;
      setErrorList(
        apiError?.message || "An unexpected error occurred fetching list.",
      );
      setMahasiswaList(null);
      setMahasiswaPagination(null);
      console.error("Error in fetchMahasiswaList:", err);
    } finally {
      setIsLoadingList(false);
    }
  }, [kodeId, mahasiswaListFilters]);

  useEffect(() => {
    fetchPresensiInfo();
  }, [fetchPresensiInfo]);

  useEffect(() => {
    fetchMahasiswaList();
  }, [fetchMahasiswaList]);

  return {
    presensiInfo,
    mahasiswaList,
    mahasiswaPagination,
    isLoadingInfo,
    isLoadingList,
    errorInfo,
    errorList,
    refreshAll: useCallback(() => {
      fetchPresensiInfo();
      fetchMahasiswaList();
    }, [fetchPresensiInfo, fetchMahasiswaList]),
    refreshInfo: fetchPresensiInfo,
    refreshList: fetchMahasiswaList,
  };
};
