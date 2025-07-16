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
    // 1. Provider membungkus keseluruhan layout
    <AuthProvider>
      <ToastProvider>
        <div className="bg-[#E9E9E9CC] min-h-screen">
          <Sidebar />
          <section className="w-auto transition-all duration-300 sm:ml-20 lg:ml-64">
            <div className="px-6 py-8 md:px-8 lg:px-10">{children}</div>
          </section>
        </div>
      </ToastProvider>
    </AuthProvider>
  );
}
