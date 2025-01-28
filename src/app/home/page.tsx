"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import ClassTable from "@/components/ClassTable";
import FeeTable from "@/components/FeeTable";
import PaymentCard from "@/components/PaymentCard";
import LoadingSpinner from "@/components/Spinner";
import { setStudentsId } from "@/state";
import {
  useGetSchoolClassesQuery,
  useGetStudentBalanceQuery,
  useGetStudentsWithParentQuery,
} from "@/state/api";
import { skipToken } from "@reduxjs/toolkit/query";
import React, { useEffect, useState } from "react";

const HomePage = () => {
  const user = useAppSelector((state) => state?.global.auth?.user);
  const studentId = useAppSelector((state) => state.global.studentsIds);
  const dispatch = useAppDispatch();
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null
  );
  const { data: classNamees, error, isLoading } = useGetSchoolClassesQuery();
  // console.log(user?.id);
  const { data: students } = useGetStudentsWithParentQuery({
    parentId: user?.id || "",
  });

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
      {user?.roleId === 1 ? (
        <div>
          <ClassTable data={classNamees || []} />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-center">
            <PaymentCard
              balances={balance || []}
              students={students || []}
              onStudentSelect={handleStudentSelection}
              selectedStudentId={selectedStudentId}
            />
          </div>
          <FeeTable payments={balance || []} loading={balanceLoading} />
        </>
      )}
    </>
  );
};

export default HomePage;
