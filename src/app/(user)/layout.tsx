import { Footer } from "@/shared/components/footer/Footer";
import Navbar from "@/shared/components/navbar/Navbar";
import { AuthProvider } from "@/shared/context/AuthContext";
import { ToastProvider } from "@/shared/context/ToastContext";
import { QueryProvider } from "@/shared/components/provider/QueryProvider";
import React from "react";
import { AuthErrorProvider } from "@/shared/context/AuthErrorContext";
import { protectedRoutes } from "@/shared/data/protectedRoutes";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <QueryProvider>
        <AuthProvider>
          <ToastProvider>
            <AuthErrorProvider protectedRoutes={protectedRoutes}>
              <Navbar />
              <main className="pt-20 xl:pt-16 2xl:pt-18">{children}</main>
            </AuthErrorProvider>
            <Footer />
          </ToastProvider>
        </AuthProvider>
      </QueryProvider>
    </>
  );
}
