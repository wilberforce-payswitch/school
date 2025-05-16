/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "@/app/redux";
import {
  useDownloadExportMutation,
  useGetSuperAdminTransactionHistoryQuery,
} from "@/state/api";
import React, { useState } from "react";
import Spinner from "../Spinner";
import Image from "next/image";
import Back from "@/assets/icons/back.svg";
import Forward from "@/assets/icons/forward.svg";
import Search from "@/assets/icons/search.svg";
import Refresh from "@/assets/icons/refresh.svg";
import Filter from "@/assets/icons/filter-search.svg";
import { ExportButton } from "../ExportButton";
import ResponsiveTable from "@/components/ResponsiveTable";
import FilterModal from "../FilterModal";

const SuperAdminTransactions = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filter, setFilter] = useState(false);
  const [filterValues, setFilterValues] = useState<any>({});

  const user = useAppSelector((state) => state.global.auth?.user);

  const { data, isLoading, isError } = useGetSuperAdminTransactionHistoryQuery(
    {
      page,
      searchTerm: search,
      per_page: rowsPerPage,
      status: filterValues.status,
      startDate: filterValues.date?.from,
      endDate: filterValues.date?.to,
    },
    { skip: user?.roleId !== 1 }
  );

  const [downloadExport, { isLoading: Exporting }] =
    useDownloadExportMutation();

  const allTransactions = data?.data?.transactions ?? [];
  const count = data?.total ?? 0;
  const totalPages = data?.last_page ?? 1;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    setSearch(searchTerm);
    setPage(1);
  };

  const handleApplyFilters = (filters: any) => {
    setFilterValues(filters);
    setIsFilterModalOpen(false);
    setPage(1);
  };

  const handleResetFilters = () => {
    setFilterValues({});
    setIsFilterModalOpen(false);
    setPage(1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearchSubmit();
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setSearchTerm("");
    setSearch("");
    setPage(1);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  const handleExport = async () => {
    try {
      const { url } = await downloadExport().unwrap();

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "transactions.xlsx");
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed", error);
    }
  };

  const columns = [
    {
      id: "id",
      header: "#",
      width: "w-20",
      format: (_: any, __: any, index?: number) =>
        index !== undefined ? (page - 1) * rowsPerPage + index + 1 : "-",
    },
    { id: "transaction_id", header: "Transaction ID", width: "w-1/7" },
    { id: "school_name", header: "SCHOOL NAME ", width: "w-1/7" },
    { id: "amount", header: "AMOUNT", width: "w-1/7" },
    {
      id: "status",
      header: "STATUS",
      width: "w-1/7",
      format: (value: string) => (
        <div
          className={`px-2 py-1 rounded-full text-white text-center text-xs ${getStatusClass(
            value
          )}`}
        >
          {value}
        </div>
      ),
    },
    { id: "created_at", header: "PAYMENT DATE", width: "w-1/7" },
  ];

  if (isLoading) return <Spinner size={32} />;
  if (isError || !data) return <p>Error loading payments</p>;

  return (
    <div className="w-full h-full bg-white px-5 py-5 md:py-8 md:px-8">
      <div className="h-full">
        <div className="rounded-xl overflow-y-hidden overflow-x-scroll shadow-sm border scrollbar-hidden md:block h-full">
          <div className="w-full relative h-full">
            <div className="flex flex-col bg-gray-50">
              <div className="flex flex-row justify-between gap-5 mx-2 md:mx-4 mt-2 md:mt-4">
                <div className="flex flex-row items-center gap-2 md:gap-3 relative">
                  <div className="flex items-center border border-searchboxcolor shadow-sm rounded-lg bg-white h-10 px-2 py-2 w-2/3">
                    <Image src={Search} alt="search-icon" />
                    <input
                      type="text"
                      placeholder="Search Name or ID"
                      className="ml-2 text-xs md:text-sm w-full font-normal text-black focus:outline-none bg-transparent"
                      value={searchTerm}
                      onChange={handleSearchChange}
                      onKeyDown={handleKeyDown}
                    />
                  </div>
                  <div className="relative z-50">
                    <button
                      className={`h-[40px] w-[40px] bg-white border border-searchboxcolor shadow-sm rounded-lg py-1 px-2 flex items-center justify-center ${
                        filter && "active-btn-glow"
                      } `}
                      onClick={() => {
                        setIsFilterModalOpen((prev) => !prev);
                      }}
                    >
                      <Image src={Filter} alt="filter" />
                    </button>

                    <div className="absolute text-black top-[100%] mt-2 left-0 w-fit bg-white border border-gray-200 shadow-lg rounded-lg z-50 hidden lg:block">
                      {isFilterModalOpen && (
                        <FilterModal
                          title={""}
                          filter={filter}
                          onResetClick={handleResetFilters}
                          onApplyFilters={handleApplyFilters}
                          ontapoutside={true}
                          isLoading={false}
                        />
                      )}
                    </div>
                  </div>
                  <button
                    className="h-[40px] w-[40px] bg-white border border-searchboxcolor shadow-sm rounded-lg p-2 flex items-center justify-center"
                    onClick={handleRefresh}
                  >
                    {isRefreshing ? (
                      <Spinner />
                    ) : (
                      <Image
                        src={Refresh}
                        alt="refresh-icon"
                        width={14}
                        height={14}
                      />
                    )}
                  </button>
                </div>

                <ExportButton isExporting={Exporting} onClick={handleExport} />
              </div>
            </div>

            <ResponsiveTable
              isTransactions={true}
              columns={columns}
              data={allTransactions}
              isFetching={isLoading}
              position={(page - 1) * rowsPerPage}
            />
            
            <div className="flex justify-between absolute bottom-0 bg-[#F4F7FCBF] w-full z-20 backdrop-blur-sm flex-row text-headercolor text-xs px-5 py-3">
              <div className="flex flex-row items-center gap-1">
                <div>
                  {allTransactions.length > 0
                    ? (page - 1) * rowsPerPage + 1
                    : 0}{" "}
                  to {Math.min(page * rowsPerPage, count)} of {count}
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
                      setPage(1); // Reset to first page
                    }}
                  >
                    {[10, 25, 50, 100].map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
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
                    {allTransactions.length > 0 ? page : 0}/{totalPages}
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

export default SuperAdminTransactions;

const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "success":
      return "bg-green-500";
    case "pending":
      return "bg-yellow-500";
    case "failed":
      return "bg-red-500";
    default:
      return "bg-gray-300";
  }
};
