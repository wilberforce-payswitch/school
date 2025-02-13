"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import ClassTable from "@/components/ClassTable";
import FeeTable from "@/components/FeeTable";
import PaymentCard from "@/components/PaymentCard";
import LoadingSpinner from "@/components/Spinner";
import SuperAdminHome from "@/components/SuperAdminHome";
import { setStudentsId } from "@/state";
import {
  useGetSchoolClassesQuery,
  useGetStudentBalanceQuery,
  useGetStudentsWithParentQuery,
  useGetTotalPaymentStatusStatisticsQuery,
} from "@/state/api";
import { skipToken } from "@reduxjs/toolkit/query";
import { skip } from "node:test";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const user = useAppSelector((state) => state?.global.auth?.user);
  const studentId = useAppSelector((state) => state.global.studentsIds);
  const dispatch = useAppDispatch();
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );
  const {
    data: classNamees,
    error,
    isLoading,
  } = useGetSchoolClassesQuery(undefined, { skip: user?.roleId !== 2 });
  // console.log(user?.id);
  const { data: students } = useGetStudentsWithParentQuery(
    user?.id ? { parentId: user.id } : skipToken,
    { skip: user?.roleId !== 4 }
  );

  const {data: transactions} = useGetTotalPaymentStatusStatisticsQuery( user?.roleId === 1 ? undefined : skipToken)

  useEffect(() => {
    if (students) {
      const ids = students.map((student) => student.id);
      dispatch(setStudentsId(ids));
      localStorage.setItem("StudentId", JSON.stringify(ids));
      if (ids.length > 0) {
        setSelectedStudentId(ids[0]);
      }
    }
  }, [students, dispatch]);

  const { data: balance, isLoading: balanceLoading } =
    useGetStudentBalanceQuery(
      selectedStudentId ? { studentId: [selectedStudentId] } : skipToken
    );

  const handleStudentSelection = (studentId: string) => {
    setSelectedStudentId(studentId);
  };

  if (isLoading) {
    return (
      <div className="justify-center text-center items-center mt-10">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error as string}</div>;
  }

  return (
    <>
      {user?.roleId === 1 && <SuperAdminHome transactions={transactions} />}
      {user?.roleId === 2 && (
        <div>
          <ClassTable data={classNamees || []} />
        </div>
      )}
      {user?.roleId === 4 && (
        <>
          <div className="flex items-center justify-center">
            <PaymentCard
              balances={balance || []}
              students={students || []}
              onStudentSelect={handleStudentSelection}
              // selectedStudentId={selectedStudentId}
            />
          </div>
          <FeeTable payments={balance || []} loading={balanceLoading} />
        </>
      )}
    </>
  );
};

export default HomePage;
