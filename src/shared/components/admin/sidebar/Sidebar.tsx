"use client";

import { authService } from "@/api/services/auth";
import React from "react";
import { sidebarMenuItems } from "@/shared/data/SidebarData";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import LogoSoS from "@/assets/logo-sos.svg";
const Sidebar = () => {
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Gagal melakukan logout:", error);
    }
  };

  return (
    <aside className="hidden sm:flex fixed top-0 left-0 z-40 flex-col border-r border-gray-200 bg-white shadow-xl p-4 w-20 xl:w-64 min-h-screen transition-all duration-300">
      <div className="flex items-center justify-center  xl:justify-start gap-3">
        <div className="w-10 h-10 rounded-xl flex-shrink-0">
          <Image alt="logo SOS " className="w-full h-full" src={LogoSoS} />
        </div>
        <p className="hidden xl:block text-sm font-semibold ">
          Synergy Of Symphony & Shaping The Future
        </p>
      </div>

      <ul className="mt-2 xl:mt-8 flex flex-col gap-3">
        {sidebarMenuItems.map((sidebar) => {
          const isActive =
            sidebar.path === "/"
              ? pathname === sidebar.path
              : pathname.startsWith(sidebar.path);
          return (
            <Link
              key={sidebar.id}
              href={sidebar.path}
              passHref
              title={sidebar.label}
            >
              <li
                className={`flex items-center justify-center xl:justify-start gap-x-3 rounded-xl p-3 transition-all duration-300 ${
                  isActive
                    ? "bg-primary-500 text-white"
                    : "text-primary-500 hover:bg-primary-500 hover:text-white"
                }`}
              >
                {React.createElement(sidebar.icon, {
                  className: "h-6 w-6 flex-shrink-0",
                })}
                <span className="hidden xl:inline text-base">
                  {sidebar.label}
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
          <span className="hidden xl:inline font-medium text-base">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
