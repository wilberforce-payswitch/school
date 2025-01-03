import Image from "next/image";
import AdminItem from "./adminitem";
import { AdminTableProps } from "@/types";

const AdminTable: React.FC<AdminTableProps> = ({
  data,
  maxCount = 2,
  maxPage = 3,
}) => {
  const sampleData = [
    {
      id: 1,
      studentname: "John Doe",
      studentimage: "/avatar.jpg",
      studentclass: "Class A",
      term: "Term 1",
      payment: 100,
      balances: 0,
    },
    {
      id: 2,
      studentname: "Jane Smith Awuku",
      studentimage: "/avatar.jpg",
      studentclass: "Class B",
      term: "Term 2",
      payment: 100,
      balances: 100,
    },
    {
      id: 1,
      studentname: "John Doe",
      studentimage: "/avatar.jpg",
      studentclass: "Class A",
      term: "Term 1",
      payment: 100,
      balances: 0,
    },
    {
      id: 2,
      studentname: "Jane Smith",
      studentimage: "/avatar.jpg",
      studentclass: "Class B",
      term: "Term 2",
      payment: 100,
      balances: 100,
    },
    {
      id: 1,
      studentname: "John Doe",
      studentimage: "/avatar.jpg",
      studentclass: "Class A",
      term: "Term 1",
      payment: 100,
      balances: 0,
    },
    {
      id: 2,
      studentname: "Jane Smith",
      studentimage: "/avatar.jpg",
      studentclass: "Class B",
      term: "Term 2",
      payment: 100,
      balances: 100,
    },
    {
      id: 1,
      studentname: "John Doe",
      studentimage: "/avatar.jpg",
      studentclass: "Class A",
      term: "Term 1",
      payment: 100,
      balances: 0,
    },
    {
      id: 2,
      studentname: "Jane Smith",
      studentimage: "/avatar.jpg",
      studentclass: "Class B",
      term: "Term 2",
      payment: 100,
      balances: 100,
    },
    {
      id: 1,
      studentname: "John Doe",
      studentimage: "/avatar.jpg",
      studentclass: "Class A",
      term: "Term 1",
      payment: 100,
      balances: 0,
    },
    {
      id: 2,
      studentname: "Jane Smith",
      studentimage: "/avatar.jpg",
      studentclass: "Class B",
      term: "Term 2",
      payment: 100,
      balances: 100,
    },
  ];

  const dataToUse = data.length > 0 ? data : sampleData;

  return (
    <div className="min-w-96 mx-5  mt-5  rounded-xl overflow-y-hidden overflow-x-scroll shadow-sm border scrollbar-hidden md:block">
      <div className="w-full relative">
        <div className="w-full absolute bg-slate-200 text-white  z-10 backdrop-blur-sm top-0">
          <div className="flex flex-col ">
            <div className="flex flex-row justify-between mx-4 mb-6 mt-4">
              <div className="flex flex-row justify-between items-center gap-3">
                <div className="flex items-center border border-searchboxcolor shadow-sm rounded-lg bg-white px-2 py-2 w-full">
                  <Image
                    src="/search.svg"
                    alt="search"
                    width={16}
                    height={16}
                  />
                  <input
                    type="text"
                    placeholder="Search..."
                    className="ml-2 text-sm font-[400] text-searchtextcolor focus:outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex w-full text-xs pb-3 font-bold text-neutral-800">
              <div className="flex w-full grow items-start">
                <div className="w-1/5 pl-5 truncate ">ID</div>
                <div className="w-full truncate">STUDENT</div>
                <div className="w-full truncate">CLASS</div>
                <div className="w-full truncate">TERM</div>
                <div className=" w-full truncate">PAYMENT</div>
                <div className=" w-full truncate">BALANCE</div>
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
          <div className="w-full py-5 h-[calc(100vh/1.3)] scrollbar-hidden overflow-y-auto  overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                {dataToUse.map((item, index) => (
                  <tr
                    key={index}
                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td>
                      <AdminItem
                        selected={false}
                        count={index + 1}
                        totalItems={dataToUse.length}
                        id={item.id}
                        studentname={item.studentname}
                        studentimage={item.studentimage}
                        studentclass={item.studentclass}
                        term={item.term}
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
