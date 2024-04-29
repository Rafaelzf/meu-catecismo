"use client";

import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { deleteSection, disabeSection } from "@/app/actions";

interface Props {
  id: number;
}

export function ActionsButtons({ id }: Props) {
  const handleDeleteClick = async () => await deleteSection(id);
  const handleDisableClick = async () => await disabeSection(id);

  return (
    <>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeleteClick}>Delete</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDisableClick}>
          Disable
        </DropdownMenuItem>
      </DropdownMenuContent>
    </>
  );
}

export default ActionsButtons;
