"use client";

import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { deleteSection, changeStatus } from "@/app/actions";

interface Props {
  id: number;
  active: boolean;
  mutateData: () => Promise<void>;
}

export function ActionsButtons({ id, active, mutateData }: Props) {
  async function handleDeleteClick() {
    await deleteSection(id);
    await mutateData();
  }
  async function handleChangeStatusClick(isEnable: boolean) {
    await changeStatus(id, isEnable);
    await mutateData();
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
