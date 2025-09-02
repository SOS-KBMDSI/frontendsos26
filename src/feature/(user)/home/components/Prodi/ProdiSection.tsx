import { prodiData } from "../../data/prodi";
import ProdiCard from "./ProdiCard";

const ProdiSection = () => {
  return (
    <section className="md:h-screen relative">
      <h4 className="text-center rounded-xl border-2 border-[#B9B2A8] absolute left-1/2 -top-4 md:-top-10 -translate-x-1/2 bg-white text-black w-fit z-20 font-semibold text-xl md:text-4xl px-4 py-2 md:px-12 md:py-5">
        Program Studi
      </h4>
      <div className="w-full content-container h-full relative  bg-red-800 overflow-hidden">
        <div className="w-[2418.07px] h-[2416.17px] left-[1642.21px] top-[1514.48px] absolute origin-top-left rotate-[145.14deg] bg-[radial-gradient(ellipse_45.15%_45.21%_at_42.87%_63.48%,_#8C021E_0%,_rgba(234,_91,_67,_0.32)_100%)] rounded-full blur-3xl" />
        <div className="w-[1886.76px] h-[1885.28px] left-[3110.80px] top-[200.88px] absolute origin-top-left rotate-[145.14deg] bg-[radial-gradient(ellipse_44.88%_44.88%_at_50.29%_57.43%,_#7D021A_0%,_rgba(125,_2,_26,_0.34)_100%)] rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto grid relative place-content-center md:gap-10 lg:gap-16 gap-16 px-10 py-16 md:p-0 h-full z-40 md:grid-cols-3">
          {prodiData.map((prodi) => (
            <ProdiCard key={prodi.id} prodi={prodi} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProdiSection;
