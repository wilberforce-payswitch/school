import React, { useState } from "react";
import { Save } from "lucide-react";
import FormField from "@/components/FeeFormField";
import Button from "@/components/FeeFormButton";
import { useAppSelector } from "@/app/redux";
import { useCreateAdditionalFeesMutation, useGetTermsforAClassQuery } from "@/state/api";
import { skipToken } from "@reduxjs/toolkit/query";
import toast, { Toaster } from "react-hot-toast";


const AdditionalFeeForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    term_id: "",
  });
 

  const schoolId = useAppSelector(
    (state) => state.global.auth?.user?.school.id
  );
  const user = useAppSelector((state) => state.global.auth?.user);

  const { data: Terms } = useGetTermsforAClassQuery(
    schoolId ? { school_id: schoolId } : skipToken,
    { skip: user?.roleId !== 2 }
  );

  const [createFees] = useCreateAdditionalFeesMutation()

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: formData.name,
        amount: Number(formData?.amount),
        term_id: formData.term_id
      }
      const response = await createFees(payload).unwrap();
      
      if (response?.message === "Additional fee created successfully") {
        setFormData({
          name: "",
          amount: "",
          term_id: "",
        });
        toast.success("Additional fee created successfully");
      }
    } catch (error) {
      
    }
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Additional Fee
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
          <FormField label="Fee Name" id="name" required>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="e.g., Lab Fee, Field Trip, etc."
            />
          </FormField>

          <FormField label="Amount" id="amount" required>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">₵</span>
              </div>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                required
                className="block w-full pl-7 pr-3 py-2 rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="0.00"
                step="0.01"
                min="0"
              />
            </div>
          </FormField>

          <FormField
            label="Term"
            id="term_id"
            required
            className="md:col-span-2"
          >
            <select
              id="term_id"
              name="term_id"
              value={formData.term_id}
              onChange={handleInputChange}
              required
              className="mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option  value="">Select Term</option>
              {Terms?.map((term) => (
                <option key={term.id} value={term.id}>
                  {term.name}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <div className="mt-8 flex justify-end">
          <Button type="submit" variant="primary">
            <Save className="h-4 w-4 mr-2" />
            Save Additional Fee
          </Button>
        </div>
      </form>
      <Toaster toastOptions={{duration: 3000}} />
    </div>
  );
};

export default AdditionalFeeForm;
