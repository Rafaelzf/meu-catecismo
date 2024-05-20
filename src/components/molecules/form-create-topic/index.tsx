"use client";
import { useContext } from "react";

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
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createFormSchema } from "./schema";

import { TopicsContext } from "@/app/store/topics-context";
import useSWRMutation from "swr/mutation";
import { toast } from "@/components/ui/use-toast";
import { createNewTopic, getTopics } from "@/app/actions/topics";
import { Topic } from "../Topic/types";

function FormCreateTopic() {
  const { setShowModal, idSection, sections } = useContext(TopicsContext);
  const { trigger } = useSWRMutation("topics", () => getTopics(idSection));
  const formSchema = z.object(createFormSchema);

  const sectionSlug = sections.filter((section) => section.id === idSection);

  const createform = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { title } = values;

    if (!title || !idSection || !sectionSlug.length) return;

    const sendData: Topic = {
      parentSectionId: idSection,
      title,
      parentSlug: sectionSlug[0].slug || "",
    };

    const response = await createNewTopic(sendData);
    await trigger();
    setShowModal(false);
    const respTitle =
      response?.status === 200
        ? { title: "Tópico criada com sucesso" }
        : { title: "Ocorreu algum erro ao criar o tópico" };
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
              <FormLabel>Nome do tópico</FormLabel>
              <FormControl>
                <Input placeholder="Tópico" {...field} />
              </FormControl>
              <FormDescription>Escreva o nome do tópico.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end align-middle gap-5">
          <Button
            variant="secondary"
            className="w-1/4"
            type="button"
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
              Criar
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

export default FormCreateTopic;
