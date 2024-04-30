import axios from "axios";
import { SendSection } from "@/components/molecules/sections/types";
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
    const numeroAleatorio = Math.floor(Math.random() * 100) + 1;
    const response = await instance.post(`/sections`, {
      title: params.title + numeroAleatorio,
      slug: params.slug + numeroAleatorio,
      message: params.message,
    });
    return Response.json(response);
  } catch (error) {
    throw new Error("Could not create new section");
  }
}

export async function changeStatus(id: number, isEnable: boolean) {
  try {
    const response = await instance.patch(`/sections`, { id, isEnable });
    return response.data;
  } catch (error) {
    throw new Error("Could not disable section");
  }
}

export async function deleteSection(id: number) {
  try {
    const response = await instance.delete(`/sections`, { data: { id } });
    return response.data;
  } catch (error) {
    throw new Error("Could not delete section");
  }
}
