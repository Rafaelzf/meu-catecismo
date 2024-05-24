import { QuestionsAsks } from "@/components/molecules/Topic/types";
import axios from "axios";

export const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
});

export async function questionAsks(topicId?: number) {
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

export async function createNewQuestionsAsks(params: QuestionsAsks) {
  if (!params) return;

  try {
    const response = await instance.post(`/questionsAsks`, {
      topicId: params.topicId,
      question: params.question,
      asks: params.asks,
    });

    return Response.json(response);
  } catch (error) {
    console.error(error);
    throw new Error("Could not create new questionsAsks");
  }
}

export async function editQuestionsAsks(
  params: QuestionsAsks,
  questionId?: number
) {
  if (!params) return;

  try {
    const response = await instance.patch(`/questionsAsks`, {
      questionId: questionId,
      topicId: params.topicId,
      question: params.question,
      asks: params.asks,
    });

    return Response.json(response);
  } catch (error) {
    console.error(error);
    throw new Error("Could not create new questionsAsks");
  }
}

export async function deleteQuestionsAsks(id?: number) {
  console.log(id);
  if (!id) return;
  try {
    const response = await instance.delete(`/questionsAsks`, {
      data: { id },
    });
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Could not delete questionsAsks");
  }
}
