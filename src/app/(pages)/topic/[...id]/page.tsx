import { TopicProps } from "./types";
import { questionAsks } from "@/app/actions/questionsAsks";
import {
  Ask,
  QuestionsAsks as QuestionsAsksType,
} from "@/components/molecules/Topic/types";

import { AlertDescription } from "@/components/ui/alert";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircleQuestion } from "lucide-react";
import { PaginationComponentPages } from "@/components/molecules";
import { BackBtn } from "@/components/atoms";
export default async function TopicPage({ params, searchParams }: TopicProps) {
  const id = params.id[0] as number;
  const skip = Number(searchParams.skip);
  const take = (searchParams.take && Number(searchParams.take)) || 6;
  const questionsAsks = await questionAsks(id, skip, take);

  return (
    <>
      <div className="gap-10 sm:gap-4 grid sm:grid-cols-1  md:grid-cols-1 bg-white p-5 rounded-lg border border-zinc-200">
        {questionsAsks &&
          questionsAsks.questions &&
          questionsAsks.questions.map((question: QuestionsAsksType) => (
            <Accordion
              type="single"
              collapsible
              className="w-full "
              key={question.id}
            >
              <AccordionItem
                value={(question.id && question.id.toString()) || ""}
              >
                <AccordionTrigger className="text-orange-800">
                  {question.question}
                </AccordionTrigger>
                <AccordionContent>
                  {question.asks.length > 0 ? (
                    <ul>
                      {question.asks.map((ask: Ask) => (
                        <li
                          key={ask.id}
                          className="list-disc mx-8 mb-4 text-zinc-500 text-base"
                        >
                          <AlertDescription>{ask.ask}</AlertDescription>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul>
                      <li className="list-disc mx-8 mb-4 text-orange-500">
                        <AlertDescription>
                          Essa pergunta ainda não possuí respostas cadastradas.
                        </AlertDescription>
                      </li>
                    </ul>
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
      </div>

      <div className="flex text-xs text-muted-foreground w-full mt-10  rounded-lg border border-zinc-200 bg-white p-5">
        <PaginationComponentPages {...questionsAsks.metadatas} />

        <BackBtn />
      </div>
    </>
  );
}
