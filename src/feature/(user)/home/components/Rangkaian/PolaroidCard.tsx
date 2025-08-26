import React from "react";
import { Rangkaian } from "../../data/rangkaian";
import Image from "next/image";
import { Button } from "@/shared/components/ui/Button";

const PolaroidCard = ({
  rotation = 0,
  className = "",
  rangkaian,
}: {
  rangkaian: Rangkaian;
  rotation?: number;
  className?: string;
}) => {
  return (
    <div
      className={`
        flex flex-col items-center 
        cursor-pointer
        transition-all duration-500 ease-out
        hover:scale-110 hover:-translate-y-[2vh]
        hover:rotate-0
        animate-in fade-in slide-in-from-bottom-8
        ${rotation > 0 ? "rotate-12" : rotation < 0 ? "-rotate-12" : ""} 
        ${className}
      `}
      style={{
        animationDelay: `${Math.random() * 300}ms`,
      }}
    >
      <div className="w-[5vh] h-[6vh] z-20 bg-primary-500 flex items-start pt-[1vh] justify-center transition-all duration-300 hover:bg-primary-600">
        <div className="aspect-square w-[1.5vh] rounded-full bg-white transition-all duration-300 hover:scale-110 hover:bg-yellow-100"></div>
      </div>

      <div
        className="w-[38vh] -mt-[2vh] shadow-lg rounded-xl h-fit bg-white p-[2.5vh] 
                    transition-all duration-500 ease-out
                    hover:shadow-2xl hover:shadow-primary-200/50
                    group"
      >
        <h4
          className="text-center text-[2.2vh] text-primary-600 font-medium mt-[1vh]
                     transition-colors duration-300 group-hover:text-primary-700"
        >
          {rangkaian.title}
        </h4>

        <div className="relative overflow-hidden rounded-xl mt-[1vh]">
          <Image
            src={rangkaian.img}
            alt={rangkaian.title}
            className="w-full h-[16vh] object-cover rounded-xl 
                     transition-all duration-700 ease-out
                     group-hover:scale-110 group-hover:brightness-110"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-primary-500/20 to-transparent 
                         opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          ></div>
        </div>

        <p
          className="text-[1.8vh] mt-[2vh] text-justify leading-[2.5vh]
                    transition-all duration-300 
                    group-hover:text-gray-700"
        >
          {rangkaian.description}
        </p>

        <Button
          variant={"outline"}
          className="mt-[2vh] w-full h-[5vh] text-[1.8vh]
                   transition-all duration-300 ease-out
                   hover:bg-primary-500 hover:text-white hover:border-primary-500
                   hover:shadow-lg hover:shadow-primary-200/50
                   transform hover:scale-105 active:scale-95"
        >
          <span className="transition-transform duration-300 group-hover:translate-x-[0.5vh]">
            Lihat Selengkapnya
          </span>
          <span className="inline-block ml-[0.5vh] transition-transform duration-300 group-hover:translate-x-[1vh] opacity-0 group-hover:opacity-100">
            →
          </span>
        </Button>
      </div>
    </div>
  );
};

export default PolaroidCard;
