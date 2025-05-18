/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAppDispatch } from "@/app/redux";
import LoadingSpinner from "@/components/Spinner";
import { setAuth } from "@/state";
import { useLoginUserMutation, useVerifyOtpMutation } from "@/state/api";
import { useFormik } from "formik";
import { BookOpen } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";

const loginSchema = z.object({
  email: z.string().email("Not a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const data = searchParams.get("data");
  const router = useRouter();
  const [verifyOTP] = useVerifyOtpMutation();
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();

  const hasVerified = useRef(false);
  const [verifying, setVerifying] = useState(!!data);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    } catch (err: any) {
      toast.error(err.message || "Verification failed");
    } finally {
      setVerifying(false);
    }
  };

  const formik = useFormik<LoginFormValues>({
    initialValues: { email: "", password: "" },
    validationSchema: toFormikValidationSchema(loginSchema),
    onSubmit: async (values) => {
      try {
        const response = await loginUser(values);
        if (response?.data?.user) {
          const userData = {
            id: response.data.user.id,
            name: response.data.user.name,
            roleId: response.data.user.roleId,
            school: response.data.user.school,
          };
          localStorage.setItem("user", JSON.stringify(userData));
          dispatch(setAuth({ user: userData }));
          router.push("/home");
        } else {
          toast.error("Login failed");
        }
      } catch (err: any) {
        console.error("Login error:", err);
        toast.error("Something went wrong");
      }
    },
  });

  if (verifying) return <LoadingSpinner />;

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row">
      {/* Left: Gradient Side */}
      <div className="w-full md:w-1/2 order-2 md:order-1">
        <div className="relative h-[40vh] md:h-screen w-full bg-gradient-to-br from-purple-800/90 via-purple-600/80 to-blue-500/70 flex items-center justify-center overflow-hidden">
          {/* Animated Background Circles */}
          <div className="absolute inset-0 overflow-hidden backdrop-blur-[2px]">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-purple-400/20 animate-pulse" />
            <div className="absolute top-2/3 right-1/3 w-64 h-64 rounded-full bg-blue-300/30 animate-pulse delay-1000" />
            <div className="absolute bottom-1/4 left-1/3 w-80 h-80 rounded-full bg-purple-300/20 animate-pulse delay-1500" />
          </div>

          {/* Glass Layer */}
          <div className="absolute inset-0 backdrop-blur-[1px] bg-gradient-to-b from-transparent via-purple-900/5 to-purple-900/10" />

          {/* Text Content */}
          <div className={`relative z-10 text-center transition-all duration-1000 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-sm shadow-lg border border-white/20">
                <BookOpen size={40} className="text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              School Management<br />System
            </h1>
            <p className="mt-4 text-white/80 text-lg max-w-md mx-auto font-light">
              Empowering education through intuitive management
            </p>
          </div>
        </div>
      </div>

      {/* Right: Login Form */}
      <div className="w-full md:w-1/2 order-1 md:order-2 flex items-center justify-center bg-gray-50 px-4 py-8">
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.errors.email && formik.touched.email ? "border-red-500" : "border-gray-300"}`}
                placeholder="you@example.com"
              />
              {formik.errors.email && formik.touched.email && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className={`mt-1 block w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formik.errors.password && formik.touched.password ? "border-red-500" : "border-gray-300"}`}
                placeholder="••••••••"
              />
              {formik.errors.password && formik.touched.password && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.password}</p>
              )}
            </div>

            {isError && "data" in error && (
              <p className="text-red-500 text-sm text-center">
                {(error.data as { message: string }).message}
              </p>
            )}

            <button
              type="submit"
              disabled={!formik.isValid || isLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-500 transition disabled:opacity-60"
            >
              {isLoading ? "Logging In..." : "Login"}
            </button>
          </form>
          <p className="mt-6 text-sm text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Contact administration
            </a>
          </p>
        </div>
      </div>

      <Toaster />
    </div>
  );
}
