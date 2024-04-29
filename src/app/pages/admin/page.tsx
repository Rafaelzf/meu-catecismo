import Image from "next/image";
import { MoreHorizontal, PlusCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Admin() {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between content-center">
        <div>
          <CardTitle className="text-orange-800">Seções</CardTitle>
          <CardDescription>Crie, edite ou delete suas seções.</CardDescription>
        </div>

        <div>
          <Button
            size="sm"
            className="h-8 gap-1 bg-primary hover:bg-destructive"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add seção
            </span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <main className="border border-primary rounded-md">
          <header className="grid grid-cols-5 gap-4 place-items-center text-center py-4 text-sm text-zinc-500 dark:text-zinc-400 ">
            <div>Nome</div>
            <div>Status</div>
            <div>Data de criação</div>
            <div>última atualização</div>
            <div>Ação</div>
          </header>
          <main className="text-sm text-orange-800">
            <div className="grid grid-cols-5 gap-4 place-items-center text-center py-2 border-t-[1px] border-primary">
              <div className="font-semibold">Laser Lemonade Machine</div>
              <div>
                <Badge className="bg-zinc-400">Inativo</Badge>
              </div>
              <div>09/10/2023</div>
              <div>09/10/2023</div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-4 place-items-center text-center py-2 border-t-[1px] border-primary">
              <div className="font-semibold">Laser Lemonade Machine</div>
              <div>
                <Badge className="bg-emerald-500">Ativo</Badge>
              </div>
              <div>09/10/2023</div>
              <div>09/10/2023</div>
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </main>
        </main>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}
