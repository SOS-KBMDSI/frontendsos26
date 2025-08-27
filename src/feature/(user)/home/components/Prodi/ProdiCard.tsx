import Image from "next/image";
import { ProdiItem } from "../../data/prodi";
import Texture from "@/assets/user/card-texture.png";
const ProdiCard = ({ prodi }: { prodi: ProdiItem }) => {
  return (
    <div className="w-full relative rounded-xl md:min-h-[20rem] p-5 bg-secondary-500 flex flex-col items-center justify-center">
      <Image
        className="w-32 z-20 lg:w-44 mb-6"
        width={100}
        src={prodi.image}
        alt={prodi.title}
      />
      <h5 className="font-medium z-20  text-black min-h-16 text-xl lg:text-2xl text-center">
        {prodi.title}
      </h5>
      <Image
        alt="texture"
        src={Texture}
        className="absolute z-10 w-full h-full"
      />
    </div>
  );
};

export default ProdiCard;
