"use client";

import useSWR from "swr";

import { questionAsks } from "@/app/actions/questionsAsks";
import { BoxError, Skeleton } from "@/components/atoms";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bug, MessageCircleQuestion, Pencil, Eraser } from "lucide-react";

import {
  Ask,
  QuestionsAsks as QuestionsAsksType,
} from "@/components/molecules/Topic/types";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ModalQuestions, PaginationComponent } from "@/components/molecules";
import { useCallback, useContext, useEffect } from "react";
import TopicsContext from "@/app/store/topics-context";
import { ActionsFormEnums } from "@/enums";
import QuestionsContext from "@/app/store/questions-context";
import AdminContext from "@/app/store/admin-context";
import useSWRMutation from "swr/mutation";
import { QuestionsAsksProps } from "@/app/(pages)/admin/topics/types";
export default function RenderQuestions({ params }: QuestionsAsksProps) {
  const { pagination } = useContext(AdminContext);
  const { setShowModal, setAction, setIdTopic } = useContext(TopicsContext);
  const { setQuestions, setQuestion } = useContext(QuestionsContext);
  const { data, isValidating, error } = useSWR(
    "questionsAsks",
    () => questionAsks(params.slug[0] as number, pagination.skip),
    { revalidateOnFocus: false }
  );

  const defaultActions = (action: ActionsFormEnums) => {
    setShowModal(true);
    setAction(action);
  };

  const createnNewQuestion = () => {
    defaultActions(ActionsFormEnums.Create);
    setIdTopic(params.slug[0] as number);
  };

  const deleteQuestion = (id: number | undefined) => {
    if (!id) return;
    const question = data.questions.filter(
      (item: QuestionsAsksType) => item.id === id
    );
    defaultActions(ActionsFormEnums.Delete);
    setQuestion(question[0]);
  };

  const editQuestion = (id: number | undefined) => {
    if (!id) return;
    const question = data.questions.filter(
      (item: QuestionsAsksType) => item.id === id
    );
    defaultActions(ActionsFormEnums.Edit);
    setQuestion(question[0]);
  };

  const { trigger } = useSWRMutation("questionsAsks", () =>
    questionAsks(params.slug[0] as number, pagination.skip)
  );
  const refetch = useCallback(async () => await trigger(), [trigger]);

  useEffect(() => {
    if (!pagination) return;
    refetch();
  }, [pagination, refetch]);

  useEffect(() => {
    if (data) {
      setQuestions(data.questions);
    }
  }, [data, setQuestions]);

  return (
    <>
      <ModalQuestions />
      <Card>
        <CardHeader className="flex justify-between align-middle flex-row mb-10">
          <CardTitle className="text-orange-500 m-0 flex items-center align-middle">
            {decodeURIComponent(params.slug[1] as string) || ""}
          </CardTitle>
          <div className="flex justify-end items-center align-middle gap-5">
            <Button
              className="bg-cyan-500 hover:bg-cyan-800 "
              onClick={createnNewQuestion}
            >
              Criar
            </Button>
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

        {data && data.questions.length === 0 && (
          <CardContent className="flex justify-center items-center">
            <p>O tópico não posssui conteúdo cadastrado.</p>
          </CardContent>
        )}

        {data && data.questions.length > 0 && !isValidating && !error && (
          <CardContent>
            {data.questions.map((item: QuestionsAsksType) => (
              <Alert
                key={item.id}
                className="mb-10 shadow-lg shadow-zinc-500/40"
              >
                <AlertTitle className="mb-5 flex justify-between items-center align-middle gap-5">
                  <div className="flex justify-start items-center align-middle gap-5">
                    <MessageCircleQuestion className="h-6 w-6 text-primary" />
                    <h5>{item.question}</h5>
                  </div>
                  <div className="flex justify-end items-center align-middle">
                    <Button className="bg-transparent text-cyan-500 hover:text-cyan-800 hover:bg-transparent">
                      <Pencil
                        className="h-5 w-5"
                        onClick={() => editQuestion(item.id)}
                      />
                    </Button>
                    <Button className="bg-transparent text-primary hover:text-destructive hover:bg-transparent">
                      <Eraser
                        className="h-5 w-5"
                        onClick={() => deleteQuestion(item.id)}
                      />
                    </Button>
                  </div>
                </AlertTitle>
                {item.asks.length > 0 ? (
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
          </CardContent>
        )}
        <CardFooter className="text-xs text-muted-foreground">
          <div className="flex flex-row justify-between content-center  w-full h-full">
            {data && data.questions.length > 0 && !isValidating && !error && (
              <PaginationComponent {...data.metadatas} />
            )}
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
