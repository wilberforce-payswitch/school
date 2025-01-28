

import { StudentItemProps } from "@/types";


const StudentItem: React.FC<StudentItemProps> = ({
  id,
  // studentimage,
  studentName,
  studentClass,
  termName,
  amount,
  balances,
  count,
  totalItems,
  // selected,
}) => {
  const balanceStatusClass = balances === "success" ? "bg-green-400 mr-5 px-2 py-2 rounded-md" : balances === "failed" ? "bg-red-200" : "";
  return (
    <div
      className={`${count === 1 && "mt-24"}  ${
        count == totalItems && "mb-10"
      } text-xs flex flex-col items-center w-full`}
    >
      <div className="w-full text-neutral-700 flex items-center">
        <div className="flex w-full grow items-center py-2">
          <div className="w-1/5 pl-5 truncate">{id}</div>
          <div className="flex w-full flex-row items-center gap-2 font-[600]">
            <div className=" p-2 pr-3 flex items-center gap-2">
              <div>{studentName}</div>
            </div>
          </div>
          {/* <div className="w-full truncate">{studentName}</div> */}
          <div className="w-full truncate">{studentClass}</div>
          <div className="w-full truncate">{termName}</div>
          <div className="w-full truncate">GHS {amount}</div>
          <div className={`w-full truncate p-2 ${balanceStatusClass}`}>
            {balances}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentItem;
