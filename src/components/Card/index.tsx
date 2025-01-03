import { TransactionstatuscardProps } from "@/types";
import React from "react";

const Card: React.FC<TransactionstatuscardProps> = ({
  backgroundColor,
  caption,
  count,
  borderColor,
}) => {
  return (
    <div
      className={`${
        backgroundColor ? backgroundColor : "bg-white"
      } rounded-md border-2 ${
        borderColor ? borderColor : "border-white"
      } flex flex-col p-4 md:gap-5 gap-3 w-full`}
    >
      <div className="text-sm md:text-xs font-[500] text-textcolor">
        {caption}
      </div>
      <div className="text-3xl font-[600] text-textcolor md:pb-12">{count}</div>
    </div>
  );
};
export default Card;
