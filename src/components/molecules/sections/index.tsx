import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "./types";
import { getSections } from "@/app/actions/sections";
import Link from "next/link";

export default async function PageSections() {
  const sections = await getSections();

  return (
    <div className="gap-10 sm:gap-4 grid sm:grid-cols-1  md:grid-cols-3 ">
      {sections &&
        sections.map((section: Section) => (
          <>
            {section.active && (
              <Card key={section.id}>
                <CardHeader>
                  <CardTitle className="flex justify-start gap-2 items-center">
                    <div className="rounded-full bg-primary text-primary-foreground h-10 w-10 flex justify-center items-center">
                      <Sparkles className="h-6 w-6" />
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
                <Link href={`/section/${section.id}`}>
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-destructive">
                    Ler sobre
                  </Button>
                  </Link>
                </CardFooter>
              </Card>
            )}
          </>
        ))}
    </div>
  );
}
