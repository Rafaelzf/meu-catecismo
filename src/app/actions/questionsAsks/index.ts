import axios from "axios";
import { Topic } from "@/components/molecules/Topic/types";

export const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
});

export async function questionAsks(topicId?: number) {
  console.log({ topicId });
  if (!topicId) return [];
  try {
    const response = await instance.get("/questionsAsks", {
      params: { topicId },
    });
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(
      "Ocorreu algum erro na tentativa de obter o grupo de perguntas e respostas.",
      error.message
    );
  }
}
