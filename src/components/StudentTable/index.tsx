import { PaymentResponse } from "@/types";
import StudentItem from "./studentItem";
import LoadingSpinner from "../Spinner";
import { Search } from "lucide-react";

type Props = {
  data: PaymentResponse;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  loading: boolean;
};

const PaymentHistoryTable = ({ data, setSearch, setPage, loading }: Props) => {
  

  const currentPage = data?.current_page;
  const lastPage = data?.last_page;
  const paginatedData = data?.data;

  if (loading) {
    return (
      <div className="justify-center text-center items-center mt-10">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      {paginatedData.length > 0 && (
        <div className="min-w-96 mx-5 rounded-xl overflow-y-hidden overflow-x-scroll shadow-sm border scrollbar-hidden md:block">
          <div className="w-full relative">
            <div className="w-full absolute bg-slate-200 text-white z-10 backdrop-blur-sm top-0">
              <div className="flex flex-col">
                <div className="pb-4 bg-white">
                  <label htmlFor="table-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative mt-1">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                      <Search color="gray" />
                    </div>
                    <input
                      type="text"
                      id="table-search"
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setPage(1); 
                      }}
                      className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50"
                      placeholder="Search for payments"
                    />
                  </div>
                </div>
                <div className="flex w-full text-xs pb-3 font-bold text-neutral-800">
                  <div className="flex w-full grow items-start">
                    <div className="w-1/5 pl-5 truncate">ID</div>
                    <div className="w-full truncate">NAME</div>
                    <div className="w-full truncate">CLASS</div>
                    <div className="w-full truncate">TERM</div>
                    <div className="w-full truncate">PAYMENT</div>
                    <div className="w-full truncate">STATUS</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col gap-4">
              <div className="w-full py-5 h-[calc(100vh/1.3)] scrollbar-hidden overflow-y-auto overflow-x-auto">
                <table className="w-full border-collapse">
                  <tbody>
                    {paginatedData.map((item, index) => (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td>
                          <StudentItem
                            selected={false}
                            totalItems={data?.data?.length}
                            id={item.id}
                            studentName={item.studentName}
                            studentClass={item.className}
                            termName={item.termName}
                            amount={item.amount}
                            balances={item.status}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <nav className="flex items-center justify-between pt-4" aria-label="Table navigation">
          <button
            onClick={() => setPage( currentPage -1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 border ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:bg-gray-100'
            }`}
          >
            Previous
          </button>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            Page <span className="font-semibold text-gray-900 dark:text-white">{currentPage}</span> of <span className="font-semibold text-gray-900 dark:text-white">{lastPage}</span>
          </span>
          <button
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage === lastPage}
            className={`px-4 py-2 border ${
              currentPage === lastPage
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:bg-gray-100'
            }`}
          >
            Next
          </button>
        </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentHistoryTable;
