import Navbar from "@/shared/components/navbar/Navbar";
import { AuthProvider } from "@/shared/context/AuthContext";
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
      <main className="">{children}</main>
    </>
  );
}
