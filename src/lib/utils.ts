import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { IncomingMessage } from "http";
import { Readable } from "stream";
import { PutBlobResult } from "@vercel/blob";
import { toast } from "@/components/ui/use-toast";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertDate(date?: string) {
  if (!date) return "";
  const data = new Date(date);

  const dia = data.getDate();
  const mes = data.getMonth() + 1;
  const ano = data.getFullYear();

  const dataFormatada = `${dia}/${mes}/${ano}`;
  return dataFormatada;
}

export const uploadImage = async (file: any): Promise<string | undefined> => {
  if (!file) return;
  if (file.size / 1024 / 1024 > 50) {
    toast({ title: "File size too big (max 50MB)" });
    return;
  }
  try {
    const result = await fetch(`/api/upload`, {
      method: "POST",
      headers: {
        "content-type": file?.type || "application/octet-stream",
      },
      body: file,
    });

    if (result.status === 200) {
      const { url }: PutBlobResult = await result.json();
      return url;
    } else {
      const error = await result.text();
      toast({ title: error });
    }
  } catch (error) {
    console.error("erro ao salvar imagem no blob", error);
  }
};
