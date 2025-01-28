import type { Metadata } from "next";

import "./globals.css";
import DashboardWrapper from "./dashboardWrapper";



export const metadata: Metadata = {
  title: "School Management System",
  description: "Paying fees has never been this easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      >
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}
