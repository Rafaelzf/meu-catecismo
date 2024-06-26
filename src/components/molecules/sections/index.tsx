import Image from "next/image";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookMarked } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "./types";
import Link from "next/link";

export default async function PageSections({
  sections,
}: {
  sections: Section[];
}) {
  return (
    <div className="gap-10 sm:gap-4 grid sm:grid-cols-1  md:grid-cols-3 ">
      {sections &&
        sections.map((section: Section) => (
          <>
            {section.active && (
              <Card key={section.id}>
                <CardHeader>
                  <CardTitle className="flex justify-start gap-2 items-center">
                    {section.icon ? (
                      <div className="rounded-full flex justify-center items-center">
                        <Image
                          src={section?.icon}
                          alt="Image"
                          height={50}
                          width={50}
                          className="rounded-full"
                        />
                      </div>
                    ) : (
                      <div className="rounded-full bg-primary text-primary-foreground h-10 w-10 flex justify-center items-center">
                        <BookMarked className="h-6 w-6" />
                      </div>
                    )}

                    <p className="scroll-m-20 text-lg font-semibold tracking-tight  text-orange-800">
                      {section.title}
                    </p>
                  </CardTitle>
                  <CardDescription className="leading-6 h-20">
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
