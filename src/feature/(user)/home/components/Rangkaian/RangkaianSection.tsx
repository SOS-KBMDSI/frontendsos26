import Guidebook from "./Guidebook";
import MemoriSection from "./MemoriSection";
import RangakainList from "./RangakainList";

const RangkaianSection = () => {
  return (
    <section className="min-h-screen  bg-login overflow-hidden relative  py-24">
      <h4 className="text-center font-semibold mx-auto text-4xl w-fit ">
        Rangkaian
        <div className="h-2 mt-2 rounded-lg bg-primary-600 w-full"></div>
      </h4>
      <RangakainList />
      <Guidebook />
      <MemoriSection />
    </section>
  );
};

export default RangkaianSection;
