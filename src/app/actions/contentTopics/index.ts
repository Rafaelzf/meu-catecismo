import axios from "axios";
export const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
});

export async function getContentTopics(id?: number) {
  try {
    const response = await instance.get("/topics/contentTopics", {
      params: { id },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(
      "Ocorreu algum erro na tentativa de obter o conteúdo dos tópicos.",
      error.message
    );
  }
}
