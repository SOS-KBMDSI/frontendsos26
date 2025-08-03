import React from "react";

const QuizStage = ({ status }: { status: string }) => {
  const isCompleted = status.toLowerCase() === "selesai";

  const inactiveStyle = "opacity-50 bg-primary-500 text-white";
  const activeStyle = "bg-primary-500 text-white";

  const stage2Style = isCompleted ? activeStyle : inactiveStyle;

  return (
    <div className="flex justify-center mt-10 w-full">
      <div className="flex w-2/3 lg:w-1/3  items-center">
        <div className="flex flex-col items-center relative">
          <div className="bg-primary-500 aspect-square rounded-full w-14 h-14 flex items-center justify-center text-white text-xl">
            <span>1</span>
          </div>
          <p className="absolute -bottom-10 text-sm text-primary-500 w-24 text-center">
            Mulai Kuis
          </p>
        </div>

        <div className={`w-full h-[2px] bg-primary-500`}></div>

        <div className="flex flex-col items-center relative">
          <div
            className={`aspect-square rounded-full w-14 h-14 flex items-center justify-center text-xl ${stage2Style}`}
          >
            2
          </div>
          <p className="absolute text-primary-500 -bottom-10 text-sm w-24 text-center">
            lihat hasil
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizStage;
