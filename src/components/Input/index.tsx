import { LucideIcon } from "lucide-react";
import React from "react";

type Props = {
  placeholder: string;
  icon: LucideIcon;
  type: string;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = ({ id, placeholder, icon: Icon, type, value, onChange }: Props) => {
  const inputStyles =
    "w-full focus:outline-none text-black placeholder:text-neutral-800 pl-2";
  return (
    <div className="flex w-full rounded border-gray-400 p-2 shadow-sm focus-within:outline-none focus-within:ring-2  focus-within:ring-blue-600 focus:border-transparent">
      <Icon size={22} />
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className={inputStyles}
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
