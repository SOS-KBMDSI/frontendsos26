import Link from "next/link";
import QuizStatusSection from "../components/QuizStatusSection";
import { useGetDetailQuiz } from "../hooks/useGetQuiz";
import { ChevronLeft } from "lucide-react";

const QuizContainer = ({ id_kuis }: { id_kuis: string }) => {
  const { data: detailQuiz } = useGetDetailQuiz(id_kuis);
  return (
    <main className="min-h-screen bg-login py-10">
      <section className="mycontainer">
        <Link
          href="/aktivitas/penugasan"
          className="self-start flex items-center mb-5 gap-1 text-default-dark font-semibold text-lg md:text-xl"
        >
          <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
          Kembali
        </Link>
        <QuizStatusSection Quiz={detailQuiz} />
      </section>
    </main>
  );
};

export default QuizContainer;
