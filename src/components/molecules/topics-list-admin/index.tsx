"use client";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { TopicActionsButtons, EmptyBox } from "@/components/atoms";

import { Topic } from "../Topic/types";
import { convertDate } from "@/lib/utils";

import { useContext } from "react";
import TopicsContext from "@/app/store/topics-context";

export function TopicsListAdmin() {
  const { topics } = useContext(TopicsContext);

  return (
    <>
      {topics.length === 0 && <EmptyBox>****</EmptyBox>}
      {topics.length > 0 && (
        <main className={`border border-primary rounded-md`}>
          <header className="grid grid-cols-5 gap-4 place-items-center text-center py-4 text-sm text-zinc-500 dark:text-zinc-400 ">
            <div>Nome</div>
            <div>Status</div>
            <div>Data de criação</div>
            <div>última atualização</div>
            <div>Ação</div>
          </header>
          <main className="text-sm text-orange-800">
            {topics.map((topic: Topic) => (
              <div
                key={topic.id}
                className="grid grid-cols-5 gap-4 place-items-center text-center py-2 border-t-[1px] border-primary"
              >
                <div className="font-semibold">{topic.title}</div>
                <div>
                  {topic.active ? (
                    <Badge className="bg-emerald-500">Ativo</Badge>
                  ) : (
                    <Badge className="bg-zinc-400">Inativo</Badge>
                  )}
                </div>
                <div>{convertDate(topic.createDate)}</div>
                <div>{convertDate(topic.updateDate)}</div>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup="true" size="icon" variant="ghost">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <TopicActionsButtons id={topic.id} />
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </main>
        </main>
      )}
    </>
  );
}

export default TopicsListAdmin;
