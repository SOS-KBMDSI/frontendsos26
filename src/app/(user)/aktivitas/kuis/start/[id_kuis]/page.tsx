"use client";
import QuizStartContainer from "@/feature/(user)/kuis/container/QuizStartContainer";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const id_quiz = params.id_kuis as string;
  return <QuizStartContainer id_kuis={id_quiz} />;
};

export default Page;
