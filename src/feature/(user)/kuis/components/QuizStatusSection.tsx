import { Quiz } from "@/api/services/user/quiz";
import React from "react";
import QuizStage from "./QuizStage";
import QuizBefore from "./QuizBefore";
import { QuizResultView } from "./QuizResultView";

const QuizStatusSection = ({ Quiz }: { Quiz: Quiz | null }) => {
  const getStatusStyle = (status: string | undefined) => {
    switch (status?.toLowerCase()) {
      case "selesai":
        return "bg-green-100 text-green-800 px-3 py-2 rounded-full";
      case "belum mulai":
        return "bg-yellow-100 text-yellow-800 px-3 py-2 rounded-full";
      case "terlewat":
        return "bg-gray-400 text-white px-3 py-2 rounded-2xl";
      default:
        return "bg-gray-100 text-gray-800 px-3 py-2 rounded-full";
    }
  };
  return (
    <div className="bg-white shadow-2xl rounded-2xl mx-auto max-w-4xl w-full  lg:px-24 lg:py-22 px-8 py-8">
      <div className="flex flex-col space-y-4 lg:flex-row justify-center   lg:justify-between">
        <div className="space-y-4">
          <h4 className="text-3xl text-center lg:text-left font-semibold text-primary-600">
            {Quiz?.nama_kuis}
          </h4>
          <p className="text-center lg:text-left">
            Deadline:
            {new Date(Quiz?.tenggat_kuis || "").toLocaleString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div
          className={`${getStatusStyle(
            Quiz?.status_kuis,
          )} flex justify-center w-2/3 mx-auto lg:w-fit items-center text-sm h-fit lg:mx-0 `}
        >
          {Quiz?.status_kuis}
        </div>
      </div>
      <div>
        <QuizStage status={Quiz?.status_kuis || ""} />
      </div>
      <div className="mt-20">
        {Quiz?.status_kuis === "Selesai" ? (
          <QuizResultView id_kuis={Quiz.id_kuis} />
        ) : (
          <QuizBefore quiz={Quiz} />
        )}
      </div>
    </div>
  );
};

export default QuizStatusSection;
