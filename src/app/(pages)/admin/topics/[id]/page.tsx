"use client";

import useSWR from "swr";
import { QuestionsAsksProps } from "./types";
import { questionAsks } from "@/app/actions/questionsAsks";
import { BoxError, Skeleton } from "@/components/atoms";
import { CardContent } from "@/components/ui/card";
import { Bug } from "lucide-react";

export default function QuestionsAsks({ params }: QuestionsAsksProps) {
  const { data, isValidating, error } = useSWR(
    "questionsAsks",
    () => questionAsks(params.id),
    { revalidateOnFocus: false }
  );
  return (
    <>
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
        <div>
          <h1>QuestionsAsks {params.id}</h1>
        </div>
      )}
    </>
  );
}
