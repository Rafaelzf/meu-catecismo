"use client";

import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { deleteSection, changeStatus } from "@/app/actions";

interface Props {
  id: number;
  active: boolean;
  trigger: () => Promise<void>;
}

export function ActionsButtons({ id, active, trigger }: Props) {
  async function handleDeleteClick() {
    await deleteSection(id);
    await trigger();
  }
  async function handleChangeStatusClick(isEnable: boolean) {
    await changeStatus(id, isEnable);
    await trigger();
  }

  return (
    <>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeleteClick}>Delete</DropdownMenuItem>
        {active ? (
          <DropdownMenuItem onClick={() => handleChangeStatusClick(false)}>
            Disable
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => handleChangeStatusClick(true)}>
            Enable
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </>
  );
}

export default ActionsButtons;
