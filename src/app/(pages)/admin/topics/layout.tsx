import { ReactNode } from "react";

export interface LayoutAdminProps {
  children: ReactNode;
}

function LayoutAdmin({ children }: LayoutAdminProps) {
  return <div>{children}</div>;
}

export default LayoutAdmin;
