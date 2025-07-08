"use client";
import React, { useState } from "react";
import TugasContainer from "../tugas/container/TugasContainer";

const PenugasanContainer = () => {
  const [activeTab, setActiveTab] = useState<"tugas" | "quiz">("tugas");

  return (
    <div className="w-full h-screen bg-white rounded-xl p-20">
      <h4 className="text-center font-bold text-5xl text-[#383838]">
        Penugasan
      </h4>
      <section className="w-full flex justify-center mt-9">
        <div className="relative w-72 h-12 bg-white rounded-full border-2 border-primary-500 mb-6">
          <div
            className={`absolute w-1/2 h-full rounded-full bg-primary-600 transition-transform duration-300 ease-in-out`}
            style={{
              transform:
                activeTab === "tugas" ? "translateX(0%)" : "translateX(100%)",
            }}
          />
          <div className="relative mx-auto z-10 grid grid-cols-2 h-full">
            <button
              className={`w-full rounded-full text-sm font-semibold transition-colors duration-300 ${
                activeTab === "tugas" ? "text-white" : "text-red-800"
              }`}
              onClick={() => setActiveTab("tugas")}
            >
              Tugas
            </button>
            <button
              className={`w-full rounded-full text-sm font-semibold transition-colors duration-300 ${
                activeTab === "quiz" ? "text-white" : "text-red-800"
              }`}
              onClick={() => setActiveTab("quiz")}
            >
              Kuis
            </button>
          </div>
        </div>
      </section>

      <div className="w-full">
        {activeTab === "tugas" ? <TugasContainer /> : <div>Quiz</div>}
      </div>
    </div>
  );
};

export default PenugasanContainer;
