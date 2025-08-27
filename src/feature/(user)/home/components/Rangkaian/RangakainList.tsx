"use client";
import { useState, useEffect } from "react";
import Elips from "@/assets/home/ellips.svg";
import Image from "next/image";
import { rangkaianData } from "../../data/rangkaian";
import PolaroidCard from "./PolaroidCard";
import { Button } from "@/shared/components/ui/Button";

const RangakainList = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === rangkaianData.length - 1 ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? rangkaianData.length - 1 : prev - 1,
    );
  };

  return (
    <section className="relative  min-h-[100vh]  overflow-hidden">
      <div className="absolute -top-[70vh] inset-0 flex justify-center items-center">
        <Image
          className="w-[100vw] h-auto max-w-none object-cover"
          src={Elips}
          alt="elips"
          priority
        />
      </div>

      {isDesktop ? (
        <div className="relative z-10  lg:flex gap-[30vh] -mt-4 justify-center items-center min-h-[100vh]">
          {rangkaianData.map((rangkaian) => (
            <PolaroidCard
              rotation={rangkaian.id === 1 ? 10 : rangkaian.id === 2 ? -10 : 0}
              key={rangkaian.id}
              rangkaian={rangkaian}
            />
          ))}
        </div>
      ) : (
        <div className="relative z-10  flex flex-col justify-center items-center min-h-[100vh] ">
          <div className="relative w-full max-w-md mb-8 overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {rangkaianData.map((rangkaian) => (
                <div key={rangkaian.id} className="w-full  flex-shrink-0">
                  <PolaroidCard rotation={0} rangkaian={rangkaian} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between  content-container  items-center w-full max-w-sm mb-6">
            <Button
              arrow="left"
              variant="outline"
              onClick={prevSlide}
              className=""
            />

            <Button
              arrow="right"
              variant="outline"
              onClick={nextSlide}
              className=""
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default RangakainList;
