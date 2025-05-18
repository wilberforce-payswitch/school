'use'

import { Fee, PaymentHistoryProps } from "@/types";
import React, { useState } from "react";
import LoadingSpinner from "../Spinner";
import PaymentModal from "../paymentModal";
import { useMakePaymentMutation } from "@/state/api";
import { useRouter } from "next/navigation"; // Import useRouter
import { useAppSelector } from "@/app/redux";

const FeeTable = ({ payments, loading }: PaymentHistoryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedTermFee, setSelectedTermFee] = useState<number | null>(null);
  const [balanceDue, setBalanceDue] = useState<number | null>(null);
  const [totalPaid, setTotalPaid] = useState<number | null>(null);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [termId, setTermId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [makePayment] = useMakePaymentMutation();

  const schoolId = useAppSelector((state) => state.global.auth?.user?.school.id)

  const openModal = (
    studentId: string,
    termName: string,
    termFees: string,
    balance: number,
    paid: number,
    termId: string
  ) => {
    setSelectedStudentId(studentId);
    setTermId(termId);
    setSelectedTerm(termName);
    setSelectedTermFee(parseFloat(termFees));
    setBalanceDue(balance);
    setTotalPaid(paid);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTerm(null);
    setSelectedTermFee(null);
    setBalanceDue(null);
    setTotalPaid(null);
    setTermId(null);
  };

  const handlePayment = async () => {
    if (termId && selectedStudentId && balanceDue !== null) {
      setIsLoading(true); 
      try {
        const response = await makePayment({
          student_id: selectedStudentId,
          school_id: schoolId,
          amount: 0.1,
          term_id: termId,
          // payment_method: "Momo",
        });
        console.log("Payment response:", JSON.stringify(response, null, 3));
        if (response?.data?.checkout_url) {
          router.push(response?.data?.checkout_url);
        }
      } catch (error) {
        console.log("Failed to make payment:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="justify-center text-center items-center mt-10">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="relative mt-10 overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Student Name
            </th>
            <th scope="col" className="px-6 py-3">
              Term Name
            </th>
            <th scope="col" className="px-6 py-3">
              Term Fees
            </th>
            <th scope="col" className="px-6 py-3">
              Additional Fees
            </th>
            <th scope="col" className="px-6 py-3">
              Discounts
            </th>
            <th scope="col" className="px-6 py-3">
              Total Paid
            </th>
            <th scope="col" className="px-6 py-3">
              Balance Due
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {payments?.map((payment) => (
            <>
              {payment.balances.map((balance: Fee) => (
                <tr key={`${payment.studentId}-${balance.termName}`} className="bg-white border-b">
                  {/* <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {payment.studentId}
                  </th> */}
                  <td className="px-6 py-4">{payment.studentName}</td>
                  <td className="px-6 py-4">{balance.termName}</td>
                  <td className="px-6 py-4">GH₵ {balance.termFees}</td>
                  <td className="px-6 py-4">GH₵ {Number(balance?.additionalFees)?.toFixed(2)}</td>
                  <td className="px-6 py-4">GH₵ {Number(balance?.discounts)?.toFixed(2)}</td>
                  <td className="px-6 py-4">GH₵ {Number(balance.totalPaid)?.toFixed(2)}</td>
                  <td className="px-6 py-4">GH₵ {(Number(balance.balanceDue) - (balance?.discounts) + (balance?.additionalFees)).toFixed(2)}</td>
                  <td className="px-6 py-4">
                  {balance.balanceDue > 0 && (
                    <button
                      onClick={() =>
                        openModal(
                          payment?.studentId,
                          balance?.termName,
                          balance?.termFees,
                          balance?.balanceDue,
                          balance?.totalPaid,
                          balance?.termId.toString()
                        )
                      }
                      className="font-medium bg-blue-600 text-white rounded-md px-6 py-2 hover:bg-blue-700"
                    >
                      Pay
                    </button>
                  )}
                  </td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
      <PaymentModal title={selectedTerm || ""} isOpen={isModalOpen} onClose={closeModal}>
        <div className="text-center">
          {totalPaid && totalPaid > 0 ? (
            <p>
              Proceed with payment of <strong>GH₵ {balanceDue?.toFixed(2)}</strong> for <strong>{selectedTerm}</strong>
            </p>
          ) : (
            <p>
              Proceed with payment of <strong>GH₵ {selectedTermFee?.toFixed(2)}</strong> for <strong>{selectedTerm}</strong>
            </p>
          )}
          {totalPaid && totalPaid > 0 ? (
            <div className="mt-4">
              <label className="block text-gray-700">Amount to Pay</label>
              <input
                type="number"
                value={balanceDue}
                className="border rounded-md p-2 w-full mt-2"
                readOnly
              />
            </div>
          ) : (
            <div className="flex gap-5 items-center justify-center mt-4">
              <label className="flex items-center gap-2 border border-gray-200 p-2 rounded-md">
                <input
                  type="radio"
                  name="paymentOption"
                  value="70%"
                  className="form-radio"
                />
                Pay 70% (GH₵ {(selectedTermFee! * 0.7).toFixed(2)})
              </label>
              <label className="flex items-center gap-2 border border-gray-200 p-2 rounded-md">
                <input
                  type="radio"
                  name="paymentOption"
                  value="Full"
                  className="form-radio"
                />
                Pay Full
              </label>
            </div>
          )}
          <button
            onClick={handlePayment} // Call handlePayment on click
            className="mt-10 text-white bg-blue-600 px-4 py-2 rounded-md"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <LoadingSpinner />
              </div>
            ) : (
              "Confirm Payment"
            )}
          </button>
        </div>
      </PaymentModal>
    </div>
  );
};

export default FeeTable;
