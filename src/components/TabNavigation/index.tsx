import React from 'react';
import { Lock, School, Calendar, Trash2 } from 'lucide-react';

type TabType = 'password' | 'class' | 'academic' | 'delete';

interface TabNavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

interface TabProps {
  id: TabType;
  label: string;
  icon: React.ReactNode;
  color: string;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const Tab: React.FC<TabProps> = ({ id, label, icon, color, activeTab, setActiveTab }) => {
  const isActive = activeTab === id;
  
  const baseClasses = `flex items-center justify-center gap-2 py-4 px-6 font-medium transition-all duration-200 flex-1 text-center`;
  const activeClasses = `${baseClasses} ${color} text-white`;
  const inactiveClasses = `${baseClasses} text-gray-600 hover:bg-gray-50`;
  
  return (
    <button
      onClick={() => setActiveTab(id)}
      className={isActive ? activeClasses : inactiveClasses}
      aria-selected={isActive}
      role="tab"
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
};

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex border-b border-gray-200 overflow-x-auto scrollbar-hide" role="tablist">
      <Tab
        id="password"
        label="Change Password"
        icon={<Lock size={18} />}
        color="bg-blue-500"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Tab
        id="class"
        label="Create Class"
        icon={<School size={18} />}
        color="bg-green-500"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Tab
        id="academic"
        label="Create Academic Year"
        icon={<Calendar size={18} />}
        color="bg-purple-500"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Tab
        id="delete"
        label="Delete Account"
        icon={<Trash2 size={18} />}
        color="bg-red-500"
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default TabNavigation;