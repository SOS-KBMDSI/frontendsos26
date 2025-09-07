import Image from "next/image";
import MaskotPenilaian from "@/assets/user/maskot-sos-basic.svg";

export const PenilaianNonActiveView = () => {
  return (
    <div className="relative w-full h-[600px] overflow-hidden mt-20">
      <div
        className="absolute left-1/2 bottom-0 w-[150vw] h-[150vw] bg-primary-600 rounded-full z-0 
                   transform translate-y-[55%] -translate-x-1/2 
                   block md:hidden"
      />
      <div
        className="absolute left-1/2 w-[150%] h-[2000px] bg-primary-600 rounded-full z-0
                   transform translate-y-[15%] -translate-x-1/2  /* dinaikkan dari 25% */
                   hidden md:block"
      />

      <div
        className="absolute left-1/2 -translate-x-1/2 w-[320px] md:w-[450px] z-10
                      bottom-40 md:bottom-40
                      md:-ml-56"
      >
        <Image
          src={MaskotPenilaian}
          alt="Maskot Penilaian"
          width={500}
          height={500}
          priority
          className="object-contain"
        />
      </div>

      <div
        className="absolute left-1/2 -translate-x-1/2 w-fit z-20
                   bottom-[500px] md:bottom-[490px]
                   md:left-1/2 md:ml-16 md:-translate-x-0"
      >
        <div
          className="relative bg-primary-600 text-white font-semibold 
                     text-xl md:text-2xl rounded-2xl 
                     py-5 px-6 
                     text-center w-[280px] md:w-[340px]"
        >
          <p>Tunggu dulu ya nanti nilainya keluar</p>

          <div
            className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 w-0 h-0
                       border-l-[15px] border-l-transparent
                       border-r-[15px] border-r-transparent
                       border-t-[20px] border-t-primary-600
                       block md:hidden"
          />

          <div
            className="absolute left-[-12px] bottom-[-14px] w-0 h-0 
                       border-t-[5px] border-t-transparent
                       border-r-[30px] border-r-primary-600
                       border-b-[18px] border-b-transparent 
                       transform -rotate-52
                       hidden md:block"
          />
        </div>
      </div>
    </div>
  );
};
