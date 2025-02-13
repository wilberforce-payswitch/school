import { AdminItemProps } from "@/types";

const AdminItem: React.FC<AdminItemProps> = ({
  id,
  studentname,
  studentclass,
  term,
  count,
  totalItems,
}) => {
  return (
    <div
      className={`${count === 1 && "mt-24"}  ${
        count == totalItems && "mb-10"
      } text-xs flex flex-col items-center w-full`}
    >
      <div className="w-full text-neutral-700 flex items-center">
        <div className="flex w-full grow items-center py-2">
          <div className="w-full truncate">{id}</div>
          <div className="w-full truncate">{studentname}</div>
          <div className="w-full truncate">{studentclass}</div>
          <div className="w-full truncate">{term}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminItem;
