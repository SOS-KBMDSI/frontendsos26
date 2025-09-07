// VisiMisiSection.tsx

"use client";
import GradientBackground from "@/shared/components/background/GradientBackground";
import React from "react";
import CaketangCard from "./CaketangCard";
import { Caketang } from "@/api/services/user/stf";
import Image from "next/image";
import { formatText } from "@/lib/utils";
import CaturPattern from "@/assets/user/pembatas.svg";

interface VisiMisiSectionProps {
  caketangList: Caketang[];
  isLoading: boolean;
  error: string | null;
  activeCardId: string | null;
  setActiveCardId: (id: string) => void;
}

const VisiMisiSection = ({
  caketangList,
  activeCardId,
  setActiveCardId,
}: VisiMisiSectionProps) => {
  const activeCaketang = caketangList?.find(
    (caketang: Caketang) => caketang.id_caketang === activeCardId,
  );

  return (
    <>
      <GradientBackground>
        <div className="mx-auto flex min-h-screen flex-col items-center justify-center py-32 px-4 gap-20 md:gap-32 text-default-white lg:px-8 md:px-12 xl:px-24">
          <div className="flex w-full flex-nowrap justify-center gap-4 md:gap-20">
            {caketangList?.map((caketang: Caketang) => (
              <CaketangCard
                key={caketang.id_caketang}
                data={caketang}
                isActive={caketang.id_caketang === activeCardId}
                onClick={() => setActiveCardId(caketang.id_caketang)}
              />
            ))}
          </div>

          {activeCaketang && (
            <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-10 md:gap-8">
              <div className="col-span-1 flex flex-col gap-10 order-2 md:order-1">
                <h4 className="text-default-white text-4xl text-center md:text-left font-semibold md:text-5xl md:font-bold">
                  {activeCaketang.prodi}
                </h4>
                <div className="flex flex-col gap-6">
                  <h5 className="text-2xl font-bold">Visi :</h5>
                  {activeCaketang.visi &&
                    formatText(activeCaketang.visi).map((line, index) => (
                      <p
                        key={index}
                        className="text-xl leading-8 font-normal text-justify"
                      >
                        {line}
                      </p>
                    ))}
                </div>
              </div>
              <div className="col-span-1 flex flex-col gap-10 order-1 md:order-2">
                <div className="w-full relative">
                  <div className="w-8/12 md:w-9/12 mx-auto rounded-xl">
                    <Image
                      src={activeCaketang.foto}
                      width={300}
                      height={300}
                      alt="Foto Caketang"
                      className="w-full h-96 object-cover rounded-xl"
                    />
                  </div>
                  <div className="w-8/12 px-2 min-h-24 bg-default-white rounded-2xl flex justify-center items-center absolute bottom-6 right-6">
                    <p className="text-primary-500 font-bold text-2xl">
                      {activeCaketang.nama}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-span-1 flex flex-col gap-10 order-3">
                <div className="flex flex-col gap-6">
                  <h5 className="text-2xl font-bold">Misi :</h5>
                  <div className="flex flex-col gap-2">
                    {activeCaketang.misi &&
                      formatText(activeCaketang.misi).map((line, index) => (
                        <p
                          key={index}
                          className="text-xl leading-8 font-normal text-justify"
                        >
                          {line}
                        </p>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </GradientBackground>
      <Image
        src={CaturPattern}
        alt="Pembatas"
        className="w-full h-18 object-cover md:h-auto"
        aria-hidden="true"
      />
    </>
  );
};

export default VisiMisiSection;
