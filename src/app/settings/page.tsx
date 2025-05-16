"use client";
import AcademicYearTab from "@/components/AcademicYearTab";
import ClassTab from "@/components/ClassTab";
import DeleteAccountTab from "@/components/DeleteAccountTab";
import PasswordTab from "@/components/PasswordTab";
import TabNavigation from "@/components/TabNavigation";
import { useState } from "react";

type TabType = 'password' | 'class' | 'academic' | 'delete';

const Settings = () => {
    const [activeTab, setActiveTab] = useState<TabType>('password');
  return (
    // <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-8">
    //   <div className="bg-white max-w-3xl w-full rounded-xl shadow-lg p-8">
    //     {/* Tabs */}
    //     <div className="flex space-x-4 border-b pb-2 mb-6">
    //       <button
    //         onClick={() => setActiveTab("password")}
    //         className={`flex items-center gap-2 px-4 py-2 rounded-t-md font-medium ${
    //           activeTab === "password"
    //             ? "border-b-2 border-blue-600 text-blue-600"
    //             : "text-gray-500 hover:text-blue-600"
    //         }`}
    //       >
    //         <Lock size={18} />
    //         Change Password
    //       </button>
    //       <button
    //         onClick={() => setActiveTab("createClass")}
    //         className={`flex items-center gap-2 px-4 py-2 rounded-t-md font-medium ${
    //           activeTab === "createClass"
    //             ? "border-b-2 border-green-600 text-green-600"
    //             : "text-gray-500 hover:text-green-600"
    //         }`}
    //       >
    //         <School size={18} />
    //         Create Class
    //       </button>
    //       <button
    //         onClick={() => setActiveTab("createAcademicYear")}
    //         className={`flex items-center gap-2 px-4 py-2 rounded-t-md font-medium ${
    //           activeTab === "createAcademicYear"
    //             ? "border-b-2 border-purple-600 text-purple-600"
    //             : "text-gray-500 hover:text-purple-600"
    //         }`}
    //       >
    //         <CalendarDays size={18} />
    //         Create Academic Year
    //       </button>
    //       <button
    //         onClick={() => setActiveTab("delete")}
    //         className={`flex items-center gap-2 px-4 py-2 rounded-t-md font-medium ${
    //           activeTab === "delete"
    //             ? "border-b-2 border-red-600 text-red-600"
    //             : "text-gray-500 hover:text-red-600"
    //         }`}
    //       >
    //         <Trash2 size={18} />
    //         Delete Account
    //       </button>
    //     </div>

    //     {/* Tab Content */}
    //     {activeTab === "password" && (
    //       <form onSubmit={passwordFormik.handleSubmit} className="space-y-4">
    //         {/* Your existing password fields here... (omitted for brevity) */}
    //         {/* Just reuse your existing inputs from above */}
    //       </form>
    //     )}

    //     {activeTab === "createClass" && (
    //       <form onSubmit={classFormik.handleSubmit} className="space-y-4">
    //         <InputField
    //           label="Class Name"
    //           id="name"
    //           value={classFormik.values.name}
    //           onChange={classFormik.handleChange}
    //           error={classFormik.errors.name}
    //         />
    //         <InputField
    //           label="School ID"
    //           id="schoolId"
    //           value={classFormik.values.schoolId}
    //           onChange={classFormik.handleChange}
    //           error={classFormik.errors.schoolId}
    //         />
    //         <button
    //           type="submit"
    //           className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold transition"
    //         >
    //           Create Class
    //         </button>
    //       </form>
    //     )}

    //     {activeTab === "createAcademicYear" && (
    //       <form
    //         onSubmit={academicYearFormik.handleSubmit}
    //         className="space-y-4"
    //         noValidate
    //       >
    //         <InputField
    //           label="Academic Year Name"
    //           id="name"
    //           value={academicYearFormik.values.name}
    //           onChange={academicYearFormik.handleChange}
    //           error={academicYearFormik.errors.name}
    //         />
    //         <InputField
    //           label="Start Date"
    //           id="startDate"
    //           type="date"
    //           value={academicYearFormik.values.startDate}
    //           onChange={academicYearFormik.handleChange}
    //           error={academicYearFormik.errors.startDate}
    //         />
    //         <InputField
    //           label="End Date"
    //           id="endDate"
    //           type="date"
    //           value={academicYearFormik.values.endDate}
    //           onChange={academicYearFormik.handleChange}
    //           error={academicYearFormik.errors.endDate}
    //         />
    //         <InputField
    //           label="School ID"
    //           id="schoolId"
    //           value={academicYearFormik.values.schoolId}
    //           onChange={academicYearFormik.handleChange}
    //           error={academicYearFormik.errors.schoolId}
    //         />
    //         <div className="flex items-center gap-2">
    //           <input
    //             id="isCurrent"
    //             type="checkbox"
    //             checked={academicYearFormik.values.isCurrent}
    //             onChange={() =>
    //               academicYearFormik.setFieldValue(
    //                 "isCurrent",
    //                 !academicYearFormik.values.isCurrent
    //               )
    //             }
    //             className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
    //           />
    //           <label
    //             htmlFor="isCurrent"
    //             className="text-sm font-medium text-gray-700"
    //           >
    //             Set as current academic year
    //           </label>
    //         </div>
    //         <button
    //           type="submit"
    //           className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md font-semibold transition"
    //         >
    //           Create Academic Year
    //         </button>
    //       </form>
    //     )}

    //     {activeTab === "delete" && (
    //       <div className="text-center">
    //         <p className="text-sm text-gray-600 mb-4">
    //           Deleting your account is permanent and cannot be undone. Are you
    //           sure you want to proceed?
    //         </p>
    //         <button
    //           onClick={() => toast.error("Account deletion not yet implemented.")}
    //           className="text-red-600 border border-red-500 py-2 px-6 rounded-lg hover:bg-red-50"
    //         >
    //           Confirm Delete Account
    //         </button>
    //       </div>
    //     )}
    //   </div>
    //   <Toaster position="top-right" />
    // </div>

    <div className="container mx-auto px-4 w-full">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300">
        <h1 className="text-2xl font-bold p-6 border-b border-gray-100">
          User Settings
        </h1>

        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="p-6">
          {activeTab === "password" && <PasswordTab />}
          {activeTab === "class" && <ClassTab />}
          {activeTab === "academic" && <AcademicYearTab />}
          {activeTab === "delete" && <DeleteAccountTab />}
        </div>
      </div>
    </div>
  );
};

export default Settings;
