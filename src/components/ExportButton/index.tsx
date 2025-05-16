import { useState, useEffect, useRef } from "react";
import Spinner from "../Spinner";
import Export from '@/assets/icons/addicon.svg';
import Image from "next/image";

interface ExportButtonProps {
  onClick: (format: string) => void;
  isExporting?: boolean;
}

export const ExportButton: React.FC<ExportButtonProps> = ({
  onClick,
  isExporting,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleFormatSelect = (format: string) => {
    setShowDropdown(false);
    onClick(format);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <div className="hidden md:block">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className={`rounded-md flex gap-2 items-center text-xs md:text-sm h-10 px-2 md:px-4 py-2.5 text-center bg-[#4CAF50] text-white stroke-white`}
        >
          {isExporting ? (
            <Spinner />
          ) : (
            <Image src={Export} width={17} height={17} alt="Export" />
          )}
          Export
        </button>
      </div>
      <div className="md:hidden">
        <button
          className={`h-[40px] w-[40px] text-white bg-[#4CAF50] border border-searchboxcolor shadow-sm rounded-lg py-1 px-2 flex items-center justify-center`}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {isExporting ? (
            <Spinner />
          ) : (
            <img src="icons/addicon.svg" width={17} height={17} alt="Export" />
          )}
        </button>
      </div>
      {showDropdown && (
        <div className="absolute top-12 md:top-16 right-2 pb-2 md:right-4 bg-white shadow-lg rounded-md">
          <ul className="rounded-md text-black text-sm font-[600]">
            <li className="pl-5 pr-8 py-2 text-captextcolor">Export as</li>
            <li
              className="pl-5 pr-8 py-2 hover:bg-gray-100  gap-2 cursor-pointer flex"
              onClick={() => handleFormatSelect("pdf")}
            >
              <img src="icons/pdf.png" width={22} height={6} alt="Png" />
              PDF File (.pdf)
            </li>
            <li
              className="pl-5 pr-8 py-2 hover:bg-gray-100   gap-2  cursor-pointer flex"
              onClick={() => handleFormatSelect("csv")}
            >
              <img src="icons/file.png" width={22} height={6} alt="Export" />
              CSV File (.csv)
            </li>
            <li
              className="pl-5 pr-8 py-2 hover:bg-gray-100   gap-2  cursor-pointer flex"
              onClick={() => handleFormatSelect("xls")}
            >
              <img src="icons/xls.png" width={22} height={6} alt="Export" />{" "}
              Spreadsheet File (.xls)
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
