/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { ExportButton } from "@/components/ExportButton";
import ResponsiveTable from "@/components/ResponsiveTable";
import Spinner from "@/components/Spinner";
import { useGetSchoolClassesQuery, useGetStudentsInAClassQuery } from "@/state/api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useAppSelector } from "@/app/redux";
import Back from "@/assets/icons/back.svg";
import Forward from "@/assets/icons/forward.svg";
import Search from "@/assets/icons/search.svg";
import Refresh from "@/assets/icons/refresh.svg";
import Image from "next/image";

const Classes = () => {
  const user = useAppSelector((state) => state?.global?.auth?.user);
  const userSchoolId = user?.school?.id;

  const { data: classes } = useGetSchoolClassesQuery(
    userSchoolId ? { school_id: userSchoolId } : skipToken,
    { skip: user?.roleId !== 2 }
  );

  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const {
    data: studentsData,
    isLoading: isLoadingStudents,
    isFetching,
  } = useGetStudentsInAClassQuery(
    selectedClassId ? { classId: selectedClassId, page, per_page: rowsPerPage, searchTerm } : skipToken
  );

  const allStudents = studentsData?.data ?? [];
  const count = studentsData?.total ?? 0;
  const totalPages = studentsData?.last_page ?? 1;

  console.log("❤️❤️❤️❤️❤️", JSON.stringify(allStudents,null,3))

  const displayedStudents = searchTerm
    ? allStudents.filter((student: any) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.parent_name &&
          student.parent_name.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : allStudents;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleExport = () => {
    console.log("Exporting data...");
  };

  const columns = [
    {
      id: "id",
      header: "#",
      width: "w-20",
      format: (_: any, __: any, index?: number) => (index !== undefined ? index + 1 : "-"),
    },
    {
      id: "name",
      header: "NAME",
      width: "w-1/4",
    },
    {
      id: "class_name",
      header: "CLASS",
      width: "w-1/4",
    },
    {
      id: "parent_name",
      header: "PARENT NAME",
      width: "w-1/4",
    },
    {
      id: "parent_phone",
      header: "PARENT NUMBER",
      width: "w-1/4",
    },
  ];

  if (isLoadingStudents) {
    return (
      <div className="justify-center text-center items-center mt-10">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white px-5 py-5 md:py-8 md:px-8">
      <div className="h-full">
        <div className="rounded-xl overflow-y-hidden overflow-x-scroll shadow-sm border scrollbar-hidden md:block h-full">
          <div className="w-full relative h-full">
            <div className="flex flex-col bg-gray-50">
              <div className="flex flex-row justify-between gap-5 mx-2 md:mx-4 mt-2 md:mt-4">
                <div className="flex flex-row items-center gap-2 md:gap-3 relative">
                  {/* Class Selector */}
                  <div className="flex items-center border border-searchboxcolor shadow-sm rounded-lg h-10 px-2 py-2 w-1/3">
                    <select
                      className="ml-2 text-xs md:text-sm w-full font-normal text-black focus:outline-none bg-transparent"
                      onChange={(e) => {
                        setSelectedClassId(e.target.value);
                        setPage(1); // Reset page when class changes
                      }}
                    >
                      <option value="">Select Class</option>
                      {classes?.map((classItem: any) => (
                        <option key={classItem.id} value={classItem.id}>
                          {classItem.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Search Box */}
                  <div className="flex items-center border border-searchboxcolor shadow-sm rounded-lg bg-white h-10 px-2 py-2 w-2/3">
                    <Image src={Search} alt="search-icon" />
                    <input
                      type="text"
                      placeholder="Search Name or ID"
                      className="ml-2 text-xs md:text-sm w-full font-normal text-black focus:outline-none bg-transparent"
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>

                  {/* Refresh Button */}
                  <button
                    className="h-[40px] w-[40px] bg-white border border-searchboxcolor shadow-sm rounded-lg p-2 flex items-center justify-center"
                    onClick={handleRefresh}
                  >
                    {isRefreshing ? (
                      <Spinner />
                    ) : (
                      <Image src={Refresh} alt="refresh-icon" width={14} height={14} />
                    )}
                  </button>
                </div>

                {/* Export Button */}
                <ExportButton isExporting={false} onClick={handleExport} />
              </div>
            </div>

            {/* Responsive Table */}
            <ResponsiveTable
              isTransactions={true}
              columns={columns}
              data={displayedStudents}
              isFetching={isFetching}
              position={(page - 1) * rowsPerPage}
            />

            {/* Pagination */}
            <div className="flex justify-between absolute bottom-0 bg-[#F4F7FCBF] w-full z-20 backdrop-blur-sm flex-row text-headercolor text-xs px-5 py-3">
              <div className="flex flex-row items-center gap-1">
                <div>
                  {displayedStudents.length > 0 ? (page - 1) * rowsPerPage + 1 : 0} to{" "}
                  {Math.min(page * rowsPerPage, count)} of {count}
                </div>
              </div>

              <div className="flex flex-row items-center gap-5">
                <div className="flex flex-row items-center gap-1">
                  <div className="text-headercolor text-xs">Rows per page:</div>
                  <select
                    className="rounded-lg bg-transparent shadow-none text-xs text-headercolor focus:outline-none"
                    value={String(rowsPerPage)}
                    onChange={(e) => {
                      setRowsPerPage(Number(e.target.value));
                      setPage(1); // Reset to first page on rowsPerPage change
                    }}
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
                <div className="flex flex-row items-center gap-3">
                  <div
                    className="p-3 bg-white border rounded-lg shadow-sm cursor-pointer"
                    onClick={() => page > 1 && setPage(page - 1)}
                  >
                    <Image alt="Back icon" src={Back} />
                  </div>
                  <div>
                    {displayedStudents.length > 0 ? page : 0}/{totalPages}
                  </div>
                  <div
                    className="p-3 bg-white border rounded-lg shadow-sm cursor-pointer"
                    onClick={() => page < totalPages && setPage(page + 1)}
                  >
                    <Image alt="Next icon" src={Forward} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default Classes;
