import Image from "next/image";
import React from "react";
import Dummy from "@/assets/stf/dummy.png";
import { Caketang } from "@/api/services/user/stf";

interface Props {
  data: Caketang;
  isActive: boolean;
  onClick: () => void;
}

const PemilihanCard = ({ isActive = false, data, onClick }: Props) => {
  return (
    <div onClick={onClick} className="w-full flex justify-center items-center">
      <div
        className={`w-full p-4 flex flex-col gap-4 ${
          isActive ? "bg-primary-500 rounded-2xl" : "bg-transparent "
        }`}
      >
        <div className="bg-primary-500 rounded-2xl">
          <Image
            src={data.foto || Dummy}
            width={300}
            height={300}
            alt="Foto Caketang"
            className="w-full h-72 md:h-80 lg:h-96 object-cover rounded-2xl border-8 border-primary-500"
          />
        </div>
        <div className="py-2">
          <p
            className={`text-2xl font-semibold ${
              isActive ? "text-default-white" : "text-primary-500"
            }`}
          >
            {data.nama}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PemilihanCard;
