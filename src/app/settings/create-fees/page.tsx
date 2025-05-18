'use client';
import React, { useState } from 'react';
import { ArrowLeft, Layout } from 'lucide-react';
import TabNavigation from '@/components/TabNavigation';
import SetFeeForm from '@/components/SetFeeForm';
import AdditionalFeeForm from '@/components/AdditionalFeeForm';
import DiscountForm from '@/components/DiscountForm';
import { useRouter } from 'next/navigation';

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'setFee' | 'additionalFee' | 'discount'>('setFee');

  const handleTabChange = (tab: 'setFee' | 'additionalFee' | 'discount') => {
    setActiveTab(tab);
  };

  return (
    <>
      {/* Back Button - absolute top-left */}
      <div className="px-4 pt-6 sm:px-6 lg:px-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-sm text-gray-600 hover:text-purple-600 transition"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Settings
        </button>
      </div>

      {/* Main Content Container */}
      <div className="w-[80%] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Layout className="h-8 w-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">School Fees Administration</h1>
            </div>
          </div>
          <p className="mt-2 text-sm text-gray-600">
            Manage all fee-related settings and configurations
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

          <div className="p-6">
            {activeTab === 'setFee' && <SetFeeForm />}
            {activeTab === 'additionalFee' && <AdditionalFeeForm />}
            {activeTab === 'discount' && <DiscountForm />}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
