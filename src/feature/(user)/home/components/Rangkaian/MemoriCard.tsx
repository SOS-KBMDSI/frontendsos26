import React from "react";
import { Memori } from "../../data/memori";

interface MemoriCardProps {
  memori: Memori;
  isActive: boolean;
}

const MemoriCard = ({ memori, isActive }: MemoriCardProps) => {
  return (
    <div>
      <div
        className={`w-full relative bg-secondary-200 text-center aspect-square group rounded-[4rem] p-2 font-semibold text-xl md:text-3xl text-primary-600 flex items-center justify-center z-20 border-4 transition-all duration-300 ${
          isActive
            ? "md:border-14 border-10 border-primary-500"
            : "border-primary-500"
        }`}
      >
        <p>{memori.content.toString()}</p>
      </div>
      <div
        className={`w-full h-[10rem] rounded-[4rem]  relative z-10 -mt-28 bg-primary-500 transition-all duration-300 ${
          isActive ? "block" : "hidden"
        }`}
      >
        <div className=" text-white  font-medium pb-4 text-base px-2 lg:text-lg  flex w-full h-full items-end justify-center">
          {memori.title}
        </div>
      </div>
    </div>
  );
};

export default MemoriCard;
