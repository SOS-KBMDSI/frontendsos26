import Image from "next/image";
import Kapal from "@/assets/user/kapal.svg";
import Peta from "@/assets/user/peta.png";
import Jangkar from "@/assets/user/jangkar.png";
const AktivitasBackground = () => {
  return (
    <div className="w-screen h-screen absolute top-0 overflow-hidden">
      <Image
        src={Kapal}
        alt="Kapal"
        className="h-auto lg:w-1/4 w-1/2 absolute bottom-28 scale-x-[-1]"
      />
      <Image
        src={Peta}
        alt="Peta"
        className="w-72 lg:w-1/3 h-auto absolute lg:top-1/4 top-1/2 -right-10  lg:left-1/2   lg:-translate-x-1/2 -translate-y-1/2 "
      />
      <Image
        src={Jangkar}
        alt="Jangkar"
        className="w-1/2 lg:w-1/3 absolute bottom-14 lg:-bottom-34 -right-10 h-auto"
      />
    </div>
  );
};

export default AktivitasBackground;
