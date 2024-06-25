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
import { Sparkles, Squirrel, ImageUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PaginationComponentPages } from "@/components/molecules";
export default async function Section({ params, searchParams }: SectionProps) {
  const idSection = params.id[0] as number;
  const skip = Number(searchParams.skip);
  const take = (searchParams.take && Number(searchParams.take)) || 6;



  const topics = await getTopics(idSection, skip, take);
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
        <>
          <div className="gap-10 sm:gap-4 grid sm:grid-cols-1  md:grid-cols-3 ">
            {topics.topics.map((topic: Topic) => (
              <Card
                key={topic.id}
                className="flex flex-col justify-start items-center"
              >
                <CardHeader className="p-y-2 bg-orange-800 w-full rounded-t-lg">
                  <CardTitle className="flex justify-center gap-4 items-center ">
                    <div className="rounded-full bg-white text-orange-800 h-10 w-10 flex justify-center items-center">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <p className="scroll-m-20 text-lg font-semibold tracking-tight  text-white">
                      {topic.title}
                    </p>
                  </CardTitle>
                </CardHeader>

                <CardContent className="p-0 bg-slate-200 w-full h-40 flex justify-center items-center">
                  {topic.image ? (
                    <div
                      style={{ backgroundImage: `url(${topic.image})` }}
                      className="h-full w-full bg-cover"
                    ></div>
                  ) : (
                    <div className=" flex justify-center items-center">
                      <ImageUp className="h-8 w-8 mr-1 text-slate-600" />{" "}
                      <span className="text-slate-600">Sem imagem</span>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="w-full p-y-1 mt-5">
                  <Link href={`/topic/${topic.id}`} className="w-full block">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-destructive">
                      Ler sobre
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
          <div className="text-xs text-muted-foreground w-full mt-10  rounded-lg border border-zinc-200 bg-white py-5">
            <PaginationComponentPages {...topics.metadatas} />
          </div>
        </>
      )}
    </>
  );
}
