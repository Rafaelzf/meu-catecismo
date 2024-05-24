import { ReactNode } from "react";
import { TopicsContextProvider } from "@/app/store/topics-context";
import { QuestionsContextProvider } from "@/app/store/questions-context";
export interface LayoutAdminProps {
  children: ReactNode;
}

function LayoutAdmin({ children }: LayoutAdminProps) {
  return (
    <TopicsContextProvider>
      <QuestionsContextProvider>{children}</QuestionsContextProvider>
    </TopicsContextProvider>
  );
}

export default LayoutAdmin;
