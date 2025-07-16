import { Footer } from "@/shared/components/footer/Footer";
import Navbar from "@/shared/components/navbar/Navbar";
import { AuthProvider } from "@/shared/context/AuthContext";
import { ToastProvider } from "@/shared/context/ToastContext";
import React from "react";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <ToastProvider>
          <main className="pt-20 xl:pt-16 2xl:pt-18">{children}</main>
        </ToastProvider>
        <Footer />
      </AuthProvider>
    </>
  );
}
