"use client";
import { useContext, useState } from "react";
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
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { Trash2, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { Topic } from "../Topic/types";
import { questionAsks } from "@/app/actions/questionsAsks";
import useSWR from "swr";
import { deleteImage, uploadImage } from "@/app/actions/upload";

function FormEditTopic() {
  const [load, setLoad] = useState(false);
  const { topics, setShowModal, idSection, idTopic, setTopics } =
    useContext(TopicsContext);
  const currentTopic = topics.find((topic) => topic.id === idTopic);
  const { trigger } = useSWRMutation("topics", () => getTopics(idSection));
  const { data, isValidating, error } = useSWR(
    currentTopic ? `questionAsks-${currentTopic.id}` : undefined,
    () => questionAsks(currentTopic?.id),
    { revalidateOnFocus: false }
  );

  const edit = (sendData: Topic, del: boolean = false) => {
    if (!sendData) return;
    editTopic(sendData)
      .then(async () => {
        await trigger();
        toast({ title: "Topico editado com sucesso" });
      })
      .catch((error) => {
        console.error("Erro ao editar o Topico:", error);
        toast({ title: "Ocorreu algum erro ao editar o Topico" });
      })
      .finally(() => !del && setShowModal(false));
  };

  const areThereQuestions = data && data.length > 0 && !error && !isValidating;

  const defaultSendValues = {
    title: currentTopic?.title || "",
    active: currentTopic?.active || false,
    image: currentTopic?.image || "",
  };

  const createform = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: defaultSendValues,
  });

  async function onSubmit(values: z.infer<typeof editFormSchema>) {
    const { title, active } = values;
    if (!title || !idTopic) return;

    let imageFile;

    if (currentTopic?.image) {
      imageFile = currentTopic?.image;
    } else {
      const editImage = createform.getValues("image")[0];
      imageFile = await uploadImage(editImage);
    }

    const sendData: Topic = {
      id: idTopic,
      title,
      active: active,
      parentSlug: currentTopic?.parentSlug || "",
      parentSectionId: currentTopic?.parentSectionId || 0,
      image: imageFile,
    };
    edit(sendData);
  }

  const delImage = async (url?: string) => {
    if (!url) return;
    setLoad(true);
    const newTopic = topics.map((topic) => {
      if (topic.id === idTopic) {
        return {
          ...topic,
          image: undefined,
        };
      }
      return topic;
    });

    setTopics(newTopic);
    deleteImage(url)
      .then(() => {
        edit(
          {
            id: idTopic,
            title: currentTopic?.title || "",
            active: currentTopic?.active || false,
            parentSlug: currentTopic?.parentSlug || "",
            parentSectionId: currentTopic?.parentSectionId || 0,
            image: undefined,
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
        <div>
          {currentTopic?.image ? (
            <div className="relative w-20 h-20 flex justify-center items-center ">
              {!load ? (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 absolute -right-2 -top-3 z-10 text-destructive"
                    type="button"
                    onClick={() => delImage(currentTopic?.image)}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                  <AspectRatio ratio={16 / 16} className="w-full">
                    <Image
                      priority
                      fill
                      src={currentTopic?.image}
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
