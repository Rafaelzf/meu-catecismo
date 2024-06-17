import { PutBlobResult } from "@vercel/blob";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
export const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
});

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

export const deleteImage = async (url: string) => {
  if (!url) throw new Error();

  try {
    const response = await fetch(`/api/upload?url=${encodeURIComponent(url)}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete image");
    }
    return await response.json();
  } catch (error) {
    console.error("erro ao deletar imagem no blob", error);
  }
};
