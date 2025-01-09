"use client";

import Sidebar from "@/components/Sidebar";
import React from "react";
import { useAppSelector } from "../redux";
import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import { Metadata } from "next";
;


export const metadata: Metadata = {
  title: "School Management System",
  description: "Paying fees has never been this easy",
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSideBarCollapsed
  );

  return (
    <div className="flex min-h-screen w-full bg-gray-50 text-gray-900">
      <Sidebar />
      <main
        className={`flex w-full flex-col bg-gray-50 ${
          isSideBarCollapsed ? "" : "md:pl-64"
        }`}
      >
        <Navbar />
        <div className="flex mt-2 gap-5 px-8 pb-8">
          <Card
            backgroundColor="bg-white"
            count="0"
            caption="Total students"
            borderColor="border-grey-200"
          />
          <Card
            backgroundColor="bg-red-100"
            count="0"
            caption="Students with Pending Payments"
            borderColor="border-red-200"
          />
          <Card
            backgroundColor="bg-green-100"
            count="0"
            caption="Students with completed Payments"
            borderColor="border-green-200"
          />
        </div>

        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {

  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
  
};

export default DashboardWrapper;
