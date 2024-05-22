"use client";

import useSWR from "swr";
import { QuestionsAsksProps } from "./types";
import { questionAsks } from "@/app/actions/questionsAsks";
import { BoxError, Skeleton } from "@/components/atoms";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bug, MessageCircleQuestion, Pencil, Eraser } from "lucide-react";

import {
  Ask,
  QuestionsAsks as QuestionsAsksType,
} from "@/components/molecules/Topic/types";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
export default function QuestionsAsks({ params }: QuestionsAsksProps) {
  console.log(params.slug[1]);
  const { data, isValidating, error } = useSWR(
    "questionsAsks",
    () => questionAsks(params.slug[0] as number),
    { revalidateOnFocus: false }
  );

  return (
    <Card>
      <CardHeader className="flex justify-between align-middle flex-row mb-10">
        <CardTitle className="text-orange-800 m-0 flex items-center align-middle">
          {decodeURIComponent(params.slug[1] as string) || ""}
        </CardTitle>
        <div className="flex justify-end items-center align-middle gap-5">
          <Button className="bg-cyan-500 hover:bg-cyan-800 ">Criar</Button>
        </div>
      </CardHeader>
      {isValidating && (
        <CardContent className="flex justify-center items-center">
          <Skeleton size="lg" />
        </CardContent>
      )}

      {error && (
        <BoxError>
          Ocorreu algum erro na tentativa de obter as perguntas. <Bug />
        </BoxError>
      )}

      {data && data.length > 0 && !isValidating && !error && (
        <CardContent>
          {data.map((item: QuestionsAsksType) => (
            <Alert key={item.id} className="mb-10 shadow-lg shadow-zinc-500/40">
              <AlertTitle className="mb-5 flex justify-between items-center align-middle gap-5">
                <div className="flex justify-start items-center align-middle gap-5">
                  <MessageCircleQuestion className="h-6 w-6 text-primary" />
                  <h5>{item.question}</h5>
                </div>
                <div className="flex justify-end items-center align-middle">
                  <Button className="bg-transparent text-cyan-500 hover:text-cyan-800 hover:bg-transparent">
                    <Pencil className="h-5 w-5" />
                  </Button>
                  <Button className="bg-transparent text-primary hover:text-destructive hover:bg-transparent">
                    <Eraser className="h-5 w-5" />
                  </Button>
                </div>
              </AlertTitle>
              {item.asks.length && (
                <ul>
                  {item.asks.map((ask: Ask) => (
                    <li
                      key={ask.id}
                      className="list-disc mx-8 mb-4 text-zinc-500"
                    >
                      <AlertDescription>{ask.ask}</AlertDescription>
                    </li>
                  ))}
                </ul>
              )}
            </Alert>
          ))}
        </CardContent>
      )}
    </Card>
  );
}
