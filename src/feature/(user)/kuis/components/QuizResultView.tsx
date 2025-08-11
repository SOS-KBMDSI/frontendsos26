"use client";

import { Quiz } from "@/api/services/user/quiz";

export const QuizResultView = ({ quiz }: { quiz: Quiz }) => {
  return (
    <div className="bg-[#F5E6E9] w-full min-h-fit rounded-2xl px-8 py-6  ">
      <h4 className="font-semibold text-lg text-black">
        Kerja Bagus telah Menyelesaikan Kuis!
      </h4>

      <div className="space-y-4 mt-4">
        <p className="text-2xl font-bold text-primary-500">
          Skor: {quiz?.score}/100
        </p>
        <p className="text-base text-black">
          Jumlah Jawaban Benar: {quiz?.jawaban_benar} / {quiz?.total_pertanyaan}
        </p>
      </div>
      <p className="mt-4">
        Setiap percobaan adalah kesempatan untuk belajar. Ingin mencoba ulang
        kuis yang diberikan?
      </p>
    </div>
  );
};
