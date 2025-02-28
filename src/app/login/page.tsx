"use client";

import { useAppDispatch } from "@/app/redux";
import LoadingSpinner from "@/components/Spinner";
import { setAuth } from "@/state";
import { useLoginUserMutation, useVerifyOtpMutation } from "@/state/api";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const passwordValidation = new RegExp(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  /^.{5,}$/
);

const loginSchema = z.object({
  email: z.string().email({ message: "Not a valid email" }),
  password: z.string().regex(passwordValidation, {
    message:
      "Password must contain at least 8 characters and include an uppercase, lowercase, number and special character",
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const router = useRouter();
  const [verifyOTP] = useVerifyOtpMutation();
  const hasVerified = useRef(false);
  const [verifying, setVerifying] = useState(!!data);

  useEffect(() => {
    if (data && !hasVerified.current) {
      hasVerified.current = true;
      handleVerifyOTP();
    }
  }, [data]);

  const handleVerifyOTP = async () => {
    try {
      const response = await verifyOTP({ data }).unwrap();
      if (response?.message === "Email verified successfully") {
        toast.success("Email verified successfully! You can now log in.");
      } else {
        toast.error("Email verification failed");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setVerifying(false); 
    }
  };

 

  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      
      try {
          // // Fetch CSRF cookie first
          //   await fetch("http://127.0.0.1:8000/sanctum/csrf-cookie", {
          //   method: "GET",
          //   credentials: "include", // ✅ Important to receive the cookie
          // });
        const response = await loginUser(values);
        if (response?.data?.user) {
          const userData = {
            id: response.data.user.id,
            name: response.data?.user.name,
            roleId: response.data?.user.roleId,
            school: response.data?.user.school,
          };
          localStorage.setItem('user', JSON.stringify(userData));
          dispatch(setAuth({ user: userData }));
          router.push("/home");
        } else {
          console.log("Error", response.error);
        }
      } catch (error) {
        console.log("Error", error);
      }
    },
    validationSchema: toFormikValidationSchema(loginSchema),
  });

  if (verifying) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className="relative flex h-screen w-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url(/School.jpg)" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
            Welcome
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                type="email"
                value={formik.values.email}
                id="email"
                className="w-full px-4 py-2 border text-neutral-800 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="Enter your email"
                onChange={formik.handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={formik.values.password}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                placeholder="Enter your password"
                onChange={formik.handleChange}
              />
            </div>
            {isError && "data" in error && (
              <p className="text-red-500 text-sm text-center mb-3">
                {(error.data as { message: string }).message}
              </p>
            )}

            <button
              type="submit"
              className={`w-full px-4 py-2 text-white ${
                !formik.isValid ? "bg-blue-200" : "bg-primary"
              } rounded-lg hover:bg-primary-dark focus:ring-2 focus:ring-primary-dark focus:outline-none`}
              // disabled={!formik.isValid}
            >
              {isLoading ? "Logging In..." : "Login"}
            </button>
          </form>
          {/* <p className="mt-4 text-sm text-center text-gray-600">
 Don’t have an account? <a href="#" className="text-primary hover:underline">Sign up</a>
</p> */}
        </div>
      <Toaster />
    </div>
  );
}
