"use client";
import { useContext } from "react";
import Link from "next/link";
import { z } from "zod";
import {
  Bug,
  CopyPlus,
  FolderX,
  Loader2,
  MessageSquarePlus,
  Trash2,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { editFormSchema } from "./schema";
import useSWRMutation from "swr/mutation";
import { toast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import TopicsContext from "@/app/store/topics-context";
import { editTopic, getTopics } from "@/app/actions/topics";
import { Ask, QuestionsAsks, Topic } from "../Topic/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { questionAsks, deleteQuestionsAsks } from "@/app/actions/questionsAsks";
import useSWR from "swr";
import { BoxError, Skeleton } from "@/components/atoms";
import { getAsk } from "@/app/actions/ask";

function FormEditTopic() {
  const { topics, setShowModal, idSection, idTopic } =
    useContext(TopicsContext);
  const currentTopic = topics.find((topic) => topic.id === idTopic);
  const { trigger } = useSWRMutation("topics", () => getTopics(idSection));
  const { data, isValidating, error } = useSWR(
    currentTopic ? `questionAsks-${currentTopic.id}` : undefined,
    () => questionAsks(currentTopic?.id),
    { revalidateOnFocus: false }
  );

  const areThereQuestions = data && data.length > 0 && !error && !isValidating;

  // const asks = async (id: number) => {
  //   if (!id) return [];
  //   return await getAsk(id);
  // };

  // const dataQuestionsAsks =
  //   data && data.length
  //     ? data.map((question: QuestionsAsks) => {
  //         return {
  //           id: question.id || undefined,
  //           question: question.question,
  //           asks:
  //             question && question.asks
  //               ? question.asks.map((ask: Ask) => ({ ask: ask.ask }))
  //               : [],
  //           topicId: currentTopic?.id,
  //         };
  //       })
  //     : [];

  const defaultSendValues = {
    title: currentTopic?.title || "",
    active: currentTopic?.active || false,
  };

  const createform = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: defaultSendValues,
  });

  // const { fields, append, remove, update } = useFieldArray({
  //   control: createform.control,
  //   name: "questionsAsks",
  //   keyName: "formId",
  // });

  // const addQuestion = () => {
  //   append({
  //     id: undefined,
  //     question: "",
  //     asks: [{ id: undefined, ask: "" }],
  //     topicId: currentTopic?.id || 0,
  //   });
  // };

  // const removeQuestion = async (questionIndex: number, id: any) => {
  //   await deleteQuestionsAsks(id);
  //   remove(questionIndex);
  // };

  // const addAwnser = (questionIndex: number) => {
  //   const currentQuestion = createform.getValues(
  //     `questionsAsks.${questionIndex}`
  //   );
  //   const currentAsks = createform.getValues(
  //     `questionsAsks.${questionIndex}.asks`
  //   );
  //   update(questionIndex, {
  //     ...currentQuestion,
  //     asks: [...currentAsks, { id: undefined, ask: "" }],
  //   });
  // };

  // const removeAwnser = (questionIndex: number, answerIndex: number) => {
  //   const currentQuestion = createform.getValues(
  //     `questionsAsks.${questionIndex}`
  //   );
  //   const currentAsks = createform.getValues(
  //     `questionsAsks.${questionIndex}.asks`
  //   );
  //   const newAsks = currentAsks.filter((_, idx) => idx !== answerIndex);
  //   update(questionIndex, {
  //     ...currentQuestion,
  //     asks: newAsks,
  //   });
  // };

  async function onSubmit(values: z.infer<typeof editFormSchema>) {
    const { title, active } = values;
    if (!title || !idTopic) return;

    const sendData: Topic = {
      id: idTopic,
      title,
      active: active,
      parentSlug: currentTopic?.parentSlug || "",
      parentSectionId: currentTopic?.parentSectionId || 0,
    };

    const response = await editTopic(sendData);
    await trigger();
    setShowModal(false);

    const respTitle =
      response?.status === 200
        ? { title: "Topico editado com sucesso" }
        : { title: "Ocorreu algum erro ao editar o Topico" };
    toast(respTitle);
  }

  return (
    <Form {...createform}>
      <form onSubmit={createform.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={createform.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between items-center align-middle gap-4">
                <div className="flex justify-start items-center align-middle gap-4">
                  <span>Título da seção </span>
                  <FormField
                    control={createform.control}
                    name="active"
                    render={({ field }) => (
                      <FormItem className="flex justify-start items-center gap-4 w-8">
                        <FormLabel
                          className={
                            field.value ? "text-emerald-500" : "text-zinc-400"
                          }
                        >
                          {field.value ? "Ativo" : "Inativo"}
                        </FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </FormLabel>
              <FormControl>
                <Input placeholder="Título" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end items-center align-middle">
          <Link
            href={`/admin/topics/${currentTopic?.id}`}
            className=" p-3 rounded-lg border-0 text-emerald-500 hover:text-emerald-500 
            flex justify-end items-center align-middle gap-3 hover:bg-emerald-50"
          >
            <span>Perguntas e respostas</span>
            <Badge className="bg-orange-500">
              {isValidating && (
                <span>
                  <Loader2 className="h-4 w-2 animate-spin" />
                </span>
              )}
              <span>{(areThereQuestions && data.length) || 0}</span>
              {/* {(currentTopic && currentTopic.questionsAsks?.length) || 0} */}
            </Badge>
          </Link>
        </div>
        {/* {isValidating && (
          <CardContent className="flex justify-center items-center">
            <Skeleton size="sm" />
          </CardContent>
        )}

        {error && (
          <BoxError>
            Ocorreu algum erro na tentativa de obter as perguntas. <Bug />
          </BoxError>
        )}

        {fields && fields.length > 0 && !isValidating && !error && (
          <div className="overflow-y-auto h-60">
            {fields.map((field, questionIndex) => (
              <Card key={field.id} className="mb-6 bg-destructive/5">
                <CardHeader>
                  <FormField
                    control={createform.control}
                    name={`questionsAsks.${questionIndex}.question`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex justify-between items-center align-middle gap-5">
                          <span className="text-orange-800">Pergunta:</span>
                          <Button
                            variant="outline"
                            type="button"
                            className="border-0 text-red-800 hover:text-red-800"
                            disabled={fields.length === 0}
                            onClick={() =>
                              removeQuestion(
                                questionIndex,
                                fields[questionIndex].id
                              )
                            }
                          >
                            <FolderX />
                          </Button>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Pergunta" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardHeader>

                <CardContent>
                  {field.asks.map((_, answerIndex) => (
                    <FormField
                      key={`${field.id}-${answerIndex}`}
                      control={createform.control}
                      name={`questionsAsks.${questionIndex}.asks.${answerIndex}.ask`}
                      render={({ field }) => (
                        <FormItem>
                          <div>
                            <FormLabel className="text-zinc-500">
                              Resposta {answerIndex + 1}:
                            </FormLabel>
                            <FormControl>
                              <div className="flex justify-between items-center align-middle gap-4">
                                <Input placeholder="Resposta" {...field} />
                                <div className="flex justify-between items-center align-middle gap-2">
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="border-0 text-red-800 hover:text-red-800"
                                    onClick={() =>
                                      removeAwnser(questionIndex, answerIndex)
                                    }
                                  >
                                    <Trash2 />
                                  </Button>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    className="border-0 text-emerald-500 hover:text-emerald-500"
                                    onClick={() => addAwnser(questionIndex)}
                                  >
                                    <CopyPlus />
                                  </Button>
                                </div>
                              </div>
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )} */}

        <div className="flex justify-end align-middle gap-5">
          <Button
            type="button"
            variant="secondary"
            className="w-1/4"
            onClick={() => setShowModal(false)}
          >
            cancelar
          </Button>
          {createform.formState.isSubmitting ? (
            <Button className="bg-primary hover:bg-destructive w-1/4" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-primary hover:bg-destructive w-1/4"
            >
              Editar
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

export default FormEditTopic;
