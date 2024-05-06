"use client";
import { useContext } from "react";
import { z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { createFormSchema } from "./schema";
import { SendSection } from "../sections/types";
import { createNewSection, getSections } from "@/app/actions";
import Sectioncontext from "@/app/store/sections-context";
import useSWRMutation from "swr/mutation";
import { toast } from "@/components/ui/use-toast";

function FormCreateSection() {
  const { setShowModal } = useContext(Sectioncontext);
  const { trigger } = useSWRMutation("sections", getSections);
  const formSchema = z.object(createFormSchema);

  const createform = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, message } = values;
    if (!title || !message) return;

    const sendData: SendSection = {
      title,
      message,
      slug: `${title.toLowerCase()}_${message.toLowerCase()}`,
    };

    const response = await createNewSection(sendData);
    await trigger();
    setShowModal(false);

    if (response?.status === 200) {
      toast({
        title: "Seção criada com sucesso",
      });
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
              <FormLabel>Título da seção</FormLabel>
              <FormControl>
                <Input placeholder="Título" {...field} />
              </FormControl>
              <FormDescription>Escreva o título da seção.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={createform.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descrição"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Escreva uma pequena descrição da seção.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end align-middle">
          <Button
            type="submit"
            className="bg-primary hover:bg-destructive w-1/4"
          >
            Criar
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default FormCreateSection;
