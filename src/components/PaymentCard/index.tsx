/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Students } from "@/types";

type Props = {
  students: Students[];
  onStudentSelect: (id: string) => void;
  balances: any[];
};

const PaymentCard = ({ students, onStudentSelect, balances }: Props) => {
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );

  const handleSelect = (id: string) => {
    setSelectedStudentId(id);
    onStudentSelect(id);
  };

  console.log("BALANCES", JSON.stringify(balances, null, 3));

  return (
    <>
      {students?.map((student) => {
        const studentBalance = balances.find(
          (balance) => balance?.studentId === student?.id
        );

        const totalFees = studentBalance
          ? studentBalance?.balances?.reduce(
              (sum: number, term: any) => sum + parseFloat(term?.termFees) + parseFloat(term?.additionalFees) - parseFloat(term?.discounts),
              0
            )
          : 0;

        const totalPaid = studentBalance
          ? studentBalance?.balances?.reduce(
              (sum: number, term: any) => sum + parseFloat(term?.totalPaid),
              0
            )
          : 0;

        const totalBalanceDue = totalFees - totalPaid;

        return (
          <div
            key={student?.id}
            className={`w-full max-w-xs mx-auto pt-8 pb-6 bg-white border border-gray-300 rounded-xl shadow-lg transform transition-all hover:scale-105 hover:shadow-2xl ${
              selectedStudentId === student?.id ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => handleSelect(student?.id)}
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-20 h-20 overflow-hidden bg-gray-200 rounded-full shadow-inner">
                <svg
                  className="absolute w-24 h-24 text-gray-400 -left-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>

              <h5 className="text-2xl font-semibold text-blue-900">
                {student?.name}
              </h5>
              <span className="text-lg font-medium text-blue-500 italic">
                {student?.className}
              </span>
              {selectedStudentId === student?.id && (
                <div className="w-full px-6">
                  <div className="flex justify-between items-center mb-2 p-3 rounded-lg bg-gray-200 text-neutral-800 font-bold shadow-sm">
                    <span>Total Fees:</span>
                    <span>GH₵{totalFees?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2 p-3 rounded-lg bg-red-100 text-red-600 font-bold shadow-sm">
                    <span>Balance Due:</span>
                    <span>GH₵{totalBalanceDue?.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-green-100 text-green-600 font-bold shadow-sm">
                    <span>Amount Paid:</span>
                    <span>GH₵{totalPaid?.toFixed(2)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PaymentCard;
