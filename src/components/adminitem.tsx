// import Image from "next/image";

import { AdminItemProps } from "@/types";


const AdminItem: React.FC<AdminItemProps> = ({
  id,
  // studentimage,
  studentname,
  studentclass,
  term,
  payment,
  balances,
  count,
  totalItems,
  // selected,
}) => {
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
              {/* <div className="rounded-full overflow-hidden">
                <Image
                  src={studentimage}
                  alt="Student Image"
                  width={50}
                  height={50}
                  style={{ objectFit: "cover" }}
                />
              </div> */}
              <div>{studentname}</div>
            </div>
          </div>
          <div className="w-full truncate">{studentclass}</div>
          <div className="w-full truncate">{term}</div>
          <div className="w-full truncate">GHS {payment}</div>
          <div className="w-full truncate">GHS {balances}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminItem;
