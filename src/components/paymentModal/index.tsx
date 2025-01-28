import { X } from "lucide-react";
import React from "react";
import ReactDOM from "react-dom";

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const PaymentModal = ({
  title,
  isOpen,
  onClose,
  children,
}: Props) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-50 p-4">
      <div className="relative w-full max-w-md rounded-xl bg-white shadow-lg min-h-[80px] flex flex-col">
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
        </div>

        <div className="p-4 mt-5">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default PaymentModal;
