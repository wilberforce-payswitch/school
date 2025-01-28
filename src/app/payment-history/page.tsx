'use client'
import { useAppSelector } from '@/app/redux';
import PaymentHistoryTable from '@/components/StudentTable'
import { useGetStudentPaymentHistoryQuery } from '@/state/api';
import { skipToken } from '@reduxjs/toolkit/query';


const PaymentHistory = () => {
    const studentIds = useAppSelector((state) => state.global.studentsIds);
    const { data: history, isLoading: loadingHistory } =
    useGetStudentPaymentHistoryQuery(studentIds ? { studentId: studentIds } : skipToken);
// console.log("history", JSON.stringify(history,null,3))

  return (
    <PaymentHistoryTable data={history || []} loading={loadingHistory} />
  )
}

export default PaymentHistory