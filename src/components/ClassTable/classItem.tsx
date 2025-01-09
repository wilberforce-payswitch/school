import {  ClassItemProps } from "@/types";


const ClassItem: React.FC<ClassItemProps> = ({
  id,
  studentClass,
  numberOfStudents,
  numberofCompletedFees,
  numberStillOwing,
  count,
  totalItems
}) => {
  return (
    <div
      className={`${count === 1 && "mt-5"}  ${
        count == totalItems && "mb-10"
      } text-xs flex flex-col items-center w-full`}
    >
      <div className="w-full text-neutral-800 flex items-center">
        <div className="flex w-full grow items-center py-2">
          <div className="w-1/5 pl-5 truncate">{id}</div>
          <div className="w-full truncate">{studentClass}</div>
          <div className="w-full truncate">{numberOfStudents}</div>
          <div className="w-full truncate">{numberofCompletedFees}</div>
          <div className="w-full truncate">{numberStillOwing}</div>
        </div>
      </div>
    </div>
  );
};

export default ClassItem;
