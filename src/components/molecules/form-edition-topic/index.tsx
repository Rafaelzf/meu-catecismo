"use client";
import { useContext } from "react";
import Link from "next/link";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Topic } from "../Topic/types";
import { questionAsks } from "@/app/actions/questionsAsks";
import useSWR from "swr";

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

  const defaultSendValues = {
    title: currentTopic?.title || "",
    active: currentTopic?.active || false,
  };

  const createform = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: defaultSendValues,
  });

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

    try {
      await editTopic(sendData);
      await trigger();
      setShowModal(false);
      toast({ title: "Topico editado com sucesso" });
    } catch (error) {
      console.error("Erro ao editar o Topico:", error);
      toast({ title: "Ocorreu algum erro ao editar o Topico" });
    }
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
            href={`/admin/topics/topic/${currentTopic?.id}/${currentTopic?.title}`}
            className=" p-3 rounded-lg border-0 text-emerald-500 hover:text-emerald-500 
            flex justify-end items-center align-middle gap-3 hover:bg-emerald-50"
            onClick={() => setShowModal(false)}
          >
            <span>Perguntas e respostas</span>
            <Badge className="bg-orange-500">
              {isValidating ? (
                <span>
                  <Loader2 className="h-4 w-2 animate-spin" />
                </span>
              ) : (
                <span>{(areThereQuestions && data.length) || 0}</span>
              )}
            </Badge>
          </Link>
        </div>

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
