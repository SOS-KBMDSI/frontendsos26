import LoginPageContainer from "@/feature/(auth)/login/container/LoginPageContainer";
import Navbar from "@/shared/components/navbar/Navbar";
import { AuthProvider } from "@/shared/context/AuthContext";
import React from "react";

const page = () => {
  return (
    <main className="overflow-hidden">
      <AuthProvider>
        <Navbar />
      </AuthProvider>
      <LoginPageContainer />
    </main>
  );
};

export default page;
