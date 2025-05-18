/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Button } from "@/components/SettingsFormElement";
import { useBulkStudentRegistrationMutation, useGetSchoolClassesQuery } from "@/state/api";
import { useAppSelector } from "@/app/redux";
import { skipToken } from "@reduxjs/toolkit/query";

const BulkRegistrationTab: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState("");
  const user = useAppSelector((state) => state.global.auth?.user)
  const userSchoolId = useAppSelector((state) => state.global.auth?.user?.school.id)

  console.log(selectedClassId)

   const {
      data: classNames
    } = useGetSchoolClassesQuery(userSchoolId ? {school_id: userSchoolId}: skipToken, { skip: user?.roleId !== 2 });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    setError("");
    setSuccess("");
  };

  const [bulkStudentRegistration] = useBulkStudentRegistrationMutation();

const handleUpload = async () => {
  if (!file) {
    setError("Please select a file to upload.");
    return;
  }

  if (!selectedClassId) {
    setError("Please select a class.");
    return;
  }

  setIsUploading(true);
  setError("");
  setSuccess("");

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("class_id", selectedClassId);

    await bulkStudentRegistration({ file, class_id: selectedClassId }).unwrap();

    setSuccess(`File "${file.name}" uploaded and students registered successfully.`);
    setFile(null);
    setSelectedClassId("");
  } catch (err: any) {
    setError(err?.data?.message || "An error occurred while uploading.");
  } finally {
    setIsUploading(false);
  }
};


  return (
    <div className="animate-fadeIn justify-center items-center">
      <h2 className="text-xl font-semibold mb-4 text-blue-600">
        Bulk Student Registration
      </h2>
      <p className="text-gray-600 mb-6">
        Upload an Excel file (.xlsx or .xls) to register students in bulk.
      </p>

      {success && (
        <div className="mb-4 p-2 bg-green-50 border border-green-200 text-green-600 rounded">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-4 p-2 bg-red-50 border border-red-200 text-red-600 rounded">
          {error}
        </div>
      )}

      <div className="space-y-6 max-w-xl mx-auto">
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="w-full border border-gray-300 p-3 rounded-md shadow-sm text-sm"
        />

        {file && (
          <div className="text-sm text-gray-700 italic">
            Selected file: <span className="font-medium">{file.name}</span>
          </div>
        )}

        <select
          className="w-full border rounded p-2 bg-white text-neutral-500"
          value={selectedClassId}
          onChange={(e) => setSelectedClassId(e.target.value)}
        >
          <option value="">Select a class</option>
          {classNames?.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>

        <Button
          type="button"
          color="blue"
          disabled={!file || isUploading}
          onClick={handleUpload}
          className="transform transition-transform hover:scale-[1.02] active:scale-[0.98] duration-200"
        >
          {isUploading ? "Uploading..." : "Upload & Register"}
        </Button>
      </div>
    </div>
  );
};

export default BulkRegistrationTab;
