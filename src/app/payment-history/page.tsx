"use client";
import { useAppSelector } from "@/app/redux";
import AdminPaymentTable from "@/components/AdminPaymentHistoryTable";
import PaymentHistoryTable from "@/components/StudentTable";
import { useGetStudentPaymentHistoryQuery } from "@/state/api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";

const PaymentHistory = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const studentIds = useAppSelector((state) => state.global.studentsIds);
  const user = useAppSelector((state) => state.global.auth?.user);
  const { data, isLoading: loadingHistory } =
    useGetStudentPaymentHistoryQuery(
      studentIds ? { studentId: studentIds, page, search  } : skipToken
    );

  return (
    <>{user?.roleId === 4 &&
      <PaymentHistoryTable data={data || []} loading={loadingHistory} setPage={setPage} setSearch={setSearch} />}
      {user?.roleId === 2 && (<AdminPaymentTable />)}
      </>
  );
};

export default PaymentHistory;
