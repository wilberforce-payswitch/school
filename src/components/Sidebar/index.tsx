"use client";

import {
  BadgeCent,
  Home,
  LockIcon,
  LogOut,
  Settings,
  UserPlus,
  // Settings,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import { SidebarLinkProps } from "@/types/index";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import Link from "next/link";
import { logout, setIsSidebarCollapsed } from "@/state";
import { getInitials } from "@/util/helper";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSideBarCollapsed
  );
  const user = useAppSelector((state) => state?.global.auth?.user);
  const router = useRouter()

  const handleLogout = () => {
    // Clear localStorage data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Dispatch the logout action to clear state
    dispatch(logout());

    // Redirect to the login page
    router.push("/login");
  };

  const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl transition-all duration-300 h-full z-40 overflow-y-auto bg-gradient-to-b from-primary to-secondary ${
    isSideBarCollapsed ? "w-0 hidden" : "w-64 "
  }`;

  return (
    <div className={sidebarClassNames}>
      <div className=" flex h-[100%] w-full flex-col justify-between">
        <div className="flex w-full flex-col justify-start">
          <div className="z-50 flex min-h-[56px] w-64 items-center justify-between px-6 pt-3">
            <Image src="/logo3.svg" alt="logo" width={120} height={60} />

            {isSideBarCollapsed ? null : (
              <button
                className="py-3"
                onClick={() =>
                  dispatch(setIsSidebarCollapsed(!isSideBarCollapsed))
                }
              >
                <X className="h-6 w-6 text-gray-800 hover:text-gray-500 " />
              </button>
            )}
          </div>
          <div className="flex items-center gap-3 border-y-[1.5px] border-[#240fff] px-8 py-4">
            <div className="text-base font-bold text-white">SMS</div>
            <div>
              <div className="mt-1 flex items-start gap-2">
                <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-200" />
                <p className="text-xs text-gray-200">Private</p>
              </div>
            </div>
          </div>
          <nav className="z-10 w-full">
            <SidebarLink icon={Home} label="Home" href="/home" />
            {user?.roleId === 1 && (
              <>
                <SidebarLink icon={Users} label="Classes" href="/classes" />{" "}
                <SidebarLink
                  icon={UserPlus}
                  label="Register"
                  href="/register"
                />
              </>
            )}
            {user?.roleId === 2 && (
              <>
                <SidebarLink
                  icon={BadgeCent}
                  label="Payment History"
                  href="/payment-history"
                />
                <SidebarLink icon={Settings} label="Settings" href="settings" />
              </>
            )}

            {/* <SidebarLink icon={Search} label="Classes" href="/classes" /> */}
          </nav>
        </div>
        <div className="flex flex-col mb-5 justify-center items-center">
        <div className="flex items-center justify-center w-20 h-20 rounded-full bg-blue-900 text-white font-semibold">
          {getInitials(user?.name)}
        </div>
        <button onClick={handleLogout} className="bg-red-600 flex gap-2 px-10 py-2 items-center justify-center rounded-md mt-4 text-white hover:bg-red-700">
        <LogOut size={18} />
          Sign Out
        </button>
        
        </div>
      </div>
    </div>
  );
};

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || (pathname === "/" && href === "/home");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors ${
          isActive ? "bg-secondary text-neutral-900" : ""
        } justify-start px-8 py-3`}
      >
        {isActive && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
        )}
        <Icon className="h-5 w-5 text-white" />
        <span className={`font-medium text-white`}>{label}</span>
      </div>
    </Link>
  );
};

export default Sidebar;
