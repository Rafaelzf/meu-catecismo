import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Speech } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sections } from "./types";
import { getSections } from "@/app/actions";

export default async function PageSections() {
  const sections = await getSections();

  return (
    <div className="gap-10 sm:gap-4 grid sm:grid-cols-1  md:grid-cols-3 ">
      {sections &&
        sections.map((section: Sections) => (
          <Card key={section.id}>
            <CardHeader>
              <CardTitle className="flex justify-start gap-2 items-center">
                <div className="rounded-full bg-primary text-primary-foreground h-10 w-10 flex justify-center items-center">
                  <Speech className="h-6 w-6" />
                </div>
                <p className="scroll-m-20 text-lg font-semibold tracking-tight  text-orange-800">
                  {section.title}
                </p>
              </CardTitle>
              <CardDescription className="leading-6">
                {section.message}
              </CardDescription>
            </CardHeader>

            <CardFooter>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-destructive">
                Ler sobre
              </Button>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}
