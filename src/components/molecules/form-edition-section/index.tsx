"use client";
import { useContext, useEffect, useState } from "react";
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
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Trash2, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { deleteImage, uploadImage } from "@/app/actions/upload";
function FormEdit() {
  const [load, setLoad] = useState(false);
  const { setShowModal, infoSection, setInfoSection } =
    useContext(Sectioncontext);
  const { trigger } = useSWRMutation("sections", () => getSections);

  const formSchema = z.object(editFormSchema);

  const editSection = (sendData: SendSection, del: boolean = false) => {
    Edit(sendData)
      .then(async () => {
        toast({ title: "Seção editada com sucesso" });
        await trigger();
      })
      .catch((err) => {
        console.error("Erro ao editar a seção:", err);
        toast({ title: "Ocorreu algum erro ao editar a seção" });
      })
      .finally(() => !del && setShowModal(false));
  };

  const createform = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: infoSection?.title || "",
      message: infoSection?.message || "",
      active: infoSection?.active || false,
      image: infoSection?.icon,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { title, message, active } = values;
    if (!title || !message) return;

    let imageFile;

    if (infoSection?.icon) {
      imageFile = infoSection?.icon;
    } else {
      const editImage = createform.getValues("image")
        ? createform.getValues("image")[0]
        : null;

      imageFile = editImage ? await uploadImage(editImage) : undefined;
    }

    const sendData: SendSection = {
      id: infoSection?.id,
      title,
      message,
      active,
      icon: imageFile,
    };

    editSection(sendData);
  }

  const delImage = async (url?: string) => {
    if (!url) return;
    setLoad(true);
    setInfoSection((infoSection) => ({ ...infoSection, icon: undefined }));
    deleteImage(url)
      .then(() => {
        editSection(
          {
            id: infoSection?.id,
            title: infoSection?.title || "",
            message: infoSection?.message || "",
            active: infoSection?.active || false,
            icon: undefined,
          },
          true
        );
        toast({ title: "Imagem deletada com sucesso" });
      })
      .catch((error) => {
        console.error(error);
        toast({ title: "Falha ao deletar a imagem" });
      })
      .finally(() => setLoad(false));
  };

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

        <div className="flex flex-col justify-start items-start gap-6 flex-wrap">
          <div>
            {infoSection?.icon ? (
              <div className="relative w-20 h-20 flex justify-center items-center ">
                {!load ? (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 absolute -right-2 -top-3 z-10 text-destructive"
                      type="button"
                      onClick={() => delImage(infoSection?.icon)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                    <AspectRatio ratio={16 / 16} className="w-full">
                      <Image
                        fill
                        src={infoSection?.icon}
                        alt="Image"
                        className="object-contain"
                      />
                    </AspectRatio>
                  </>
                ) : (
                  <LoaderCircle className="animate-spin h-8 w-8 mr-3" />
                )}
              </div>
            ) : (
              <FormField
                control={createform.control}
                name="image"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2 flex-wrap">
                    <FormLabel>Imagem</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={field.value}
                        type="file"
                        className="mt-0"
                        accept="image/png, image/jpeg, image/webp, image/gif"
                        {...createform.register("image")}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          <div>
            <FormField
              control={createform.control}
              name="active"
              render={({ field }) => (
                <FormItem className="flex flex-col justify-end items-center  w-8">
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
        </div>

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
              Editar
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}

export default FormEdit;
