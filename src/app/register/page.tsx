"use client";

import EditModal from "@/components/EditModal";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import RegistrationCard from "@/components/RegistrationCard";
import {
  useCreateClassMutation,
  useCreateStudentMutation,
  useGetSchoolClassesQuery,
  useGetTermsforAClassQuery,
  useRegisterAdminMutation,
  useRegisterParentMutation,
} from "@/state/api";
import { BadgeCent, Mail, User, UserPlus, Users, X } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const Register = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateClassModalOpen, setIsCreateClassModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [parentId, setParentId] = useState("");
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [className, setClassName] = useState("");
  const [step, setStep] = useState(1);

  const { data: classes } = useGetSchoolClassesQuery();
  const {data: terms} = useGetTermsforAClassQuery({class_uuid: selectedClassId})
  const [registerAdministrator, { isLoading }] = useRegisterAdminMutation();
  const [registerParent, { isLoading: parentLoading }] = useRegisterParentMutation();
  const [createStudent] = useCreateStudentMutation();
  const [createClass, { isLoading: creatingClass }] = useCreateClassMutation();

  const handleAdminClick = () => {
    setModalTitle("Register Admin");
    setIsModalOpen(true);
    setStep(0);
  };

  const handleParentClick = () => {
    setModalTitle("Register Parent");
    setIsModalOpen(true);
    setStep(1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextStep = async () => {
    if (step === 1) {
      try {
        const response = await registerParent({
          name: name,
          email: email,
        });
        if (response?.data) {
          setParentId(response?.data?.parent?.id);
          setStep(2);
        }
        console.log(JSON.stringify(response, null, 3));
      } catch (error) {
        console.log("error from registration", error);
      }
      setStep(2);
    } else {
      try {
        const response = await createStudent({
          name: studentName,
          parent_id: parentId,
          class_id: selectedClassId,
        });
        if (response?.data) {
          alert("student created successful");
          setIsModalOpen(false);
          setStudentName("");
          setParentId("");
          setSelectedClassId("");
        }
      } catch (error) {
        alert(JSON.stringify(error));
      }
      console.log("Parent Form Submitted", {
        name,
        email,
        studentName,
        parentId,
      });
    }
  };

  const registerAdmin = async () => {
    try {
      const response = await registerAdministrator({
        name: name,
        email: email,
      });
      if (response?.data) {
        alert("admin created successfully");
        setIsModalOpen(false);
        setName("");
        setEmail("");
      }
      console.log(JSON.stringify(response, null, 3));
    } catch (error) {
      console.log("error from registration", error);
    }
  };

  const handleCreateClassClick = () => {
    setIsCreateClassModalOpen(true);
  };

  const handleCreateClass = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createClass({
        name: className,
      });
      if (response.data) {
        alert(response?.data?.message);
      }
      setClassName("");
      setIsCreateClassModalOpen(false);
      console.log("response", JSON.stringify(response, null, 3));
    } catch (error) {
      console.log("error from registration", error);
    }
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleTermFetch = () => {};

  return (
    <>
      <div className="flex w-full items-center justify-center  h-full  bg-gray-100 overflow-y-hidden flex-col">
        <div className="grid grid-cols-2  items-center justify-center gap-5">
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
          <RegistrationCard
            label="Create Class"
            icon={Users}
            source="/class.jpg"
            onClick={handleCreateClassClick}
          />
          <RegistrationCard
            label="Edit Fees"
            icon={BadgeCent}
            source="/class.jpg"
            onClick={handleEditClick}
          />
        </div>
        <h2 className="text-gray-500 text-[10px] mt-8 italic w-1/3 text-center">
          A beacon for future leaders, our school cultivates young minds with a
          focus on excellence, innovation, and integrity, empowering them to
          shape a brighter tomorrow.
        </h2>
      </div>
      {isModalOpen && (
        <>
          <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto bg-gray-600 bg-opacity-50 p-4">
            <div className="relative w-full max-w-md rounded-xl bg-white shadow-lg min-h-[420px] flex flex-col">
              <div className="relative h-20 bg-gray-200 rounded-t-xl">
                <div className="flex py-2 items-center justify-between px-4">
                  <h2 className="text-lg font-semibold">{modalTitle}</h2>
                  <button
                    className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300"
                    onClick={closeModal}
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="absolute -bottom-10 left-4">
                  <Image
                    src={`/oneheart.jpg`}
                    width={70}
                    height={70}
                    alt="school-logo"
                    className="rounded-full border-4 border-white"
                  />
                </div>
              </div>

              <div className="p-4 mt-5">
                <form className="mt-4 space-y-10">
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    id="name"
                    placeholder="Enter Name"
                    icon={User}
                  />
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    placeholder="Enter Email"
                    icon={Mail}
                  />

                  {step === 2 && (
                    <>
                      <Input
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        type="text"
                        id="student-name"
                        placeholder="Enter Student's Name"
                        icon={User}
                      />
                      <select
                        className="ml-2 pl-3 h-10 text-sm font-[400] border border-gray-500 rounded-md text-black focus:outline-none bg-transparent w-[60%]"
                        onChange={(e) => setSelectedClassId(e.target.value)}
                      >
                        <option value="">Select Class</option>
                        {classes?.map((classItem) => (
                          <option key={classItem.id} value={classItem.id}>
                            {classItem.name}
                          </option>
                        ))}
                      </select>
                    </>
                  )}
                </form>
              </div>

              <div className="flex justify-center p-10">
                {modalTitle === "Register Admin" ? (
                  <button
                    className="w-1/2 justify-center items-center py-3 bg-blue-800 text-white font-medium rounded-xl hover:bg-blue-900"
                    onClick={registerAdmin}
                  >
                    {isLoading ? "Registering..." : "Register"}
                  </button>
                ) : (
                  <button
                    className="w-1/2 justify-center items-center py-3 bg-blue-800 text-white font-medium rounded-xl hover:bg-blue-900"
                    onClick={nextStep}
                  >
                    {step === 1
                      ? parentLoading
                        ? "Loading..."
                        : "Next"
                      : "Register"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
      {isCreateClassModalOpen && (
        <Modal
          title="Create class"
          createClass={handleCreateClass}
          creatingClass={creatingClass}
          className={className}
          setClassName={setClassName}
          isOpen={isCreateClassModalOpen}
          onClose={() => setIsCreateClassModalOpen(false)}
        />
      )}

      {isEditModalOpen && (
        <EditModal
          classes={classes || []}
          terms={terms || []}
          selectedClassId={selectedClassId}
          setSelectedClassId={setSelectedClassId}
          onClose={() => setIsEditModalOpen(false)}
          isOpen={isEditModalOpen}
        />
      )}
    </>
  );
};
export default Register;
