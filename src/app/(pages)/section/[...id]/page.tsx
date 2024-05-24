import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionProps } from "./types";
import { getTopics } from "@/app/actions/topics";
import { Topic } from "@/components/molecules/Topic/types";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Section({ params }: SectionProps) {
  const topics = await getTopics(params.id[0] as number);
  return (
    <div className="gap-10 sm:gap-4 grid sm:grid-cols-1  md:grid-cols-3 ">
      {topics &&
        topics.map((topic: Topic) => (
          <Card key={topic.id}>
            <CardHeader>
              <CardTitle className="flex justify-start gap-2 items-center">
                <div className="rounded-full bg-primary text-primary-foreground h-10 w-10 flex justify-center items-center">
                  <Sparkles className="h-6 w-6" />
                </div>
                <p className="scroll-m-20 text-lg font-semibold tracking-tight  text-orange-800">
                  {topic.title}
                </p>
              </CardTitle>
            </CardHeader>

            <CardFooter>
              <Link href={`/topic/${topic.id}`}>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-destructive">
                  Ler sobre
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}
