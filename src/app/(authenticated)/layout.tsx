'use client'

import { useRouter } from "next/navigation";
import { useAppSelector } from "../redux";
import DashboardWrapper from "./dashboardWrapper";
import { useEffect } from "react";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const auth = useAppSelector((state) => state.global.auth);
  const router = useRouter();

  useEffect(() => {
    if (!auth || !auth.token) {
      // Redirect to login page if not authenticated
      router.push("/login");
    }
  }, [auth, router]);

  // If the user is not authenticated, render nothing temporarily
  if (!auth || !auth.token) {
    return null; // Or you can show a loading spinner here
  }
  return <DashboardWrapper>{children}</DashboardWrapper>;
}
