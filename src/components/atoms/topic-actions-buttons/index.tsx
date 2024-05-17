"use client";

import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { useContext } from "react";
import Sectioncontext from "@/app/store/sections-context";
import { ActionsFormEnums } from "@/enums";
import TopicsContext from "@/app/store/topics-context";

interface Props {
  id?: number;
}

export function TopicActionsButtons({ id }: Props) {
  const { setAction, setShowModal, setIdTopic } = useContext(TopicsContext);

  const handleClick = (action: ActionsFormEnums) => {
    if (!id) return;
    setIdTopic(id);
    setShowModal(true);
    setAction(action);
  };

  return (
    <>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleClick(ActionsFormEnums.Edit)}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleClick(ActionsFormEnums.Delete)}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </>
  );
}

export default TopicActionsButtons;
