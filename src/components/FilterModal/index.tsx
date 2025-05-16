/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import CustomDropdown from "../CustomDropdown";
import Spinner from "../Spinner";

interface FilterModalProps {
  ontapoutside?: boolean;
  title: string;
  onApplyFilters: (filters: any) => void;
  onResetClick: () => void;
  issalesmode?: boolean;
  isposcardtransactions?: boolean;
  istransfers?: boolean;
  istransferstwo?: boolean;
  isLoading?: boolean;
  filter?: any;
}

const FilterModal: React.FC<FilterModalProps> = ({
  onApplyFilters,
  onResetClick,
  isLoading,
  filter,
}) => {
  const [status, setStatus] = useState<string>(filter?.status ?? "");
  const [fromDate, setFromDate] = useState<string>(filter?.date?.from ?? "");
  const [toDate, setToDate] = useState<string>(filter?.date?.to ?? "");

  const dropdownRef = useRef<HTMLDivElement>(null);

  const applyFilters = () => {
    onApplyFilters({ status, date: { from: fromDate, to: toDate } });
  };

  // useEffect(() => {

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <div ref={dropdownRef}>
        <div className="bg-white w-full pb-10 rounded-lg shadow-lg select-none">
          <h2 className="text-sm p-5 w-full text-black font-semibold">Filter by:</h2>
          <div className="px-5 gap-3 flex flex-col">
            <CustomDropdown
              onChange={setStatus}
              caption="Status"
              defaultValue={status}
              options={[
                { label: "Pending", value: "pending" },
                { label: "Successful", value: "success" },
                { label: "Failed", value: "failed" },
              ]}
            />
            <div className="flex gap-3">
              <div className="flex flex-col text-sm gap-1 flex-1">
                <label htmlFor="from-date">From:</label>
                <input
                  type="date"
                  id="from-date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="border text-sm rounded-md border-gray-200 h-10 px-2 w-full"
                />
              </div>
              <div className="flex flex-col text-sm gap-1 flex-1">
                <label htmlFor="to-date">To:</label>
                <input
                  type="date"
                  id="to-date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="border text-sm rounded-md border-gray-200 h-10 px-2 w-full"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-5">
              <button onClick={onResetClick} className="bg-white text-black px-4 py-2 rounded border">Reset</button>
              <button onClick={applyFilters} className="bg-green-600 text-white px-6 py-2 rounded">
                {isLoading ? <Spinner /> : "Set Filter"}
              </button>
            </div>
          </div>
        </div>
    </div>
  );
};

export default FilterModal;