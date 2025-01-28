
import AdminItem from "./adminitem";
import { AdminTableProps } from "@/types";
import {
  useGetSchoolClassesQuery,
  useGetStudentsInAClassQuery,
} from "@/state/api";
import { useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import LoadingSpinner from "./Spinner";

const AdminTable: React.FC<AdminTableProps> = ({
}) => {
  const { data: classes } = useGetSchoolClassesQuery();
  const [selectedClassId, setSelectedClassId] = useState<string>("");

  const { data: students, isLoading } = useGetStudentsInAClassQuery(
    selectedClassId ? { classId: selectedClassId } : skipToken
  );

  if (isLoading) {
    return (
      <div className="justify-center text-center items-center mt-10">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-w-96 mx-5 mt-5 rounded-xl overflow-y-hidden overflow-x-scroll shadow-sm border scrollbar-hidden md:block">
      <div className="w-full relative">
        <div className="w-full absolute bg-slate-200 text-white z-10 backdrop-blur-sm top-0">
          <div className="flex flex-col ">
            <div className="flex flex-row justify-between mx-4 mb-6 mt-4">
              <div className="flex flex-row justify-between items-center gap-3">
                <div className="flex items-center border border-searchboxcolor shadow-sm rounded-lg bg-white px-2 py-2 w-full">
                  <select
                    className="ml-2 text-sm font-[400] text-black focus:outline-none bg-transparent w-full"
                    onChange={(e) => setSelectedClassId(e.target.value)}
                  >
                    <option value="">Select Class</option>
                    {classes?.map((classItem) => (
                      <option key={classItem.id} value={classItem.id}>
                        {classItem.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="flex w-full text-xs pb-3 font-bold text-neutral-800">
              <div className="flex w-full grow items-start">
                <div className="w-full pl-5 truncate">ID</div>
                <div className="w-full truncate">NAME</div>
                <div className="w-full truncate">CLASS</div>
                <div className="w-full truncate">PARENT NAME</div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="w-full py-5 h-[calc(100vh/1.3)] scrollbar-hidden overflow-y-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                {students?.map((item, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td>
                      <AdminItem
                        selected={false}
                        count={index + 1}
                        totalItems={students?.length}
                        id={item.id}
                        studentname={item.name}
                        studentclass={item.class_name}
                        term={item.parent_name}
                        payment={item.payment}
                        balances={item.balances}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTable;
