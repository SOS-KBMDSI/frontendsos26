import Image from "next/image";
import { ProdiItem } from "../../data/prodi";

const ProdiCard = ({ prodi }: { prodi: ProdiItem }) => {
  return (
    <div className="w-full rounded-xl md:min-h-[20rem] p-5 bg-secondary-500 flex flex-col items-center justify-center">
      <Image
        className="w-32 lg:w-44 mb-6"
        width={100}
        src={prodi.image}
        alt={prodi.title}
      />
      <h5 className="font-medium  text-black min-h-16 text-xl lg:text-2xl text-center">
        {prodi.title}
      </h5>
    </div>
  );
};

export default ProdiCard;
