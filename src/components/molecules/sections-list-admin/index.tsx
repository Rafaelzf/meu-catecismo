"use client";
import { MoreHorizontal, Bug, TriangleAlert } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { ActionsButtons, Skeleton } from "@/components/atoms";
import { getSections } from "@/app/actions/sections";

import { Section } from "../sections/types";
import { convertDate } from "@/lib/utils";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
export function SectionsListAdmin() {
  const { data: sections, error, isLoading } = useSWR("sections", getSections);
  const { trigger } = useSWRMutation("sections", getSections);

  if (error)
    return (
      <Alert variant="destructive">
        <TriangleAlert className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          "Ocorreu algum erro na tentativa de obter as seções. <Bug />"
        </AlertDescription>
      </Alert>
    );
  if (isLoading)
    return (
      <main className="flex justify-center items-center">
        <Skeleton size="lg" />
      </main>
    );

  if (!error && !isLoading && sections && sections.length > 0)
    return (
      <>
        <main className={`border border-primary rounded-md`}>
          <header className="grid grid-cols-5 gap-4 place-items-center text-center py-4 text-sm text-zinc-500 dark:text-zinc-400 ">
            <div>Nome</div>
            <div>Status</div>
            <div>Data de criação</div>
            <div>última atualização</div>
            <div>Ação</div>
          </header>
          <main className="text-sm text-orange-800">
            {sections.map((section: Section) => (
              <div
                key={section.id}
                className="grid grid-cols-5 gap-4 place-items-center text-center py-2 border-t-[1px] border-primary"
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
                    <ActionsButtons {...section} trigger={trigger} />
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </main>
        </main>
      </>
    );
}

export default SectionsListAdmin;
