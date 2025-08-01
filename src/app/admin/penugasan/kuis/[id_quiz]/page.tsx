"use client";
import DetailQuizContainer from "@/feature/(admin)/penugasan/quiz/detail-quiz/container/DetailQuizContainer";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const params = useParams();
  const id_quiz = params.id_quiz as string;

  return (
    <>
      <DetailQuizContainer id_quiz={id_quiz} />
    </>
  );
};

export default Page;
