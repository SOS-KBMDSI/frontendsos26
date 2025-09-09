"use client";
import React from "react";
import PresensiFormSection from "../components/PresensiFormSection";
import RekapPresensiSection from "../components/RekapPresensiSection";
import { useGetPresensiRekap } from "../hooks/useGetPresensiRekap";

const PresensiUserContainer = () => {
  const {
    data: presensiData,
    refresh,
    error,
    isLoading,
  } = useGetPresensiRekap();
  return (
    <div className="bg-login px-6 py-8 md:px-8 lg:px-32 lg:min-h-screen overflow-x-hidden pt-8 md:pt-20">
      <PresensiFormSection refreshPresensi={refresh} />
      <RekapPresensiSection
        presensiData={presensiData}
        error={error}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PresensiUserContainer;
