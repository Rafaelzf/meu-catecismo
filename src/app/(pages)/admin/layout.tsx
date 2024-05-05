"use client";
import { ReactNode } from "react";
import { SectioncontextProvider } from "@/app/store/sections-context";

export interface LayoutAdminProps {
  children: ReactNode;
}

function LayoutAdmin({ children }: LayoutAdminProps) {
  return <SectioncontextProvider>{children}</SectioncontextProvider>;
}

export default LayoutAdmin;
