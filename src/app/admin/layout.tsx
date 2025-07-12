"use client";

import Sidebar from "@/shared/components/admin/sidebar/Sidebar";
import { AuthProvider } from "@/shared/context/AuthContext";
import { ToastProvider } from "@/shared/context/ToastContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex  ">
      <AuthProvider>
        <Sidebar />
      </AuthProvider>
      <ToastProvider>
        <section className="right-0 px-12 py-12 w-4/5 xl:w-4/5 lg:w-3/4 absolute bg-[#E9E9E9CC]  min-h-screen overflow-y-auto">
          {children}
        </section>
      </ToastProvider>
    </main>
  );
}
