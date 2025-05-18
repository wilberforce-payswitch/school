/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Save } from "lucide-react";
import FormField from "@/components/FeeFormField";
import Button from "@/components/FeeFormButton";
import MultiSelect from "@/components/FeeFormMultiSelect";
import { useCreateFeesMutation, useGetAcademicYearQuery, useGetSchoolClassesQuery } from "@/state/api";
import { useAppSelector } from "@/app/redux";
import { skipToken } from "@reduxjs/toolkit/query";
import toast from "react-hot-toast";

interface ClassOption {
  id: string;
  label: string;
}

const SetFeeForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    due_date: "",
    academic_year_id: "",
    school_id: "",
  });
  const [selectedClasses, setSelectedClasses] = useState<ClassOption[]>([]);
  const schoolId = useAppSelector(
    (state) => state.global.auth?.user?.school.id
  );
  const user = useAppSelector((state) => state.global.auth?.user);
  const shouldFetch = user?.roleId === 2;

  const { data: classOptions } = useGetSchoolClassesQuery(
    shouldFetch && schoolId ? { school_id: schoolId } : skipToken
  );
  const { data: academicYears } = useGetAcademicYearQuery(
    shouldFetch && schoolId ? schoolId : skipToken
  );

  const [createFees] = useCreateFeesMutation();

  // Mock data for the classes multi-select
  // const classOptions: ClassOption[] = [
  //   { id: 'class1', label: 'Class 1' },
  //   { id: 'class2', label: 'Class 2' },
  //   { id: 'class3', label: 'Class 3' },
  //   { id: 'class4', label: 'Class 4' },
  //   { id: 'class5', label: 'Class 5' },
  //   { id: 'class6', label: 'Class 6' },
  // ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        academic_year_id: formData.academic_year_id,
        name: formData.name,
        school_id: schoolId,
        amount: formData.amount,
        due_date: formData.due_date,
        class_ids: selectedClasses.map((c) => c.id),
      }
      const response = createFees(payload).unwrap();
      if (response?.message === "Fees saved successfully for all selected classes."){
        toast.success("Fees saved successfully for all selected classes.")}
        setFormData({
          name: "",
          amount: "",
          due_date: "",
          academic_year_id: "",
          school_id: "",
        });
        setSelectedClasses([]);
    } catch (error) {
      toast.error("Failed to save fees. Please try again.");
      console.error("Error saving fees:", error);
    }
    console.log({
      ...formData,
      class_ids: selectedClasses.map((c) => c.id),
    });
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Set Fee</h2>

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
              className="mt-1 py-2 block w-full rounded-md border-gray-600  focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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

          <FormField label="Due Date" id="due_date" required>
            <input
              type="date"
              id="due_date"
              name="due_date"
              value={formData.due_date}
              onChange={handleInputChange}
              required
              className="mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </FormField>

          <FormField label="Academic Year" id="academic_year_id" required>
            <select
              id="academic_year_id"
              name="academic_year_id"
              value={formData.academic_year_id}
              onChange={handleInputChange}
              required
              className="mt-1 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select Academic Year</option>
              {academicYears?.map((year: any) => (
                <option key={year.id} value={year.id}>
                  {year.name}
                </option>
              ))}
            </select>
          </FormField>

          <FormField
            label="Classes"
            id="class_ids"
            required
            className="md:col-span-2"
          >
            <MultiSelect
              id="class_ids"
              options={classOptions}
              selectedOptions={selectedClasses}
              onChange={setSelectedClasses}
              placeholder="Select classes..."
            />
          </FormField>
        </div>

        <div className="mt-8 flex justify-end">
          <Button type="submit" variant="primary">
            <Save className="h-4 w-4 mr-2" />
            Save Fee
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SetFeeForm;
