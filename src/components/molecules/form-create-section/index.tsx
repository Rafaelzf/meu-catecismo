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
import { Textarea } from "@/components/ui/textarea";
import { createFormSchema } from "./schema";
import { SendSection } from "../sections/types";
import { createNewSection, getSections } from "@/app/actions/sections";
import Sectioncontext from "@/app/store/sections-context";
import useSWRMutation from "swr/mutation";
import { toast } from "@/components/ui/use-toast";
import { PutBlobResult } from "@vercel/blob";
import axios from "axios";
import { uploadImage } from "@/lib/utils";

function FormCreate() {
  const { setShowModal } = useContext(Sectioncontext);
  const { trigger } = useSWRMutation("sections", () => getSections);
  const formSchema = z.object(createFormSchema);

  const createform = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      image: undefined,
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, message } = values;
    if (!title || !message) return;
    const image = createform.getValues("image")[0];

    const imageFile = await uploadImage(image);

    const sendData: SendSection = {
      title,
      message,
      icon: imageFile || undefined,
    };

    const response = await createNewSection(sendData);
    await trigger();
    setShowModal(false);
    const respTitle =
      response?.status === 200
        ? { title: "Seção criada com sucesso" }
        : { title: "Ocorreu algum erro ao criar a seção" };
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
          name="image"
          render={() => (
            <FormItem>
              <FormLabel>Imagem da seção</FormLabel>
              <FormControl>
                <Input
                  placeholder="Imagem"
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  {...createform.register("image")}
                />
              </FormControl>
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
        <div className="flex justify-end align-middle gap-5">
          <Button
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
              Criar
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

export default FormCreate;
