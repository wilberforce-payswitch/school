import { Users, X } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  className: string;
  setClassName: (value: string) => void;
  createClass:(e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  creatingClass: boolean
};

const Modal = ({ title, isOpen, onClose, className, setClassName, createClass, creatingClass }: Props) => {
 

  if (!isOpen) return

  return (
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-50 p-4">
      <div className="relative w-full max-w-md rounded-xl bg-white shadow-lg min-h-[420px] flex flex-col">
        <div className="relative h-20 bg-gray-200 rounded-t-x</div>l">
          <div className="flex py-2 items-center justify-between px-4">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button
              className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
              onClick={onClose}
            >
              <X size={18} />
            </button>
          </div>
          <div className="absolute -bottom-10 left-4">
            <Image
              src={`/oneheart.jpg`}
              width={70}
              height={70}
              alt="school-logo"
              className="rounded-full border-4 border-white"
            />
          </div>

          <div className="p-4 mt-20 w-full">
            <form className="flex flex-col justify-center items-center mt-4 space-y-10" onSubmit={createClass}>
              <div className="flex w-full rounded border-gray-400 p-2 shadow-sm focus-within:outline-none focus-within:ring-2  focus-within:ring-blue-600 focus:border-transparent">
                <Users />
                <input
                value={className}
                onChange={(e)=> setClassName(e.target.value)}
                  placeholder="Enter class name"
                  className="w-full focus:outline-none text-black placeholder:text-neutral-800 pl-2"
                />
              </div>
              <button
              type="submit"
              className={`w-1/2 justify-center  text-white py-2 rounded-md  ${className ?  "bg-blue-800 hover:bg-blue-900" : "bg-blue-800 text-white bg-opacity-50 cursor-not-allowed"} `}
              disabled={creatingClass || !className}
            >
            {creatingClass ? "Creating Class..." : "Create Class"}
            </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
