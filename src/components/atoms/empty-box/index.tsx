import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import { ReactNode } from "react";

export interface EmptyBoxProps {
  children: ReactNode;
}

export default function EmptyBox({ children }: EmptyBoxProps) {
  return (
    <Alert>
      <TriangleAlert className="h-4 w-4" />
      <AlertTitle>Não há dados a serem exibidos - pit, pit music.</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
