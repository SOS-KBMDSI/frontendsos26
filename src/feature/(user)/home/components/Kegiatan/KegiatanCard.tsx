import { FC } from "react";
import { Kegiatan } from "../../data/kegiatan";
import Image from "next/image";

interface KegiatanCardProps {
  kegiatan: Kegiatan;
}

const KegiatanCard: FC<KegiatanCardProps> = ({ kegiatan }) => {
  return (
    <article
      className="bg-secondary-200 rounded-xl  gap-4 p-6 lg:p-10 w-full  h-fit lg:min-h-[38rem] flex flex-col justify-between"
      role="article"
    >
      <Image
        className=" overflow-hidden relative w-full object-cover aspect-video max-h-72 rounded-lg bg-black "
        alt="#"
        src={kegiatan.img}
      />
      <h4 className="text-xl lg:text-2xl font-semibold text-primary-500 text-center">
        {kegiatan.title}
      </h4>
      <div className=" md:min-h-52">
        <p className="text-justify lg:text-base text-xs">
          {kegiatan.description}
        </p>
      </div>
    </article>
  );
};

export default KegiatanCard;
