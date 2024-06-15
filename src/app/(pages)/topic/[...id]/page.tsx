import { Card, CardContent } from "@/components/ui/card";
import { TopicProps } from "./types";
import { questionAsks } from "@/app/actions/questionsAsks";
import {
  Ask,
  QuestionsAsks as QuestionsAsksType,
} from "@/components/molecules/Topic/types";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { MessageCircleQuestion } from "lucide-react";
export default async function TopicPage({ params }: TopicProps) {
  const questionsAsks = await questionAsks(params.id[0] as number);

  return (
    <div className="py-10 gap-10 sm:gap-4 grid sm:grid-cols-1  md:grid-cols-2">
      {questionsAsks &&
        questionsAsks.questions &&
        questionsAsks.questions.map((question: QuestionsAsksType) => (
          <Alert
            key={question.id}
            className="mb-10 shadow-lg shadow-zinc-500/40"
          >
            <AlertTitle className="mb-5 flex justify-between items-center align-middle gap-5">
              <div className="flex justify-start items-center align-middle gap-5">
                <MessageCircleQuestion className="h-6 w-6 text-primary" />
                <h5>{question.question}</h5>
              </div>
            </AlertTitle>
            {question.asks.length > 0 ? (
              <ul>
                {question.asks.map((ask: Ask) => (
                  <li
                    key={ask.id}
                    className="list-disc mx-8 mb-4 text-zinc-500"
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
          </Alert>
        ))}
    </div>
  );
}
