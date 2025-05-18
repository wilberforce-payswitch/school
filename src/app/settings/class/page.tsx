"use client";
import ClassTab from "@/components/ClassTab";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const CreateClass = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-50/30 p-6">
      
        {/* Back Button - Top Left */}
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-sm text-gray-600 hover:text-purple-600 transition"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Settings
          </button>
        </div>

        {/* Page Title */}


        {/* Actual Settings Component */}
       <ClassTab />
    </div>
  );
};

export default CreateClass;
