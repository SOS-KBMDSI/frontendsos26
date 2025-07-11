import DetailPresensiContainer from "@/feature/(admin)/presensi/detail-presensi/container/DetailPresensiContainer";
import React, { FunctionComponent } from "react";

type PropsType = {
  params: Promise<{ id: string }>;
};

const DetailPresensiPage: FunctionComponent<PropsType> =
  async function DetailPresensiPage({ params }) {
    const { id } = await params;
    return (
      <>
        <DetailPresensiContainer id={id} />
      </>
    );
  };

export default DetailPresensiPage;
