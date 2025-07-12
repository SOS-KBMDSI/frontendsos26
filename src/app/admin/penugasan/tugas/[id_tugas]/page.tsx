"use client";
import DetailTugasContainer from "@/feature/(admin)/penugasan/tugas/detail-tugas/container/DetailTugasContainer";
import { useParams } from "next/navigation";
import React from "react";

const Page = () => {
  const params = useParams();
  const id_penugasan = params.id_tugas as string;

  return (
    <>
      <DetailTugasContainer id_penugasan={id_penugasan} />
    </>
  );
};

export default Page;
