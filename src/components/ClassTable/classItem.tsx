import {  ClassItemProps } from "@/types";


const ClassItem: React.FC<ClassItemProps> = ({
  id,
  studentClass,
  numberOfStudents,
  fees,
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
        <div className="flex w-full grow gap-10 items-center py-2">
          <div className="w-full pl-5">{id}</div>
          <div className="w-full pl-5 truncate">{studentClass}</div>
          <div className="w-full truncate">{numberOfStudents}</div>
          <div className="w-full pr-10 truncate">GH₵ {fees}</div>
        </div>
      </div>
    </div>
  );
};

export default ClassItem;
