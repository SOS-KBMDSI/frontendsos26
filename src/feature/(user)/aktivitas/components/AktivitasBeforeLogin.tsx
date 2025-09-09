import React from "react";
import Kapal from "@/assets/user/kapal.svg";
import Maskot from "@/assets/user/maskot-sos-basic.svg";
import Image from "next/image";
import { Button } from "@/shared/components/ui/Button";
import Link from "next/link";
const AktivitasBeforeLogin = () => {
  return (
    <div className="mycontainer w-full  overflow-hidden lg:min-h-screen relative flex items-start lg:items-center py-24">
      <div className="flex lg:-mt-20  justify-center flex-col-reverse w-full lg:flex-row items-center gap-10  ">
        <Image
          src={Maskot}
          alt="Maskot"
          className="w-[18rem] z-20 relative md:w-[25rem] lg:w-[25rem] 2xl:w-[30rem] h-auto"
        />
        <div className="lg:bg-secondary-100  lg:border z-20 flex lg:w-[35rem] flex-col items-center lg:border-secondary-700 lg:shadow-xl rounded-2xl lg:p-10 h-fit ">
          <h4 className="text-4xl text-center font-semibold text-primary-500">
            Halo, Maba DSI!
          </h4>
          <span className="text-black text-base lg:text-xl text-center mt-6">
            Yuk, masuk dulu biar bisa akses semua hal seru yang udah disiapin
            buat kamu!
          </span>
          <div className="lg:w-full mt-10">
            <Link href="/login">
              <Button className="w-full px-10">Masuk</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute hidden md:block top-1/2 right-0  transform -translate-y-1/2">
        <Image src={Kapal} alt="Kapal" className="w-full h-auto" />
      </div>
    </div>
  );
};

export default AktivitasBeforeLogin;
