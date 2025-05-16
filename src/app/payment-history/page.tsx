"use client";
import { useAppSelector } from "@/app/redux";
import AdminPaymentTable from "@/components/AdminPaymentHistoryTable";
import PaymentHistoryTable from "@/components/StudentTable";
import SuperAdminTransactions from "@/components/SuperAdminTransactions";
// import useEcho from "@/hooks/useEcho";
import {
  useGetStudentPaymentHistoryQuery,
  useGetSuperAdminTransactionHistoryQuery,
} from "@/state/api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";

const PaymentHistory = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(false);
  const [filterValues, setFilterValues] = useState<any>({});
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const studentIds = useAppSelector((state) => state.global.studentsIds);
  const user = useAppSelector((state) => state.global.auth?.user);
  const {
    data,
    isLoading: loadingHistory,
    isError,
  } = useGetStudentPaymentHistoryQuery(
    studentIds
      ? {
          studentId: studentIds,
          page,
          searchTerm: search,
          per_page: rowsPerPage,
          status: filterValues.status,
          startDate: filterValues.date?.from,
          endDate: filterValues.date?.to,
        }
      : skipToken
  );

  const {} = useGetSuperAdminTransactionHistoryQuery({
    page,
    per_page: rowsPerPage,
    status: filterValues.status,
    startDate: filterValues.date?.from,
    endDate: filterValues.date?.to,
  });
  // useEcho();

  return (
    <>
      {user?.roleId === 4 && (
        <PaymentHistoryTable
          data={data}
          loading={loadingHistory}
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          isLoading={loadingHistory}
          isError={isError}
        />
      )}
      {user?.roleId === 2 && <AdminPaymentTable />}
      {user?.roleId === 1 && <SuperAdminTransactions />}
    </>
  );
};

export default PaymentHistory;
