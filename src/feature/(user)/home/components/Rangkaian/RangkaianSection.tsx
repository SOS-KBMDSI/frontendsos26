import Guidebook from "./Guidebook";
import MemoriSection from "./MemoriSection";
import RangakainList from "./RangakainList";

const RangkaianSection = () => {
  return (
    <section className="min-h-screen  bg-login overflow-hidden relative  py-24">
      <h4 className="text-center font-semibold text-4xl w-fit mx-auto border-b-6 pb-2  border-primary-600">
        Rangkaian
      </h4>
      <RangakainList />
      <Guidebook />
      <MemoriSection />
    </section>
  );
};

export default RangkaianSection;
