import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionsListAdmin } from "@/components/molecules";

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
          <SectionsListAdmin />
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
