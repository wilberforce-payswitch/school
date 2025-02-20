import { paymentStatusStatistics } from "@/types";
import React from "react";
import Carousel from "../Carousel";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetSchoolPaymentDataQuery } from "@/state/api";
import { useAppSelector } from "@/app/redux";
import { skipToken } from "@reduxjs/toolkit/query";

type prop = {
  transactions: paymentStatusStatistics;
};

const SuperAdminHome = ({ transactions }: prop) => {
  const user = useAppSelector((state) => state?.global.auth?.user);
  const { data } = useGetSchoolPaymentDataQuery(
    user?.roleId === 1 ? undefined : skipToken
  );

  console.log("Data", JSON.stringify(data, null, 2));

  const chartColors = {
    bar: "#8884d8",
    barGrid: "#E0E0E0",
    pieFill: "#82ca9d",
    text: "#000000",
  };
  return (
    <div className="w-full h-full bg-[#FBFDFF] p-4">
      <div className="w-full flex flex-row gap-5">
        <div className="mb-4 p-4 py-10 bg-[#27AE601A] rounded-lg w-full border border-[#27AE604D]">
          <h2 className="text-xl font-[700] text-[#0EAD69]">
            {transactions?.successful}
          </h2>
          <div className="text-sm text-[#49454FCC] font-[600]">
            Successful Transactions
          </div>
        </div>

        <div className="mb-4 p-4 py-10 bg-[#F2C94C1A] rounded-lg w-full border border-[#F2C94C4D]">
          <h2 className="text-xl font-[700] text-amber-400">
            {transactions?.pending}
          </h2>
          <div className="text-sm text-[#49454FCC] font-[600]">
            Pending Transactions
          </div>
        </div>

        <div className="mb-4 p-4 py-10 bg-[#EB57571A] rounded-lg w-full border border-[#EB57574D]">
          <h2 className="text-xl font-[700] text-[#D12953]">
            {transactions?.failed}
          </h2>
          <div className="text-sm text-[#49454FCC] font-[600]">
            Failed Transactions
          </div>
        </div>
      </div>
      <div className="container w-full items-center justify-center gap-5 flex lg:flex-row-reverse flex-col-reverse">
        <div className="flex flex-col w-full">
          <div className="mb-4 mt-20 ml-9 p-4 flex flex-col items-start bg-white rounded-lg w-full border border-[#00000026]">
            <div className="mt-4">
              <h2 className="text-3xl  font-[700] text-blue-900 ">
                GH₵ {transactions?.totalAmount}
              </h2>
              <div className="text-sm text-[#49454FCC] font-[600]">
                Total Successful Payments
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300} className="mt-5">
            <BarChart data={data || []}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke={chartColors.barGrid}
              />
              <XAxis dataKey="schoolName" stroke={chartColors.text} />
              <YAxis stroke={chartColors.text} />
              <Tooltip
                contentStyle={{ width: "min-content", height: "min-content" }}
              />
              <Legend />
              <Bar dataKey="successfulPayments" fill={chartColors.bar} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <Carousel />
      </div>
    </div>
  );
};

export default SuperAdminHome;
