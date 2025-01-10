import { X } from "lucide-react";
import Image from "next/image";
import React from "react";
import ReactDOM from "react-dom";

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onAction: () => void;
  children: React.ReactNode;
  actionLabel?: string;
};

const Modal = ({
  title,
  isOpen,
  onClose,
  onAction,
  children,
  actionLabel = "Register",
}: Props) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-50 p-4">
      <div className="relative w-full max-w-md rounded-xl bg-white shadow-lg min-h-[420px] flex flex-col">
        <div className="relative h-20 bg-gray-200 rounded-t-xl">
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
        </div>

        <div className="p-4 mt-5">{children}</div>

        <div className="flex justify-center p-10">
          <button
            className="w-1/2 justify-center items-center py-3 bg-blue-800 text-white font-medium rounded-xl hover:bg-blue-900"
            onClick={onAction}
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
