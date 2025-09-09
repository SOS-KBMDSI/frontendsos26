import { useState, useEffect, useCallback } from "react";
import {
  stfService,
  StfData,
  BackendResponse,
  Caketang,
} from "@/api/services/user/stf";

interface UseStfDataHook {
  stfData: StfData | null;
  caketangList: Caketang[];
  userChoice: Caketang | null;
  isLoading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

export const useGetStfData = (): UseStfDataHook => {
  const [stfData, setStfData] = useState<StfData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [caketangList, setCaketangList] = useState<Caketang[]>([]);
  const [userChoice, setUserChoice] = useState<Caketang | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response: BackendResponse<StfData> = await stfService.getStfData();
      if (response.status_code === 200) {
        setStfData(response.data);
        setCaketangList(response.data.data_ketang);
        setUserChoice(response.data.data_dipilih);
      } else {
        setError(response.message || "Failed to fetch STF data.");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat memuat data STF.";
      setError(errorMessage);
      setStfData(null);
      setCaketangList([]);
      setUserChoice(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    stfData,
    caketangList,
    userChoice,
    isLoading,
    error,
    refresh: fetchData,
  };
};
