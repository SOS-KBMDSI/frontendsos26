import { DepartemenSection } from "../components/DepartemenSection";
import { ProdiSection } from "../components/ProdiSection";
import { AnimatedDiv } from "@/shared/components/ui/AnimatedDiv";

export const AkademikContainer = () => {
  return (
    <>
      <AnimatedDiv className="w-full">
        <DepartemenSection />
        <ProdiSection />
      </AnimatedDiv>
    </>
  );
};
