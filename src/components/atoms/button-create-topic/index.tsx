"use client";
import { useContext } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import useSWRMutation from "swr/mutation";
import { getSections } from "@/app/actions/sections";
import { Sectioncontext } from "@/app/store/sections-context";
import { ActionsFormSectionsEnums } from "@/enums";

export function ButtonCreateTopic() {
  const { isMutating } = useSWRMutation("sections", getSections);
  const { setShowModal, setInfoSection } = useContext(Sectioncontext);

  const handleClick = async () => {
    setInfoSection((infoSection) => ({
      ...infoSection,
      sectionType: ActionsFormSectionsEnums.CreateSection,
    }));
    setShowModal(true);
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
          Add tópico(s)
        </span>
      </Button>
    </div>
  );
}

export default ButtonCreateTopic;
