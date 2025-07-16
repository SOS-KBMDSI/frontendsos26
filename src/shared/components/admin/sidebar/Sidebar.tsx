"use client";

import { useAuthContext } from "@/shared/hooks/useAuthContext";
import { authService } from "@/api/services/auth";
import React from "react";
import { sidebarMenuItems } from "@/shared/data/SidebarData";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const { user } = useAuthContext();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Gagal melakukan logout:", error);
    }
  };

  return (
    <aside className="hidden sm:flex fixed top-0 left-0 z-40 flex-col border-r border-gray-200 bg-white shadow-xl px-3 lg:px-4 py-5 w-20 lg:w-64 min-h-screen transition-all duration-300">
      <div className="flex items-center justify-center lg:justify-start gap-3">
        <div className="bg-gray-500 w-12 h-12 rounded-xl flex-shrink-0"></div>
        <p className="hidden lg:block text-sm font-semibold">
          Synergy Of Symphony & Shaping The Future
        </p>
      </div>

      <div className="hidden lg:block mt-4 px-4 py-2 bg-gray-200 rounded-lg">
        <span className="text-gray-700 font-medium text-base truncate">
          Welcome, {user?.nama || "Admin"}!
        </span>
      </div>

      <ul className="xl:mt-10 lg:mt-2 md:mt-4 mt-10 flex flex-col gap-3">
        {sidebarMenuItems.map((sidebar) => {
          const isActive = pathname === sidebar.path;
          return (
            <Link
              key={sidebar.id}
              href={sidebar.path}
              passHref
              title={sidebar.label}
            >
              <li
                className={`flex items-center justify-center lg:justify-start gap-x-3 rounded-xl p-3 transition-all duration-300 ${
                  isActive
                    ? "bg-primary-500 text-white"
                    : "text-primary-500 hover:bg-primary-500 hover:text-white"
                }`}
              >
                {React.createElement(sidebar.icon, {
                  className: "h-6 w-6 flex-shrink-0",
                })}
                <span className="hidden  lg:inline text-base">
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
          className="w-full flex gap-3 items-center justify-center rounded-xl bg-primary-500 h-14 text-white hover:bg-red-600 transition-colors"
        >
          <LogOut size={22} />
          <span className="hidden lg:inline font-medium text-base">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
