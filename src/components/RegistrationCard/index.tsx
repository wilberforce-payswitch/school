"use client";

import { LucideIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  label: string;
  icon: LucideIcon;
  source: string;
  onClick: () => void;
};

const RegistrationCard = ({ icon: Icon, label, source, onClick }: Props) => {
  const [isHovered, setIsHovered] = React.useState(false);
  // console.log(source)
  return (
    <div className="relative bg-white shadow-xl mt-5 h-80 rounded-lg p-2 w-96 text-center">
      <Image
        alt="admin"
        src={source}
        width={400}
        height={50}
        className="w-full h-full object-cover rounded"
      />
      <button
        className="absolute shadow-3xl shadow-blue-800 bg-white opacity-95 w-3/4 left-1/2 transform -translate-x-1/2 text-blue-900  h-12 z-10 backdrop-blur-3xl rounded-md bottom-8 border-b-2 border-l-2 border-[#1e3a8a] border-opacity-70 hover:text-white hover:bg-blue-900"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <div className="flex items-center justify-center gap-2">
          <Icon size={22} color={isHovered ? "#ffffff" : "#1e3a8a"} />
          <div className="font-[600]">{label}</div>
        </div>
      </button>
    </div>
  );
};

export default RegistrationCard;
