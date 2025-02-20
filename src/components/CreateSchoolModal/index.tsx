import { AtSign, MapPinHouse, Phone, School, X } from "lucide-react";
import React from "react";

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  schoolName: string;
  setSchoolName: (value: string) => void;
  schoolAddress: string;
  setSchoolAddress: (value: string) => void;
  schoolPhone: string;
  setSchoolPhone: (value: string) => void;
  schoolEmail: string;
  setSchoolEmail: (value: string) => void;
  termsPerYear: number;
  setTermsPerYear: (value: number) => void;
  createSchool: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  creatingSchool: boolean;

};

const CreateSchoolModalOpen = ({
  title,
  isOpen,
  onClose,
  schoolName,
  setSchoolName,
  schoolAddress,
  setSchoolAddress,
  schoolPhone,
  setSchoolPhone,
  schoolEmail,
  setSchoolEmail,
  termsPerYear,
  setTermsPerYear,
  createSchool,
  creatingSchool
}: Props) => {
  if (!isOpen) return;
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
            {/* <Image
              src={`/oneheart.jpg`}
              width={70}
              height={70}
              alt="school-logo"
              className="rounded-full border-4 border-white"
            /> */}
          </div>

          <div className="p-4 mt-8 w-full h-64 overflow-y-auto scrollbar">
            <form onSubmit={createSchool} className="flex flex-col justify-center items-center mt-4 space-y-10">
              <div className="flex w-full rounded border-gray-400 p-2 shadow-sm focus-within:outline-none focus-within:ring-2  focus-within:ring-blue-600 focus:border-transparent">
                <School />
                <input
                  value={schoolName}
                  onChange={(e)=> setSchoolName(e.target.value)}
                  placeholder="Enter School name"
                  className="w-full focus:outline-none text-black placeholder:text-neutral-800 pl-2"
                />
              </div>
              <div className="flex w-full rounded border-gray-400 p-2 shadow-sm focus-within:outline-none focus-within:ring-2  focus-within:ring-blue-600 focus:border-transparent">
                <MapPinHouse />
                <input
                  value={schoolAddress}
                  onChange={(e)=> setSchoolAddress(e.target.value)}
                  placeholder="Enter School Address"
                  className="w-full focus:outline-none text-black placeholder:text-neutral-800 pl-2"
                />
              </div>
              <div className="flex w-full rounded border-gray-400 p-2 shadow-sm focus-within:outline-none focus-within:ring-2  focus-within:ring-blue-600 focus:border-transparent">
                <Phone />
                <input
                  value={schoolPhone}
                  onChange={(e) => {
                    const numericValue = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
                    setSchoolPhone(numericValue);
                  }}
                  maxLength={10}
                  type="tel"
                  placeholder="0302000000"
                  className="w-full focus:outline-none text-black placeholder:text-neutral-800 pl-2"
                />
              </div>
              <div className="flex w-full rounded border-gray-400 p-2 shadow-sm focus-within:outline-none focus-within:ring-2  focus-within:ring-blue-600 focus:border-transparent">
                <AtSign />
                <input
                  value={schoolEmail}
                  onChange={(e)=> setSchoolEmail(e.target.value)}
                  placeholder="school@gmail.com"
                  className="w-full focus:outline-none text-black placeholder:text-neutral-800 pl-2"
                />
              </div>
              <div className="flex w-full rounded border-gray-400 p-2 shadow-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus:border-transparent">
                <select
                  value={termsPerYear}
                  onChange={(e) => setTermsPerYear(Number(e.target.value))}
                  className="w-full focus:outline-none text-black placeholder:text-neutral-800 pl-2"
                >
                  <option value="" disabled>
                    Select number of terms
                  </option>
                  <option value="1">1 Term</option>
                  <option value="2">2 Terms</option>
                  <option value="3">3 Terms</option>
                  <option value="4">4 Terms</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-1/2 justify-center bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900"
              >
                
                {creatingSchool ? "Creating School..." : "Create School"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSchoolModalOpen;
