"use client";

import Modal from "@/components/Modal";
import RegistrationCard from "@/components/RegistrationCard";
import { UserPlus } from "lucide-react";
import React, { useState } from "react";

const Register = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
    const inputStyles= "w-full rounded border-gray-300 p-2 shadow-sm dark:border-dark-tertiary  resize-none"
  
  const handleAdminClick = () => {
    console.log("Admin button clicked");
    setModalContent(
      <form className="mt-t space-y-6">
        <input
          type="text"
          id="name"
          placeholder="Name"
          className={inputStyles}
        />

        <input
          type="email"
          id="email"
          placeholder="Email"
          className={inputStyles}
        />
      </form>
    );
    setIsModalOpen(true);
  };

  const handleParentClick = () => {
    console.log("Parent button clicked");
    // Add your logic here
  };

  const closeModal = () => { setIsModalOpen(false); setModalContent(null) }
  return (
    <>
    <div className="flex w-full items-center justify-center  h-full  bg-gray-100 overflow-y-hidden flex-col">
      <div className="flex items-center justify-center gap-5">
        <RegistrationCard
          label="Register Admin"
          icon={UserPlus}
          source="/admin.jpg"
          onClick={handleAdminClick}
        />
        <RegistrationCard
          label="Register Parent"
          icon={UserPlus}
          source="/parent.jpg"
          onClick={handleParentClick}
        />
      </div>
      <h2 className="text-gray-500 text-[10px] mt-8 italic w-1/3 text-center">
        A beacon for future leaders, our school cultivates young minds with a
        focus on excellence, innovation, and integrity, empowering them to shape
        a brighter tomorrow.
      </h2>
    </div>
    <Modal isOpen={isModalOpen} onClose={closeModal} title="Register">
        {modalContent}
      </Modal>
    </>
  );
};
export default Register;
