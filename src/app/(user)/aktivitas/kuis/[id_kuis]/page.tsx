"use client";
import QuizContainer from "@/feature/(user)/kuis/container/QuizContainer";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const id_quiz = params.id_kuis as string;
  return <QuizContainer id_kuis={id_quiz} />;
};

export default Page;
