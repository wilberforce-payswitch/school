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
      <div className="text-sm md:text-xs font-[700] text-neutral-900">
        {caption}
      </div>
      <div className="text-3xl font-[800] text-neutral-800 md:pb-12">{count}</div>
    </div>
  );
};
export default Card;
