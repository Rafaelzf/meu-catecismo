"use client";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import { useRouter } from "next/navigation";
export default function BackBtn() {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };
  return (
    <Button
      size="sm"
      className="h-8 gap-1  hover:bg-destructive"
      onClick={handleGoBack}
    >
      <ArrowBigLeft className="h-3.5 w-3.5" />
      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
        Voltar
      </span>
    </Button>
  );
}
