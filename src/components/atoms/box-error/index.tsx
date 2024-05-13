import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlert } from "lucide-react";
import { ReactNode } from "react";

export interface BoxErrorProps {
  children: ReactNode;
}

export default function BoxError({ children }: BoxErrorProps) {
  return (
    <Alert variant="destructive">
      <TriangleAlert className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
