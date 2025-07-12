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
      </AuthProvider>
      <ToastProvider>
        <main className="pt-20">{children}</main>
      </ToastProvider>
    </>
  );
}
