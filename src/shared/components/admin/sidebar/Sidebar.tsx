// /components/admin/sidebar/Sidebar.js

"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut } from "lucide-react";

import { sidebarMenuItems } from "@/shared/data/SidebarData";
import { authService } from "@/api/services/auth";
import LogoSoS from "@/assets/logo-sos.svg";

export const Sidebar = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await authService.logout();
      window.location.href = "/login";
    } catch (error) {
      console.error("Gagal melakukan logout:", error);
    }
  };

  return (
    <>
      {/* ================================================================== */}
      {/* 1. SIDEBAR VERSI DESKTOP (TIDAK ADA PERUBAHAN)                   */}
      {/* ================================================================== */}
      <aside className="hidden sm:flex fixed top-0 left-0 z-40 flex-col border-r border-gray-200 bg-white shadow-xl p-4 w-20 xl:w-64 min-h-screen transition-all duration-300">
        <div className="flex items-center justify-center xl:justify-start gap-3">
          <div className="w-10 h-10 rounded-xl flex-shrink-0">
            <Image alt="logo SOS" className="w-full h-full" src={LogoSoS} />
          </div>
          <p className="hidden xl:block text-sm font-semibold">
            Synergy Of Symphony & Shaping The Future
          </p>
        </div>

        <ul className="mt-2 xl:mt-8 flex flex-col gap-3">
          {sidebarMenuItems.map((item) => {
            const isActive =
              item.path === "/"
                ? pathname === item.path
                : pathname.startsWith(item.path);
            return (
              <Link key={item.id} href={item.path} passHref title={item.label}>
                <li
                  className={`flex items-center justify-center xl:justify-start gap-x-3 rounded-xl p-3 transition-all duration-300 ${
                    isActive
                      ? "bg-primary-500 text-white"
                      : "text-primary-500 hover:bg-primary-500 hover:text-white"
                  }`}
                >
                  {React.createElement(item.icon, {
                    className: "h-6 w-6 flex-shrink-0",
                  })}
                  <span className="hidden xl:inline text-base">
                    {item.label}
                  </span>
                </li>
              </Link>
            );
          })}
        </ul>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            title="Logout"
            className="w-full flex gap-3 items-center justify-center xl:justify-start rounded-xl bg-primary-500 p-3 h-auto xl:h-14 text-white hover:bg-red-600 transition-colors"
          >
            <LogOut size={22} className="flex-shrink-0" />
            <span className="hidden xl:inline font-medium text-base">
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* ================================================================== */}
      {/* 2. FLOATING BUTTON VERSI MOBILE (TIDAK ADA PERUBAHAN)              */}
      {/* ================================================================== */}
      <div className="sm:hidden">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          title="Buka Menu"
          className="fixed top-5 right-5 z-40 h-12 w-12 bg-primary-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-primary-600 transition-all"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* ================================================================== */}
      {/* 3. PANEL SIDEBAR VERSI MOBILE (DENGAN PERBAIKAN)                 */}
      {/* ================================================================== */}
      {isMobileSidebarOpen && (
        <div className="sm:hidden fixed inset-0 z-50">
          <div
            onClick={() => setIsMobileSidebarOpen(false)}
            className="absolute inset-0 bg-black bg-opacity-50"
          />
          <aside className="fixed top-0 right-0 h-full w-72 bg-white shadow-xl flex flex-col p-4">
            <div className="flex items-center justify-between pb-4 border-b">
              <span className="font-semibold text-lg">Menu</span>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                title="Tutup Menu"
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>
            {/* --- PERBAIKAN DI SINI --- */}
            <ul className="flex-grow mt-6 flex flex-col gap-2">
              {sidebarMenuItems.map((item) => {
                // 1. Logika 'isActive' ditambahkan di sini
                const isActive =
                  item.path === "/"
                    ? pathname === item.path
                    : pathname.startsWith(item.path);
                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    onClick={() => setIsMobileSidebarOpen(false)}
                    // 2. className sekarang kondisional berdasarkan 'isActive'
                    className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary-500 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <item.icon className="h-6 w-6 flex-shrink-0" />
                    <span className="font-medium text-base">{item.label}</span>
                  </Link>
                );
              })}
            </ul>
            <div className="mt-auto">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 p-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-6 w-6" />
                <span className="font-medium text-base">Logout</span>
              </button>
            </div>
          </aside>
        </div>
      )}
    </>
  );
};

export default Sidebar;
