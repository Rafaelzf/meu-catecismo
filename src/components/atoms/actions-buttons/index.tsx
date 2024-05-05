"use client";

import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { deleteSection, changeStatus } from "@/app/actions";
import { useToast } from "@/components/ui/use-toast";

interface Props {
  id: number;
  active: boolean;
  trigger: () => Promise<void>;
}

export function ActionsButtons({ id, active, trigger }: Props) {
  const { toast } = useToast();
  async function handleDeleteClick() {
    await deleteSection(id);
    await trigger();
    toast({
      title: "Seção deleteda sucesso",
    });
  }
  async function handleChangeStatusClick(isEnable: boolean) {
    await changeStatus(id, isEnable);
    await trigger();
    toast({
      title: "Status alterado com sucesso",
    });
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
