"use client";

import React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/shared/components/ui/Button";
import { QuizResultView } from "../components/QuizResultView";
import { useGetDetailQuiz } from "../hooks/useGetQuiz";

const QuizResultContainer = ({ id_kuis }: { id_kuis: string }) => {
  const { data: result, isLoading, error } = useGetDetailQuiz(id_kuis);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin text-primary-500" size={48} />
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <p className="text-red-500 mb-4">
          {error || "Hasil tidak dapat ditemukan."}
        </p>
        <Button onClick={() => (window.location.href = "/aktivitas/kuis")}>
          Kembali ke Halaman Kuis
        </Button>
      </div>
    );
  }

  return <QuizResultView quiz={result} />;
};

export default QuizResultContainer;
