import Rangkaian11 from "@/assets/peta/rangkaian1-1.png";
import Rangkaian12 from "@/assets/peta/rangkaian1-2.png";
import Rangkaian21 from "@/assets/peta/rangkaian2-1.png";
import Rangkaian22 from "@/assets/peta/rangkaian2-2.png";
import PhotoWithFrame from "./PhotoWithFrame";
import Compass from "@/assets/peta/compass.svg";
import Star from "@/assets/peta/star.svg";
import Map from "@/assets/peta/map.png";
import Ship from "@/assets/peta/ship.svg";
import Image from "next/image";

const PetaContent = () => {
  return (
    <>
      <div className="flex flex-col gap-20 mt-20 md:hidden">
        <div className="w-full flex flex-col gap-20">
          <div className="w-full relative">
            <div className="w-8/12">
              <PhotoWithFrame alt="Map Image" image={Rangkaian11} />
            </div>

            <div className="absolute inset-0 mt-16 ml-12 w-full h-full">
              <div className="w-8/12 mx-auto">
                <div className="rotate-14">
                  <PhotoWithFrame alt="Map Image" image={Rangkaian12} />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 left-2/12">
              <div className="w-20 mx-auto">
                <Image src={Compass} alt="Compass" width={300} height={300} />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <h4 className="text-2xl text-primary-500 font-semibold">
              Initiating the Odyssey
            </h4>
            <p className="text-sm text-default-dark">
              Berisi pengenalan Departemen Sistem Informasi, prospek karier di
              bidang IT, serta cara menyusun CV yang dikemas secara interaktif
              melalui aktivitas dan games yang seru.
            </p>
          </div>
        </div>
        <div className="w-full flex flex-col gap-20">
          <div className="w-full relative">
            {/* Base image */}
            <div className="w-8/12">
              <div className="-rotate-4">
                <PhotoWithFrame alt="Map Image" image={Rangkaian21} />
              </div>
            </div>

            <div className="absolute inset-0 mt-16 ml-12 w-full h-full">
              <div className="w-8/12 mx-auto">
                <div className="rotate-11">
                  <PhotoWithFrame alt="Map Image" image={Rangkaian22} />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 left-2/12">
              <div className="w-20 mx-auto">
                <Image src={Compass} alt="Compass" width={300} height={300} />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <h4 className="text-2xl text-primary-500 font-semibold text-right">
              Navigating the Currents
            </h4>
            <p className="text-sm text-default-dark text-right">
              Membahas pengembangan diri dan personal branding, dengan
              berdiskusi mahasiswa baru saling bertukar pendapat sekaligus
              menentukan calon pemimpin angkatan dari tiap prodi.
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:flex mt-32 flex-col gap-32">
        <div className="w-full relative flex-row gap-8">
          <div className="w-10/12 lg:w-2/3 relative">
            <div className="w-full flex gap-12 py-20">
              <div className="w-5/12 lg:h-6/12 flex flex-col gap-4">
                <h4 className="text-4xl lg:text-5xl text-primary-500 font-semibold">
                  Initiating the Odyssey
                </h4>
                <p className="text-sm lg:text-lg text-default-dark">
                  Berisi pengenalan Departemen Sistem Informasi, prospek karier
                  di bidang IT, serta cara menyusun CV yang dikemas secara
                  interaktif melalui aktivitas dan games yang seru.
                </p>
              </div>
              <div className="w-7/12 lg:w-6/12 relative">
                <div className="w-9/12">
                  <PhotoWithFrame alt="Map Image" image={Rangkaian11} />
                </div>

                <div className="absolute inset-0 mt-16 ml-12 w-full h-full">
                  <div className="w-9/12 mx-auto">
                    <div className="rotate-14">
                      <PhotoWithFrame alt="Map Image" image={Rangkaian12} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 left-0">
                <div className="w-10 mx-auto">
                  <Image src={Star} alt="Star" width={300} height={300} />
                </div>
              </div>
              <div className="absolute bottom-4 left-4/12">
                <div className="w-16 mx-auto">
                  <Image src={Star} alt="Star" width={300} height={300} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 -right-24 hidden lg:block">
            <div className="w-[26rem] mx-auto">
              <Image
                src={Map}
                alt="Map"
                width={300}
                height={300}
                className="w-full"
              />
            </div>
          </div>
        </div>
        <div className="w-full relative">
          <div className="w-10/12 lg:w-2/3 relative ml-auto">
            <div className="w-full flex gap-12 py-20">
              <div className="w-7/12 lg:w-6/12 relative">
                <div className="w-9/12">
                  <PhotoWithFrame alt="Map Image" image={Rangkaian21} />
                </div>

                <div className="absolute inset-0 mt-16 ml-12 w-full h-full">
                  <div className="w-9/12 mx-auto">
                    <div className="rotate-14">
                      <PhotoWithFrame alt="Map Image" image={Rangkaian22} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-5/12 lg:h-6/12 flex flex-col gap-4 text-right">
                <h4 className="text-4xl lg:text-5xl text-primary-500 font-semibold">
                  Navigating the Currents
                </h4>
                <p className="text-sm lg:text-lg text-default-dark">
                  Membahas pengembangan diri dan personal branding, dengan
                  berdiskusi mahasiswa baru saling bertukar pendapat sekaligus
                  menentukan calon pemimpin angkatan dari tiap prodi.
                </p>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-20 -left-24 hidden lg:block">
            <div className="w-[26rem] mx-auto">
              <Image
                src={Ship}
                alt="Ship"
                width={300}
                height={300}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PetaContent;
