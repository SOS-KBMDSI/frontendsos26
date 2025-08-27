import { kegiatanData } from "../../data/kegiatan";
import KegiatanCard from "./KegiatanCard";

const Kegiatan = () => {
  return (
    <section className="content-container bg-login overflow-y-scroll md:overflow-hidden h-screen md:h-full py-20 md:py-0 lg:py-20">
      <div className="grid md:grid-cols-2  max-w-7xl mx-auto w-full grid-cols-1 items-center gap-10 min-h-screen place-items-center">
        {kegiatanData.map((kegiatan) => (
          <KegiatanCard key={kegiatan.id} kegiatan={kegiatan} />
        ))}
      </div>
    </section>
  );
};

export default Kegiatan;
