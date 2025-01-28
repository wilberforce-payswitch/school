"use client";

import Sidebar from "@/components/Sidebar";
import React from "react";
import StoreProvider, { useAppSelector } from "./redux";
import Card from "@/components/Card";
import Navbar from "@/components/Navbar";

import { useGetAllStudentsQuery } from "@/state/api";
import AuthProvider from "./authProvider";


const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSideBarCollapsed = useAppSelector(
    (state) => state.global.isSideBarCollapsed
  );
  const user = useAppSelector((state) => state?.global.auth?.user);

  const { data: students } = useGetAllStudentsQuery();
  const studentCount = students?.length || 0;

  // const {data: balance} = useGetAllStudentsBalanceQuery()
  // console.log("Balances", balance)

  // console.log("Students", JSON.stringify(students, null, 3));

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
          {user?.roleId === 1 && (
            <>
              <Card
                backgroundColor="bg-white"
                count={studentCount}
                caption="Total Students"
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
            </>
          )}
        </div>

        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <AuthProvider>
      <DashboardLayout>{children}</DashboardLayout>
      </AuthProvider>
    </StoreProvider>
  );
};

export default DashboardWrapper;
