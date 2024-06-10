"use client";
import { AdminContextProvider } from "@/app/store/admin-context";
import { ReactNode } from "react";

export interface LayoutAdminProps {
  children: ReactNode;
}

function LayoutAdmin({ children }: LayoutAdminProps) {
  return <AdminContextProvider>{children}</AdminContextProvider>;
}

export default LayoutAdmin;
