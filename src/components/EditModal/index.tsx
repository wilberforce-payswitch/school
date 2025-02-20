import { X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedClassId: string;
  setSelectedClassId: (id: string) => void;
  terms: any[];
  //   creatingClass: boolean
  classes: any[];
};

const EditModal = ({
  isOpen,
  onClose,
  classes,
  setSelectedClassId,
  terms,
}: Props) => {
  const [editTerm, setEditTerm] = useState(null);
  const [updatedTerm, setUpdatedTerm] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTerm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditClick = (term) => {
    setEditTerm(term.id);
    setUpdatedTerm(term);
  };

  if (!isOpen) return;

  return (
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-50 p-4">
      <div className="relative w-full max-w-md rounded-xl bg-white shadow-lg min-h-full flex flex-col">
        <div className="relative h-20 bg-gray-200 rounded-t-x</div>l">
          <div className="flex py-2 items-center justify-between px-4">
            <h2 className="text-lg font-semibold">Title</h2>
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

          <div className="p-4 mt-20 w-full">
            <select
              className="ml-2 pl-3 h-10 text-sm font-[400] border border-gray-500 rounded-md text-black focus:outline-none bg-transparent w-[60%]"
              onChange={(e) => setSelectedClassId(e.target.value)}
            >
              <option value="">Select Class</option>
              {classes?.map((classItem) => (
                <option key={classItem.id} value={classItem.id}>
                  {classItem.name}
                </option>
              ))}
            </select>
            <div className="p-4 h-[421px] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">Terms</h2>
              <ul className="space-y-4">
                {terms.map((term) => (
                  <li key={term.id} className="border p-4 rounded-lg shadow-md">
                    {editTerm === term.id ? (
                      <>
                        <input
                          type="text"
                          name="name"
                          value={updatedTerm.name}
                          onChange={handleChange}
                          className="border p-2 rounded w-full mb-2"
                        />
                        <input
                          type="number"
                          name="fee_amount"
                          value={updatedTerm.fee_amount}
                          onChange={handleChange}
                          className="border p-2 rounded w-full mb-2"
                        />
                        <input
                          type="date"
                          name="start_date"
                          value={updatedTerm.start_date}
                          onChange={handleChange}
                          className="border p-2 rounded w-full mb-2"
                        />
                        <input
                          type="date"
                          name="end_date"
                          value={updatedTerm.end_date}
                          onChange={handleChange}
                          className="border p-2 rounded w-full mb-2"
                        />
                        <button
                          className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
                          //   onClick={handleSave}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                          //   onClick={() => setEditTerm(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <p>
                          <strong>Name:</strong> {term.name}
                        </p>
                        <p>
                          <strong>Fee:</strong>GH₵{term.fee_amount}
                        </p>
                        <p>
                          <strong>Start Date:</strong> {term.start_date}
                        </p>
                        <p>
                          <strong>End Date:</strong> {term.end_date}
                        </p>
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                          onClick={() => handleEditClick(term)}
                        >
                          Edit
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
