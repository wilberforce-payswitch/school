"use client";

import EditModal from "@/components/EditModal";
import Input from "@/components/Input";
import Modal from "@/components/Modal";
import RegistrationCard from "@/components/RegistrationCard";
import {
  useAcademicYearQuery,
  useCreateClassMutation,
  useCreateSchoolMutation,
  useCreateStudentMutation,
  useGetAllSchoolsQuery,
  useGetSchoolClassesQuery,
  useGetTermsforAClassQuery,
  useRegisterAdminMutation,
  useRegisterParentMutation,
} from "@/state/api";
import {
  BadgeCent,
  Mail,
  School,
  User,
  UserPlus,
  Users,
  X,
} from "lucide-react";

import React, { useState } from "react";
import { useAppSelector } from "../redux";
import CreateSchoolModalOpen from "@/components/CreateSchoolModal";
import { skipToken } from "@reduxjs/toolkit/query";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const user = useAppSelector((state) => state?.global.auth?.user);
  const userSchoolId = useAppSelector(
    (state) => state?.global?.auth?.user?.school?.id
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateSchoolModalOpen, setIsCreateSchoolModalOpen] = useState(false);
  const [isCreateClassModalOpen, setIsCreateClassModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [studentName, setStudentName] = useState("");
  const [parentId, setParentId] = useState("");
  const [selectedClassId, setSelectedClassId] = useState<string>("");
  const [className, setClassName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [schoolAddress, setSchoolAddress] = useState("");
  const [schoolPhone, setSchoolPhone] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [schoolTerm, setSchoolTerm] = useState<number>(3);
  const [schoolId, setSchoolId] = useState<string | undefined>("");
  const [gender, setGender] = useState<string>("");
  const [step, setStep] = useState(1);

  const { data: classes } = useGetSchoolClassesQuery(
 userSchoolId ? {school_id: userSchoolId}: skipToken, { skip: user?.roleId !== 2 }
  );
  const { data: terms } = useGetTermsforAClassQuery(
    userSchoolId ? { school_id: userSchoolId } : skipToken,
    { skip: user?.roleId !== 2 }
  );
  const [registerAdministrator, { isLoading }] = useRegisterAdminMutation();
  const [registerParent, { isLoading: parentLoading }] =
    useRegisterParentMutation();
  const [createStudent] = useCreateStudentMutation();
  const [createClass, { isLoading: creatingClass }] = useCreateClassMutation();

  const [createSchool, { isLoading: creatingSchool }] =
    useCreateSchoolMutation();
  const { data } = useGetAllSchoolsQuery(
    user?.roleId === 1 ? undefined : skipToken
  );

  const {data: years} = useAcademicYearQuery()

  const schools = data?.schools || [];

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
          school_id: user?.roleId === 2 ? userSchoolId : schoolId,
        });
        if (response?.data?.user) {
          toast.success(response?.data?.message);
          setParentId(response?.data?.user?.id);
          setStep(2);
          setName("");
          setEmail("");
        }
        console.log(JSON.stringify(response, null, 3));
      } catch (error) {
        toast.error(JSON.stringify(error));
        return;
      }
      // setStep(2);
    } else {
      try {
        const response = await createStudent({
          name: studentName,
          parent_id: parentId,
          class_id: selectedClassId,
          school_id: userSchoolId,
          gender: gender,
        });
        if (response?.data) {
          toast.success(response?.data?.message)
          setIsModalOpen(false);
          setStudentName("");
          setParentId("");
          setSelectedClassId("");
        }
      } catch (error) {
        toast.error(JSON.stringify(error));
      }
    }
  };

  const registerAdmin = async () => {
    try {
      const response = await registerAdministrator({
        name: name,
        email: email,
        school_id: user?.roleId === 2 ? userSchoolId : schoolId,
      });
      if (response?.data) {
        setIsModalOpen(false);
        setName("");
        setEmail("");
        toast.success(
          response?.data?.message || "Admin registered successfully"
        );
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
        school_id: userSchoolId,
      });
      if (response.data?.message) {
        toast.success(response?.data?.message);
      }
      setClassName("");
      setIsCreateClassModalOpen(false);
      console.log("response", JSON.stringify(response, null, 3));
    } catch (error) {
      console.log("error from registration", error);
    }
  };

  const handleCreateSchool = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createSchool({
        name: schoolName,
        address: schoolAddress,
        phone: schoolPhone,
        email: schoolEmail,
        terms_per_academic_year: schoolTerm,
      });

      setSchoolName("");
      setSchoolAddress("");
      setSchoolPhone("");
      setSchoolEmail("");
      setSchoolTerm(3);
      setIsCreateSchoolModalOpen(false);
      if (response.data) {
        toast.success(response?.data?.message || "School created successfully");
      }
    } catch (error) {
      console.log("error from registration", error);
    }
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };
  const handleCreateSchoolClick = () => {
    setIsCreateSchoolModalOpen(true);
  };


  return (
    <>
      {user?.roleId === 2 ? (
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
            A beacon for future leaders, our school cultivates young minds with
            a focus on excellence, innovation, and integrity, empowering them to
            shape a brighter tomorrow.
          </h2>
        </div>
      ) : (
        <div className="flex w-full items-center justify-center  h-full  bg-gray-100 overflow-y-hidden flex-col">
          <div className="grid grid-cols-2  items-center justify-center gap-5">
            <RegistrationCard
              label="Create School"
              icon={School}
              source="/admin.jpg"
              onClick={handleCreateSchoolClick}
            />
            <RegistrationCard
              label="Register Admin"
              icon={UserPlus}
              source="/admin.jpg"
              onClick={handleAdminClick}
            />
          </div>
        </div>
      )}

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
                  {/* <Image
                    src={`/oneheart.jpg`}
                    width={70}
                    height={70}
                    alt="school-logo"
                    className="rounded-full border-4 border-white"
                  /> */}
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
                    required={true}
                  />
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    id="email"
                    placeholder="Enter Email"
                    icon={Mail}
                    required={true}
                  />
                  {user?.roleId === 1 && (
                    <div className="flex w-full rounded border-gray-400 p-2 shadow-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus:border-transparent">
                      <select
                        className="w-full focus:outline-none text-black placeholder:text-neutral-800 pl-2"
                        onChange={(e) => setSchoolId(e.target.value)}
                      >
                        <option value="">Select Scool</option>
                        {schools?.map(
                          (school: { id: string; name: string }) => (
                            <option key={school?.id} value={school?.id}>
                              {school?.name}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  )}

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
                        className="ml-2 pl-3 h-10 text-sm font-[400] border border-gray-500 rounded-md text-black focus:outline-none bg-transparent w-[50%]"
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">male</option>
                        <option value="Female">female</option>
                      </select>
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
                  className={`w-1/2 justify-center items-center py-3 font-medium rounded-xl 
                    ${step === 1 && (!name || !email) ? "bg-blue-800 text-white bg-opacity-50 cursor-not-allowed" : "bg-blue-800 text-white hover:bg-blue-900"}`}
                  onClick={nextStep}
                  disabled={step === 1 && (!name || !email)}
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
          userSchoolId= {userSchoolId}
          years={years || []}
        />
      )}

      {isCreateSchoolModalOpen && (
        <CreateSchoolModalOpen
          title="Create School"
          isOpen={isCreateSchoolModalOpen}
          onClose={() => setIsCreateSchoolModalOpen(false)}
          schoolName={schoolName}
          setSchoolName={setSchoolName}
          schoolAddress={schoolAddress}
          setSchoolAddress={setSchoolAddress}
          schoolPhone={schoolPhone}
          setSchoolPhone={setSchoolPhone}
          schoolEmail={schoolEmail}
          setSchoolEmail={setSchoolEmail}
          termsPerYear={schoolTerm}
          setTermsPerYear={setSchoolTerm}
          createSchool={handleCreateSchool}
          creatingSchool={creatingSchool}
        />
      )}
      <Toaster toastOptions={{ duration: 3000 }} />
    </>
  );
};
export default Register;
