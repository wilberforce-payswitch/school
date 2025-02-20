"use client";
import { useChangePasswordMutation } from "@/state/api";
import { useFormik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useAppDispatch } from "../redux";
import { setAuth } from "@/state";


const passwordValidation = new RegExp(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  /^.{5,}$/
);

const passwordSchema = z
  .object({
    currentPassword: z
      .string()
      .regex(passwordValidation, { message: "incorrect Password" }),
    newPassword: z.string().regex(passwordValidation, {
      message:
        "Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.",
    }),
    confirmPassword: z.string().regex(passwordValidation, {
      message:
        "Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.",
    }),
  })
  .refine(
    (values) => {
      return values.newPassword === values.confirmPassword;
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

const Settings = () => {
  const dispatch = useAppDispatch();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  //    const [changePassword, setChangePassword] = useState(false)
  const router = useRouter();

  const [changePassword] = useChangePasswordMutation();

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await changePassword({
          old_password: values.currentPassword,
          new_password: values.newPassword,
          new_password_confirmation: values.confirmPassword,
        });
        console.log("response", JSON.stringify(response, null, 3));
        if (response?.data?.message === "Password changed successfully") {
          toast.success(response?.data);
          router.push("/home");

        }
        if (response.data?.token) {
          dispatch(setAuth({ token: response.data.token }));
          localStorage.setItem("token", response.data.token);
        } else {
          console.warn("No token returned from API");
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unknown error occurred");
        }
      }
    },
    validationSchema: toFormikValidationSchema(passwordSchema),
  });

  //    const handleButtonClick = () => {
  //     setChangePassword(true)
  //    }
  return (
    /* {!changePassword && (
    <div className='flex items-center justify-center'>  
    <button onClick={handleButtonClick} className='bg-blue-800 flex gap-2 px-10 py-2 items-center justify-center rounded-md mt-4 text-white hover:bg-blue-900'>
        change Password
    </button>
    </div>
)} */
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
          Change Password
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <div className="flex gap-5 justify-between w-full px-2 py-2 mt-2 bg-white rounded-xl border border-solid border-neutral-300 focus-within:border-sky-800 text-neutral-400">
            <input
              type={passwordVisible ? "text" : "password"}
              name="currentPassword"
              value={formik.values.currentPassword}
              onChange={formik.handleChange}
              className="bg-transparent text-neutral-950 border-none outline-none w-full"
              required
            />
            {formik.values.currentPassword.length > 0 && (
              <button
              type="button"
              className="focus:outline-none"
              onClick={() => setPasswordVisible((prev) => !prev)}
            >
              {passwordVisible ? (
                <Eye size={20} color="blue" />
              ) : (
                <EyeOff size={20} color="blue" />
              )}
            </button>
            )}
            
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <div className="flex gap-5 justify-between w-full px-2 py-2 mt-2 bg-white rounded-xl border border-solid border-neutral-300 focus-within:border-sky-800 text-neutral-400">
            <input
              type={newPasswordVisible ? "text" : "password"}
              name="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              className="bg-transparent text-neutral-950 border-none outline-none w-full"
              required
            />
            {formik.values.newPassword.length > 0 && (
              <button
              type="button"
              className="focus:outline-none"
              onClick={() => setNewPasswordVisible((prev) => !prev)}
            >
              {newPasswordVisible ? (
                <Eye size={20} color="blue" />
              ) : (
                <EyeOff size={20} color="blue" />
              )}
            </button>
            )}
            
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="flex gap-5 justify-between w-full px-2 py-2 mt-2 bg-white rounded-xl border border-solid border-neutral-300 focus-within:border-sky-800 text-neutral-400">
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              className="bg-transparent text-neutral-950 border-none outline-none w-full"
              required
            />
            {formik.values.confirmPassword.length > 0 && (<button
              type="button"
              className="px-2 focus:outline-none"
              onClick={() => setConfirmPasswordVisible((prev) => !prev)}
            >
              
              {confirmPasswordVisible  ? (
                <Eye size={20} color="blue" />
              ) : (
                <EyeOff size={20} color="blue" />
              )}
            </button>)}
             
            </div>
          </div>
          {/* {error && <p className="text-red-500 text-sm text-center">{error}</p>} */}
          <button
            type="submit"
            className="w-full bg-blue-600 mt-4 text-white py-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Update Password
          </button>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default Settings;
