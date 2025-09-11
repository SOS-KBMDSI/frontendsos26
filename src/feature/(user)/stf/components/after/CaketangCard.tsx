// components/CaketangCard.tsx

import Image from "next/image";
import React from "react";
import { Caketang } from "@/api/services/user/stf";
import { motion } from "framer-motion";

interface CaketangCardProps {
  data: Caketang;
  isActive: boolean;
  onClick: () => void;
}

const CaketangCard = ({ data, isActive, onClick }: CaketangCardProps) => {
  return (
    <>
      <motion.div
        className="hidden md:flex flex-col cursor-pointer w-full max-w-72"
        onClick={onClick}
        animate={{ scale: isActive ? 1.2 : 1 }}
        whileTap={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-full rounded-t-2xl">
          <Image
            src={data.foto}
            width={300}
            height={300}
            alt="Caketang Photo"
            className="w-full object-cover rounded-t-md h-72"
          />
        </div>
        <div
          className={`bg-default-white flex justify-center items-center py-6 px-10 rounded-b-md`}
        >
          <p className={`text-primary-500 text-2xl font-semibold`}>
            {data.nama}
          </p>
        </div>
      </motion.div>

      <motion.div
        className={`md:hidden flex-col cursor-pointer w-full max-w-36 rounded-lg border-3 ${
          isActive ? "border-secondary" : "border-transparent"
        }`}
        onClick={onClick}
        animate={{ scale: isActive ? 1 : 1 }}
        whileTap={{ scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full rounded-lg">
          <Image
            src={data.foto}
            width={300}
            height={300}
            alt="Caketang Photo"
            className="w-full object-cover rounded-lg h-42"
          />
        </div>
      </motion.div>
    </>
  );
};

export default CaketangCard;
