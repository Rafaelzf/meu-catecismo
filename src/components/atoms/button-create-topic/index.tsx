"use client";
import { useContext } from "react";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import useSWRMutation from "swr/mutation";
import { ActionsFormEnums } from "@/enums";
import TopicsContext from "@/app/store/topics-context";
import { getTopics } from "@/app/actions/topics";

export function ButtonCreateTopic() {
  const { isMutating } = useSWRMutation("topics", () => getTopics());
  const { setShowModal, setAction } = useContext(TopicsContext);

  const handleClick = async () => {
    setAction(ActionsFormEnums.Create);
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
