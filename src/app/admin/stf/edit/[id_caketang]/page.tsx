"use client";

import EditStfContainer from "@/feature/(admin)/stf/container/EditStfContainer";
import { useParams } from "next/navigation";
import React from "react";

const EditStfPage = () => {
  const params = useParams();
  const id_caketang = params.id_caketang as string;

  if (!id_caketang) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <EditStfContainer id_caketang={id_caketang} />
    </main>
  );
};

export default EditStfPage;
