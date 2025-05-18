import React from 'react';
import { Receipt, Plus, Percent } from 'lucide-react';

interface TabNavigationProps {
  activeTab: 'setFee' | 'additionalFee' | 'discount';
  onTabChange: (tab: 'setFee' | 'additionalFee' | 'discount') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'setFee', label: 'Set Fee', icon: <Receipt className="h-5 w-5" /> },
    { id: 'additionalFee', label: 'Additional Fee', icon: <Plus className="h-5 w-5" /> },
    { id: 'discount', label: 'Discount', icon: <Percent className="h-5 w-5" /> },
  ];

  return (
    <div className="border-b border-gray-200">
      <div className="sm:flex sm:items-center overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id as 'setFee' | 'additionalFee' | 'discount')}
            className={`px-3 py-4 text-sm font-medium flex items-center whitespace-nowrap transition-colors duration-200 ease-in-out border-b-2 sm:px-6 ${
              activeTab === tab.id
                ? 'text-indigo-600 border-indigo-600'
                : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
            }`}
            aria-current={activeTab === tab.id ? 'page' : undefined}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;