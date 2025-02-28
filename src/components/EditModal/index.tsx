import { useCreateClassFeesMutation } from "@/state/api";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  selectedClassId: string;
  setSelectedClassId: (id: string) => void;
  terms: any[];
  //   creatingClass: boolean
  classes: any[];
  userSchoolId: string | undefined;
  years: any[];
};

const EditModal = ({
  isOpen,
  onClose,
  classes,
  selectedClassId,
  setSelectedClassId,
  userSchoolId,
  years,
}: Props) => {
  const [createFees, { isLoading: creatingFees }] =
    useCreateClassFeesMutation();
  const [academicYearId, setAcademicYearId] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    academic_year_id: academicYearId,
    class_id: selectedClassId,
    due_date: "",
  });

  useEffect(() => {
    setFormData((prev) => ({ ...prev, academic_year_id: academicYearId }));
    setFormData((prev) => ({ ...prev, class_id: selectedClassId }));
  }, [academicYearId, selectedClassId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  console.log(formData.class_id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      amount: Number(formData.amount),
      school_id: userSchoolId,
    };
    try {
    const response = await createFees(submissionData);
    console.log(JSON.stringify(response, null, 3));
    if (response.data){
      toast.success(response?.data?.message);
      setFormData({
        name: "",
        amount: "",
        academic_year_id: "",
        class_id: "",
        due_date: "",
      });
    }
    
    } catch (err) {
      console.log(JSON.stringify(err))
    }
   
  };

  if (!isOpen) return;

  return (
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-50 p-4">
      <div className="relative w-full max-w-md rounded-xl bg-white shadow-lg h-[60%] flex flex-col">
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

          <div className="p-4 mt-8 w-full">
            <div className="p-4 h-[421px] overflow-y-auto">
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Fee Name"
                />
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  placeholder="Amount"
                />
                <select
                  className="ml-2 pl-3 h-10 text-sm font-[400] border border-gray-500 rounded-md text-black focus:outline-none bg-transparent w-[60%]"
                  onChange={(e) => setAcademicYearId(e.target.value)}
                >
                  <option value="">Select Year</option>
                  {years?.map((year) => (
                    <option key={year?.id} value={year?.id}>
                      {year?.year}
                    </option>
                  ))}
                </select>

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

                <input
                  type="date"
                  name="due_date"
                  value={formData.due_date}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
