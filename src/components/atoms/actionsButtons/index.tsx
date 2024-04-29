"use client";

import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { deleteSection } from "@/app/actions";

interface Props {
  id: number;
}

export function ActionsButtons({ id }: Props) {
  const handleClick = async () => await deleteSection(id);

  return (
    <>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={handleClick}>Delete</DropdownMenuItem>
        <DropdownMenuItem>Disable</DropdownMenuItem>
      </DropdownMenuContent>
    </>
  );
}

export default ActionsButtons;
