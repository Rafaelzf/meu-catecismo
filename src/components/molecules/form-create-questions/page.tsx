"use client";

import { useContext } from "react";
import { z } from "zod";
import { CopyPlus, Loader2, Trash2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createFormSchema } from "./schema";

import { TopicsContext } from "@/app/store/topics-context";
import useSWRMutation from "swr/mutation";
import { toast } from "@/components/ui/use-toast";
import {
  createNewQuestionsAsks,
  editQuestionsAsks,
  questionAsks,
} from "@/app/actions/questionsAsks";
import { QuestionsAsks } from "../Topic/types";
import { ActionsFormEnums } from "@/enums";
import QuestionsContext from "@/app/store/questions-context";
import { deleteAsk } from "@/app/actions/ask";

type Props = {
  action?: ActionsFormEnums;
};

function FormCreateQuestions({ action }: Props) {
  const { setShowModal, idTopic } = useContext(TopicsContext);
  const { question: contextQuestion } = useContext(QuestionsContext);
  const formSchema = z.object(createFormSchema);
  const { trigger } = useSWRMutation("questionsAsks", () =>
    questionAsks(idTopic)
  );
  const { isMutating } = useSWRMutation("asks", () => deleteAsk);

  let defaultSendValues;

  if (action === ActionsFormEnums.Edit) {
    defaultSendValues = {
      question: contextQuestion?.question || "",
      asks:
        contextQuestion?.asks.map((ask) => ({
          ask: ask.ask,
          id: ask.id,
        })) || [],
      topicId: Number(contextQuestion?.topicId),
    };
  } else {
    defaultSendValues = {
      question: "",
      asks: [{ ask: "", id: undefined }],
      topicId: Number(idTopic) || 0,
    };
  }

  const createform = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultSendValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: createform.control,
    name: "asks",
  });

  const addAwnser = () => {
    append({
      ask: "",
      id: undefined,
    });
  };

  const removeAwnser = async (awnserIndex: number, awnserId: number) => {
    if (action === ActionsFormEnums.Edit) {
      try {
        await deleteAsk(awnserId);
        remove(awnserIndex);
        await trigger();
      } catch (error) {
        toast({
          title: "Ocorreu algum erro ao deletar a resposta.",
        });
      }
    } else {
      remove(awnserIndex);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { topicId, question, asks } = values;
      if (!topicId || !question) return;
      const cleanAsks = asks.filter((ask) => ask.ask !== "");
      const sendData: QuestionsAsks = {
        topicId,
        question,
        asks: cleanAsks,
      };
      if (action === ActionsFormEnums.Edit) {
        await editQuestionsAsks(sendData, contextQuestion?.id);
        await trigger();
        setShowModal(false);
        toast({ title: "Pergunta editada com sucesso" });
      } else {
        await createNewQuestionsAsks(sendData);
        await trigger();
        setShowModal(false);
        toast({ title: "Pergunta criada com sucesso" });
      }
    } catch (error) {
      console.error("Erro ao criar pergunta:", error);
    }
  }

  return (
    <Form {...createform}>
      <form onSubmit={createform.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={createform.control}
          name="question"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between items-center align-middle gap-2">
                <h3> Título da pergunta</h3>
                <div className="border-0 text-emerald-500 hover:text-emerald-500 flex justify-between items-center align-middle gap-2">
                  <span>Adicionar resposta</span>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="border-0 text-emerald-500 hover:text-emerald-500"
                    onClick={addAwnser}
                  >
                    <CopyPlus />
                  </Button>
                </div>
              </FormLabel>
              <FormControl>
                <Input placeholder="Pergunta" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {fields && fields.length > 0 && (
          <div className="overflow-y-auto h-60">
            <h5 className="text-orange-800 mb-5">Respostas:</h5>
            {fields.map((question, index) => (
              <FormField
                key={question.id || index}
                name={`asks.${index}.ask`}
                render={({ field }) => (
                  <FormItem className="mb-5">
                    <FormLabel>
                      <div className="flex justify-between items-center align-middle gap-5">
                        <span className="text-orange-800">{index + 1}:</span>
                        <FormControl className="flex-1">
                          <div className="flex justify-between items-center align-middle gap-4">
                            <Input placeholder="Resposta" {...field} />
                            <Button
                              type="button"
                              variant="outline"
                              size="icon"
                              disabled={isMutating}
                              className="border-0 text-red-800 hover:text-red-800"
                              onClick={() =>
                                removeAwnser(
                                  index,
                                  defaultSendValues?.asks[index]?.id ||
                                    question.id
                                )
                              }
                            >
                              {isMutating ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                <Trash2 />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                      </div>
                      <FormMessage className="mt-3 ml-8" />
                    </FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
        )}

        <div className="flex justify-end align-middle gap-5">
          <Button
            variant="secondary"
            className="w-1/4"
            type="button"
            onClick={() => setShowModal(false)}
          >
            Cancelar
          </Button>

          {createform.formState.isSubmitting ? (
            <Button className="bg-primary hover:bg-destructive w-1/4" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Aguarde
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-primary hover:bg-destructive w-1/4"
            >
              {action === ActionsFormEnums.Edit ? "Editar" : "Criar"}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

export default FormCreateQuestions;
