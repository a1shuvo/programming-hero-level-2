import { Navbar } from "@/components/layout/Navbar";
import { Toaster } from "@/components/ui/sonner";
import React from "react";

export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      <Toaster richColors />
      {children}
    </div>
  );
}
