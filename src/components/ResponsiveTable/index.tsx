import React from "react";
import Loader from "../TableLoader"; 

type ColumnConfig<T = Record<string, any>> = {
  id: keyof T;
  header: string;
  width?: string;
  format?: (value: any, row: T, index?: number) => React.ReactNode;
};

type TableProps<T = Record<string, any>> = {
  columns: ColumnConfig<T>[];
  data: T[];
  isFetching: boolean;
  position: number;
  isTransactions?: boolean;
};

const ResponsiveTable = <T extends Record<string, any>>({
  columns,
  data,
  isFetching,
  position,
  isTransactions = false,
}: TableProps<T>) => {
  // Render based on conditions
  let content;
  if (isFetching) {
    content = (
      <div className="pt-[75px] text-lg flex">
        <Loader />
      </div>
    );
  } else if (data.length === 0) {
    content = (
      <div
        className={`p-2 ${
          isTransactions ? "h-[90vh]" : "h-[70vh]"
        } text-xs md:text-sm flex items-center justify-center`}
      >
        No Data Found
      </div>
    );
  } else {
    content = (
      <div className="w-full pt-4 bg-gray-50 overflow-y-auto">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-[#F4F7FCBF] text-transactiontextcolor">
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.id)}
                  className={`px-4 py-3 ${column.width || ""} text-left text-xs font-medium`}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => {
              const actualIndex = position + rowIndex;
              return (
                <tr
                  key={rowIndex}
                  className={`text-sm ${
                    rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50"
                  }`}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    const content = column.format
                      ? column.format(value, row, actualIndex)
                      : value;
                    return (
                      <td
                        key={`${rowIndex}-${String(column.id)}`}
                        className={`px-4 py-3 ${column.width || ""} text-xs lg:text-sm`}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }

  return <div className="w-full bg-white">{content}</div>;
};

export default ResponsiveTable;