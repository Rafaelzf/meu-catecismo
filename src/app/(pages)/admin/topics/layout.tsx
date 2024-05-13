import { ReactNode } from "react";
import { TopicsContextProvider } from "@/app/store/topics-context";
export interface LayoutAdminProps {
  children: ReactNode;
}

function LayoutAdmin({ children }: LayoutAdminProps) {
  return <TopicsContextProvider>{children}</TopicsContextProvider>;
}

export default LayoutAdmin;
