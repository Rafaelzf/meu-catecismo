import axios from "axios";
import { SendSection } from "@/components/molecules/sections/types";
import slugify from "slugify";
export const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
});

export async function getSections() {
  try {
    const response = await instance.get("/sections");
    return response.data;
  } catch (error: any) {
    throw new Error(
      "Ocorreu algum erro na tentativa de obter as seções.",
      error.message
    );
  }
}

export async function createNewSection(params: SendSection) {
  if (!params) return;

  try {
    const response = await instance.post(`/sections`, {
      title: params.title,
      slug: slugify(params.title, { lower: true }),
      message: params.message,
    });

    return Response.json(response);
  } catch (error) {
    throw new Error("Could not create new section");
  }
}

export async function editSection(sendData: SendSection) {
  const { id, title, message, active } = sendData;
  if (!id || active === null || active === undefined || !title || !message)
    return;
  try {
    const response = await instance.patch(`/sections`, {
      id,
      title,
      message,
      active,
    });
    return response;
  } catch (error) {
    throw new Error("Could not disable section");
  }
}

export async function deleteSection(id?: number) {
  if (!id) return;
  try {
    const response = await instance.delete(`/sections`, { data: { id } });
    return response;
  } catch (error) {
    throw new Error("Could not delete section");
  }
}

export async function getContentTopic() {
  try {
    const response = await instance.get("/topics/contentTopics");
    return response.data;
  } catch (error: any) {
    throw new Error(
      "Ocorreu algum erro na tentativa de obter do conteúdo dos tópicos.",
      error.message
    );
  }
}
