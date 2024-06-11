"use client";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { ActionsButtons } from "@/components/atoms";

import { Section } from "../sections/types";
import { convertDate } from "@/lib/utils";

import { useRouter } from "next/navigation";

export function SectionsListAdmin({ sections }: { sections: Section[] }) {
  const router = useRouter();

  const goTopic = (sectionId: number) => {
    router.push(`/admin/topics/${sectionId}`);
  };

  return (
    <>
      <main className={`border border-primary rounded-md`}>
        <header className="grid grid-cols-6 gap-4 place-items-center text-center py-4 text-sm text-zinc-500 dark:text-zinc-400 ">
          <div>Nome</div>
          <div>Status</div>
          <div>Data de criação</div>
          <div>última atualização</div>
          <div>Ação</div>
          <div>Tópicos</div>
        </header>
        <main className="text-sm text-orange-800">
          {sections.map((section: Section) => (
            <div
              key={section.id}
              className="grid grid-cols-6 gap-4 place-items-center text-center py-2 border-t-[1px] border-primary"
            >
              <div className="font-semibold">{section.title}</div>
              <div>
                {section.active ? (
                  <Badge className="bg-emerald-500">Ativo</Badge>
                ) : (
                  <Badge className="bg-zinc-400">Inativo</Badge>
                )}
              </div>
              <div>{convertDate(section.createDate)}</div>
              <div>{convertDate(section.updateDate)}</div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <ActionsButtons {...section} />
                </DropdownMenu>
              </div>
              <div>
                <Button
                  className="p-3 rounded-lg bg-orange-500 text-white hover:bg-orange-700"
                  onClick={() => goTopic(section.id)}
                >
                  Ver tópicos
                </Button>
              </div>
            </div>
          ))}
        </main>
      </main>
    </>
  );
}

export default SectionsListAdmin;
