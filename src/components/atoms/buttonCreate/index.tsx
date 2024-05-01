"use client";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SendSection } from "@/components/molecules/sections/types";
import { createNewSection } from "@/app/actions/";
import useSWRMutation from "swr/mutation";
import { getSections } from "@/app/actions";

export function ButtonCreate() {
  const { trigger, isMutating } = useSWRMutation("sections", getSections);

  const handleClick = async () => {
    const fakeData: SendSection = {
      title: "Titulo teste 2",
      message: "message teste 2",
      slug: "slug_teste3",
    };
    await createNewSection(fakeData);
    trigger();
  };
  return (
    <div>
      <Button
        size="sm"
        className="h-8 gap-1 bg-primary hover:bg-destructive"
        onClick={handleClick}
        disabled={isMutating}
      >
        <PlusCircle className="h-3.5 w-3.5" />
        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
          Add seção
        </span>
      </Button>
    </div>
  );
}

export default ButtonCreate;
