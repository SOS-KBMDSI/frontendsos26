"use client";

import { useState, useEffect, useCallback } from "react";
import { stfService } from "@/api/services/admin/stf";
import { StfSummary } from "../type";

export const useStf = () => {
  const [data, setData] = useState<StfSummary[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await stfService.getAllCaketang();
      if (response && response.data) {
        setData(response.data);
      } else {
        throw new Error("Format respons API tidak sesuai.");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Terjadi kesalahan";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  return { data, isLoading, error, refresh: fetchAll };
};