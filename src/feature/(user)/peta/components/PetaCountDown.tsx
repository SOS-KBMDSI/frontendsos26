import React, { useState, useEffect } from "react";
import Image from "next/image";
import PetaBg from "@/assets/peta/peta-bg.png";
import { useGetAllRangkaian } from "../hooks/getAllRangkaian";
import { Rangkaian } from "@/api/services/admin/rangkaian";

const PetaCountDown = () => {
  const { data, error, isLoading } = useGetAllRangkaian();

  const [targetDate, setTargetDate] = useState<Date | null>(null);
  const [eventName, setEventName] = useState<string>("Loading Event...");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (data && data.length > 0) {
      const now = new Date();
      let minDiff = Infinity;
      let closestEvent: Rangkaian | null = null;

      for (const event of data) {
        const startDate = new Date(event.Start_Date);
        const diff = startDate.getTime() - now.getTime();

        if (diff > 0 && diff < minDiff) {
          minDiff = diff;
          closestEvent = event;
        }
      }

      if (closestEvent) {
        setTargetDate(new Date(closestEvent.Start_Date));
        setEventName(closestEvent.Name);
      } else {
        setTargetDate(null);
        setEventName("No Upcoming Events");
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }
  }, [data]);

  useEffect(() => {
    if (!targetDate) return;

    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      let time = { days: 0, hours: 0, minutes: 0, seconds: 0 };

      if (difference > 0) {
        time = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }
      return time;
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        clearInterval(timer);
        setEventName("Event Started!");
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

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
        <p className="text-xl text-red-500">
          Error loading events: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="relative mt-32 mb-20 md:mb-40 h-fit">
      <div className="flex justify-center items-center w-full h-full bg-cover bg-center bg-red-600">
        <Image
          src={PetaBg}
          objectFit="cover"
          quality={100}
          alt="Background Pattern"
          className="absolute top-12 w-[54rem]"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-6 p-4 mt-32">
        <div className="text-primary-500 font-semibold text-center text-base md:text-4xl">
          <h3>
            Synergy of Symphony <br />
            <span className="text-xl md:text-4xl font-semibold text-primary-500 px-4 py-2 rounded-lg inline-block">
              {eventName}
            </span>
          </h3>
        </div>
        <p className="text-default-dark text-center w-lg text-sm md:text-2xl drop-shadow-lg">
          Hitung mundur menuju petualangan seru selanjutnya!
        </p>
        <div className="flex justify-center items-center gap-4 md:gap-12 mt-5 flex-wrap">
          <div className="flex flex-col gap-3 md:gap-6 items-center justify-center min-w-[90px]">
            <p className="text-4xl md:text-6xl font-semibold text-primary-500">
              {String(timeLeft.days).padStart(2, "0")}
            </p>
            <span className="text-lg md:text-2xl text-default-dark font-medium">
              Hari
            </span>
          </div>
          <div className="flex flex-col gap-3 md:gap-6 items-center justify-center min-w-[90px]">
            <p className="text-4xl md:text-6xl font-semibold text-primary-500">
              {String(timeLeft.hours).padStart(2, "0")}
            </p>
            <span className="text-lg md:text-2xl text-default-dark font-medium">
              Jam
            </span>
          </div>
          <div className="flex flex-col gap-3 md:gap-6 items-center justify-center min-w-[90px]">
            <p className="text-4xl md:text-6xl font-semibold text-primary-500">
              {String(timeLeft.minutes).padStart(2, "0")}
            </p>
            <span className="text-lg md:text-2xl text-default-dark font-medium">
              Menit
            </span>
          </div>
          <div className="flex flex-col gap-3 md:gap-6 items-center justify-center min-w-[90px]">
            <p className="text-4xl md:text-6xl font-semibold text-primary-500">
              {String(timeLeft.seconds).padStart(2, "0")}
            </p>
            <span className="text-lg md:text-2xl text-default-dark font-medium">
              Detik
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetaCountDown;
