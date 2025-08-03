"use client";

import { useQuizResult } from "../hooks/useHasilQuiz";

export const QuizResultView = ({ id_kuis }: { id_kuis: string }) => {
  const { result, isLoading } = useQuizResult(id_kuis);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="bg-[#F5E6E9] w-full min-h-fit rounded-2xl px-8 py-6  ">
      <h4 className="font-semibold text-lg text-black">
        Kerja Bagus telah Menyelesaikan Kuis!
      </h4>

      <div className="space-y-4 mt-4">
        <p className="text-2xl font-bold text-primary-500">
          Skor: {result?.score}/100
        </p>
        <p className="text-base text-black">
          Jumlah Jawaban Benar: {result?.jawaban_benar} /{" "}
          {result?.total_pertanyaan}
        </p>
      </div>
      <p className="mt-4">
        Setiap percobaan adalah kesempatan untuk belajar. Ingin mencoba ulang
        kuis yang diberikan?
      </p>
    </div>
  );
};
