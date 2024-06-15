import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionProps } from "./types";
import { getTopics } from "@/app/actions/topics";
import { Topic } from "@/components/molecules/Topic/types";
import { Sparkles, Squirrel } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
export default async function Section({ params }: SectionProps) {
  const topics = await getTopics(params.id[0] as number);
  return (
    <>
      {topics && topics.topics.length === 0 && (
        <Card>
          <CardContent className="flex justify-center items-center py-10 flex-col">
            <Squirrel className="h-12 w-12 text-destructive" />
            <h1 className="text-2xl text-destructive">
              Não há dados a serem exibidos - pit, pit music.
            </h1>
          </CardContent>
        </Card>
      )}

      {topics && topics.topics && (
        <div className="gap-10 sm:gap-4 grid sm:grid-cols-1  md:grid-cols-3 ">
          {topics.topics.map((topic: Topic) => (
            <Card
              key={topic.id}
              className="flex flex-col justify-start gap-2 items-center"
            >
              <CardHeader className="p-0">
                <CardTitle className="flex flex-col justify-start gap-2 items-center">
                  <p className="scroll-m-20 text-lg font-semibold tracking-tight  text-orange-800">
                    {topic.title}
                  </p>
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0 ">
                {topic.image ? (
                  <Image
                    priority
                    src={topic.image}
                    alt="Image"
                    width={200}
                    height={250}
                    className="p-0"
                  />
                ) : (
                  <div className="rounded-full bg-primary text-primary-foreground h-10 w-10 flex justify-center items-center">
                    <Sparkles className="h-6 w-6" />
                  </div>
                )}
              </CardContent>

              <CardFooter className="p-0 w-full">
                <Link href={`/topic/${topic.id}`} className="w-full block">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-destructive">
                    Ler sobre
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}
