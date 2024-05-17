import axios from "axios";
import { Topic } from "@/components/molecules/Topic/types";

export const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
});

export async function getTopics(id?: number) {
  try {
    const response = await instance.get("/topics", {
      params: { id },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      "Ocorreu algum erro na tentativa de obter os tópicos.",
      error.message
    );
  }
}

export async function createNewTopic(params: Topic) {
  if (!params) return;

  try {
    const response = await instance.post(`/topics`, {
      parentSectionId: params.parentSectionId,
      title: params.title,
      parentSlug: params.parentSlug,
    });

    return Response.json(response);
  } catch (error) {
    throw new Error("Could not create new topic");
  }
}

// export async function editTopic(sendData: Topic) {
//   const { id, title, message, active } = sendData;
//   if (!id || active === null || active === undefined || !title || !message)
//     return;
//   try {
//     const response = await instance.patch(`/topics`, {
//       id,
//       title,
//       message,
//       active,
//     });
//     return response;
//   } catch (error) {
//     throw new Error("Could not disable topic");
//   }
// }

export async function deleteTopic(id?: number) {
  if (!id) return;
  try {
    const response = await instance.delete(`/topics`, { data: { id } });
    return response;
  } catch (error) {
    throw new Error("Could not delete topic");
  }
}
