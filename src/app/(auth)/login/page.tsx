import LoginPageContainer from "@/feature/(auth)/login/container/LoginPageContainer";
import Navbar from "@/shared/components/navbar/Navbar";
import { AuthProvider } from "@/shared/context/AuthContext";
import { ToastProvider } from "@/shared/context/ToastContext";
import React from "react";

const page = () => {
  return (
    <main className="overflow-hidden">
      <ToastProvider>
        <AuthProvider>
          <Navbar />
          <LoginPageContainer />
        </AuthProvider>
      </ToastProvider>
    </main>
  );
};

export default page;
