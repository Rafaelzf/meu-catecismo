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
import { editFormSchema } from "./schema";
import { SendSection } from "../sections/types";
import { getSections, Edit } from "@/app/actions/sections";
import Sectioncontext from "@/app/store/sections-context";
import useSWRMutation from "swr/mutation";
import { toast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";

function FormEditQuestions() {
  const { setShowModal, infoSection } = useContext(Sectioncontext);
  const { trigger } = useSWRMutation("sections", getSections);
  const formSchema = z.object(editFormSchema);

  const createform = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: infoSection?.title || "",
      message: infoSection?.message || "",
      active: infoSection?.active || false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, message, active } = values;
    if (!title || !message) return;

    const sendData: SendSection = {
      id: infoSection?.id,
      title,
      message,
      active: active,
    };

    const response = await Edit(sendData);
    await trigger();
    setShowModal(false);

    const respTitle =
      response?.status === 200
        ? { title: "Seção editada com sucesso" }
        : { title: "Ocorreu algum erro ao editar a seção" };
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
          name="active"
          render={({ field }) => (
            <FormItem className="flex justify-start items-center gap-4 w-8">
              <FormLabel
                className={field.value ? "text-emerald-500" : "text-zinc-400"}
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
              Editar
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

export default FormEditQuestions;
