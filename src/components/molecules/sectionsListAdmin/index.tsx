import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { ActionsButtons } from "@/components/atoms";
import { getSections } from "@/app/actions";
import { Section } from "../sections/types";
import { convertDate } from "@/lib/utils";
export async function SectionsListAdmin() {
  const sections = await getSections();
  return (
    <main className="text-sm text-orange-800">
      {sections &&
        sections.map(
          ({ id, title, active, createDate, updateDate }: Section) => (
            <div
              key={id}
              className="grid grid-cols-5 gap-4 place-items-center text-center py-2 border-t-[1px] border-primary"
            >
              <div className="font-semibold">{title}</div>
              <div>
                {active ? (
                  <Badge className="bg-emerald-500">Ativo</Badge>
                ) : (
                  <Badge className="bg-zinc-400">Inativo</Badge>
                )}
              </div>
              <div>{convertDate(createDate)}</div>
              <div>{convertDate(updateDate)}</div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <ActionsButtons id={+id} />
                </DropdownMenu>
              </div>
            </div>
          )
        )}
    </main>
  );
}

export default SectionsListAdmin;
