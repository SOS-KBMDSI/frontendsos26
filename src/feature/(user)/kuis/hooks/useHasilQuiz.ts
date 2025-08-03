"use client";

import { useState, useEffect } from "react";
import { QuizResult } from "@/api/services/user/quiz";

export const useQuizResult = (id_kuis: string) => {
  const [result, setResult] = useState<QuizResult | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !id_kuis) {
      setIsLoading(false);
      return;
    }

    try {
      const storedResult = localStorage.getItem(`quizResult-${id_kuis}`);
      if (storedResult) {
        setResult(JSON.parse(storedResult));
      } else {
        setError(
          "Hasil kuis tidak ditemukan. Anda mungkin belum menyelesaikan kuis ini.",
        );
      }
    } catch (e) {
      setError("Gagal memuat hasil kuis.");
      console.error("Failed to parse quiz result from localStorage:", e);
    } finally {
      setIsLoading(false);
    }
  }, [id_kuis]);

  return { result, isLoading, error };
};
