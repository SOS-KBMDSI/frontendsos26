import Link from "next/link";
import { useGetAllKuis } from "../hooks/useGetAllQuiz";
import { QuizCard } from "../components/QuizCard";

const QuizContainer = () => {
  const { data: quiz, isLoading } = useGetAllKuis();

  if (isLoading) {
    return <div>loading</div>;
  }
  if (!quiz) {
    return <div>Data Tugas Kosong</div>;
  }
  return (
    <section className="">
      <div className="flex justify-end">
        {/* <Button variant={"outline"} onClick={() => setIsModalOpen(true)}>
          Tambah Penugasan
        </Button> */}
      </div>
      <div className="mt-8 flex gap-9 flex-col">
        {quiz.map((quiz, idx) => (
          <Link
            href={`/admin/penugasan/kuis/${quiz.id_kuis}`}
            key={quiz.id_kuis}
          >
            <QuizCard quiz={quiz} idx={idx} />
          </Link>
        ))}
      </div>
    </section>
  );
};

export default QuizContainer;
