import ProfileContainer from "@/feature/(user)/profile/container/ProfileContainer";
import { AuthProvider } from "@/shared/context/AuthContext";
import React from "react";

const page = () => {
  return (
    <>
      <AuthProvider>
        <ProfileContainer />
      </AuthProvider>
    </>
  );
};

export default page;
