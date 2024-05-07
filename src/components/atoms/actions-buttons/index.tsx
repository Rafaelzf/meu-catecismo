"use client";

import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { useContext } from "react";
import Sectioncontext from "@/app/store/sections-context";
import { ActionsFormSectionsEnums } from "@/enums";

interface Props {
  id: number;
  title: string;
  message: string;
  active: boolean;
  trigger: () => Promise<void>;
}

export function ActionsButtons({ id, title, message, active, trigger }: Props) {
  const { setShowModal, setInfoSection } = useContext(Sectioncontext);

  async function handleDeleteClick() {
    setInfoSection((infoSection) => ({
      ...infoSection,
      id: id,
      sectionType: ActionsFormSectionsEnums.DeleteSection,
    }));
    setShowModal(true);
  }

  const handleEditClick = async () => {
    setInfoSection((infoSection) => ({
      ...infoSection,
      id: id,
      title: title,
      message: message,
      active: active,
      sectionType: ActionsFormSectionsEnums.EditSection,
    }));
    setShowModal(true);
  };

  return (
    <>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleEditClick}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeleteClick}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </>
  );
}

export default ActionsButtons;
