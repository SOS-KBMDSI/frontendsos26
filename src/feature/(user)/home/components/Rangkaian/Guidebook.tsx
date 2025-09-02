import { Button } from "@/shared/components/ui/Button";
import { FileDownIcon } from "lucide-react";
import MaskotSOS from "@/assets/user/maskot-sos-basic.svg";
import Image from "next/image";
const Guidebook = () => {
  return (
    <div className="content-container flex flex-col md:flex-row md:justify-center items-center">
      <div className="md:max-w-3/5 w-full h-fit rounded-xl shadow-lg overflow-hidden ">
        <div className="w-full bg-white h-3/4 space-y-2 md:px-10 px-4 py-4 md:py-7">
          <p className="text-center text-black mx-auto text-base lg:text-3xl md:w-4/5 font-bold">
            Biar Nggak Bingung, Yuk Unduh Buku Panduannya
          </p>
          <p className="text-xs text-justify lg:text-base md:text-center text-[#383023] ">
            Buku Panduan SOS & STF berisi informasi dan panduan bagi mahasiswa
            baru untuk lebih mengenal Departemen Sistem Informasi. Buku panduan
            ini berisi informasi seputar ospek, tata tertib, dan pelanggaran.
            Yuk, segera unduh Buku Panduan SOS & STF!
          </p>
        </div>
        <div className="w-full md:px-10 px-4 py-5  flex items-center justify-start h-[5rem] bg-gradient-to-b from-primary-500 rounded-xl to-primary-700">
          <Button className="md:px-10 mx-auto md:mx-0 text-sm cursor-pointer flex font-medium text-primary-500 hover:text-white items-center justify-center space-x-2 rounded-lg h-full w-full md:w-fit bg-white focus:text-white hover:border-none focus:border-none hover:bg-primary-500 transition-colors duration-300">
            <FileDownIcon className="w-4 h-4" />
            <span className="text-base">Unduh Sekarang</span>
          </Button>
        </div>
      </div>
      <Image
        className="max-w-[15rem] lg:max-w-[20rem] md:-ml-6 mt-10  scale-x-[-1]"
        alt="maskotSOS"
        src={MaskotSOS}
      />
    </div>
  );
};

export default Guidebook;
