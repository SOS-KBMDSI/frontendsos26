import React from "react";
import PetaSection from "../components/PetaSection";
import KilasBalikSection from "../components/KilasBalikSection";

const PetaContainer = () => {
  return (
    <main className="bg-login lg:min-h-screen overflow-x-hidden">
      <PetaSection />
      <KilasBalikSection />
    </main>
  );
};

export default PetaContainer;
