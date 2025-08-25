"use client";
import React from "react";
import PetaBg from "@/assets/peta/peta-bg.svg";
import { useGetCountdown } from "../hooks/useGetCountDown";

const PetaCountDown = () => {
  const { eventName, timeLeft, isLoading, error } = useGetCountdown();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-xl text-primary-500">Loading countdown...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <p className="text-xl text-red-500">Error loading events: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-10/12 md:w-1/2 mx-auto">
      <div
        className="text-default-dark drop-shadow h-64 md:h-[100%]"
        style={{
          borderStyle: "solid",
          borderWidth: "40px",
          borderImageSource: `url(${PetaBg.src})`,
          borderImageSlice: "45 fill",
          borderImageRepeat: "stretch",
        }}
      >
        <div className="w-full flex flex-col items-center gap-2 md:gap-6">
          <div className="text-primary-500 font-semibold text-center text-base md:text-4xl">
            <h3>
              Synergy of Symphony <br />
              <span className="text-xl md:text-4xl font-semibold text-primary-500 px-4 md:py-2 rounded-lg inline-block">
                {eventName}
              </span>
            </h3>
          </div>
          <div className="w-full flex flex-col gap-4 md:gap-22">
            <p className="text-default-dark text-center w-11/12 mx-auto md:w-lg text-sm md:text-2xl drop-shadow-lg">
              Hitung mundur menuju petualangan seru selanjutnya!
            </p>
            <div className="flex justify-center items-center gap-1 md:gap-12">
              <div className="flex flex-col gap-3 md:gap-6 items-center justify-center min-w-[50px] md:min-w-[90px]">
                <p className="text-2xl md:text-6xl font-semibold text-primary-500">
                  {String(timeLeft.days).padStart(2, "0")}
                </p>
                <span className="text-base md:text-2xl text-default-dark font-medium">
                  Hari
                </span>
              </div>
              <div className="flex flex-col gap-3 md:gap-6 items-center justify-center min-w-[50px] md:min-w-[90px]">
                <p className="text-2xl md:text-6xl font-semibold text-primary-500">
                  {String(timeLeft.hours).padStart(2, "0")}
                </p>
                <span className="text-base md:text-2xl text-default-dark font-medium">
                  Jam
                </span>
              </div>
              <div className="flex flex-col gap-3 md:gap-6 items-center justify-center min-w-[50px] md:min-w-[90px]">
                <p className="text-2xl md:text-6xl font-semibold text-primary-500">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </p>
                <span className="text-base md:text-2xl text-default-dark font-medium">
                  Menit
                </span>
              </div>
              <div className="flex flex-col gap-3 md:gap-6 items-center justify-center min-w-[50px] md:min-w-[90px]">
                <p className="text-2xl md:text-6xl font-semibold text-primary-500">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </p>
                <span className="text-base md:text-2xl text-default-dark font-medium">
                  Detik
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetaCountDown;
