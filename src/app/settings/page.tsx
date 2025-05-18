"use client";
import { Settings, Key, School, UserCircle, Bell, ChevronRight, Shield, Users, Calendar, Mail, BadgeCent } from "lucide-react";
import Link from "next/link";


const settingsGroups = [
  {
    id: "account",
    title: "Account Settings",
    description: "Manage your account security and preferences",
    icon: Shield,
    items: [
      { name: "Change Password", href: "/settings/password", icon: Key },
      { name: "Two-Factor Authentication", href: "/settings/2fa", icon: Shield },
      { name: "Deactivate Account", href: "/settings/deactivate", icon: Shield },
    ],
  },
  {
    id: "school",
    title: "School Setup",
    description: "Configure your school's academic structure",
    icon: School,
    items: [
      { name: "Create Class", href: "/settings/class", icon: Users },
      { name: "Academic Year", href: "/settings/academic-year", icon: Calendar },
      { name: "Bulk Registration", href: "/settings/bulk-registration", icon: Users },
      { name: "Create Fees", href: "/settings/create-fees", icon: BadgeCent },
    ],
  },
  {
    id: "profile",
    title: "Profile Information",
    description: "Update your personal information",
    icon: UserCircle,
    items: [
      { name: "Personal Details", href: "/settings/profile", icon: UserCircle },
      { name: "Contact Information", href: "/settings/contact", icon: Mail },
    ],
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Customize your notification preferences",
    icon: Bell,
    items: [
      { name: "Email Alerts", href: "/settings/email-alerts", icon: Mail },
      { name: "SMS Preferences", href: "/settings/sms", icon: Bell },
    ],
  },
];

const SettingsPage = () => {
 
  return (
     <div className="min-h-screen bg-gray-50/30 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Settings className="h-8 w-8 text-purple-600" />
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settingsGroups.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <group.icon className="h-6 w-6 text-purple-600" />
                  <h2 className="text-xl font-medium text-gray-900">{group.title}</h2>
                </div>
                <p className="text-gray-500 mb-6">{group.description}</p>
                <div className="space-y-2">
                  {group.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 group"
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 text-gray-400 group-hover:text-purple-600" />
                        <span className="text-gray-700 group-hover:text-gray-900">
                          {item.name}
                        </span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-purple-600" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
