import Image from "next/image";
import { AdminTableProps } from "@/types";
import ClassItem from "./classItem";

const ClassTable: React.FC<AdminTableProps> = ({
  data,
  maxCount = 2,
  maxPage = 3,
}) => {
  const sampleData = [
    {
      id: 1,
      class: "Class 1",
      numberOfStudents: 40,
      numberofCompletedFees: 25,
      numberStillOwing: 15,
    },
    {
      id: 2,
      class: "Class 2",
      numberOfStudents: 30,
      numberofCompletedFees: 15,
      numberStillOwing: 15,
    },
    {
      id: 1,
      class: "Class 3",
      numberOfStudents: 40,
      numberofCompletedFees: 25,
      numberStillOwing: 15,
    },
    {
      id: 2,
      class: "Class 4",
      numberOfStudents: 40,
      numberofCompletedFees: 25,
      numberStillOwing: 15,
    },
    {
      id: 1,
      class: "Class  5",
      numberOfStudents: 40,
      numberofCompletedFees: 25,
      numberStillOwing: 15,
    },
    {
      id: 2,
      class: "Class 6",
      numberOfStudents: 40,
      numberofCompletedFees: 25,
      numberStillOwing: 15,
    },
    {
      id: 1,
      class: "Creche",
      numberOfStudents: 40,
      numberofCompletedFees: 25,
      numberStillOwing: 15,
    },
    {
      id: 2,
      class: "Kindergarten",
      numberOfStudents: 40,
      numberofCompletedFees: 25,
      numberStillOwing: 15,
    },
  ];

  const dataToUse = data.length > 0 ? data : sampleData;

  return (
    <div className="min-w-96 mx-5  mt-10  rounded-xl overflow-y-hidden overflow-x-scroll shadow-sm border scrollbar-hidden md:block">
      <div className="w-full relative">
        <div className="w-full absolute bg-slate-200 text-white  z-10 backdrop-blur-sm top-0">
          <div className="flex flex-col ">
            <div className="flex w-full text-xs  py-3 font-bold text-neutral-800">
              <div className="flex w-full grow items-start">
                <div className="w-full pl-5 ">ID</div>
                <div className="w-full pl-8 truncate">CLASS</div>
                <div className="w-full truncate">STUDENT POPULATION</div>
                <div className=" w-full truncate">FEES</div>
             
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between absolute bottom-0 bg-[#F4F7FCBF] w-full  z-10 backdrop-blur-sm  flex-row text-headercolor text-xs px-5 py-3">
          <div className="flex flex-row items-center gap-1">
            <div>1-10</div>
            <div>of {maxCount}</div>
          </div>

          <div className="flex flex-row items-center gap-5">
            <div className="flex flex-row items-center gap-1">
              <div className="text-headercolor text-xs">Rows per page:</div>
              <select className="rounded-lg bg-transparent shadow-none text-xs text-headercolor focus:outline-none">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="p-3 bg-white border rounded-lg shadow-sm">
                <Image alt="Back icon" src="/back.svg" width={8} height={8} />
              </div>
              <div>1/{maxPage}</div>
              <div className="p-3 bg-white border rounded-lg shadow-sm">
                <Image
                  alt="Next icon"
                  src="/forward.svg"
                  width={8}
                  height={8}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4">
          <div className="w-full py-5 h-[calc(70vh/1.3)] scrollbar-hidden overflow-y-auto  overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                {dataToUse.map((item, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td>
                      <ClassItem
                        // selected={false}
                        count={index + 1}
                        totalItems={dataToUse.length}
                        id={item.id}
                        studentClass={item.name}
                        numberOfStudents={item.studentsCount}
                        fees={item.totalFees}
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

export default ClassTable;
