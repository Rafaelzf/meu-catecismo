import axios from "axios";

export const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
});

export async function getAsk(questionId?: number) {
  if (!questionId) return [];
  try {
    const response = await instance.get("/ask", {
      params: { questionId },
    });
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(
      "Ocorreu algum erro na tentativa de obter as respostas.",
      error.message
    );
  }
}

export async function deleteAsk(id?: number) {
  if (!id) return;
  try {
    const response = await instance.delete(`/ask`, { data: { id } });
    return response.data;
  } catch (error: any) {
    console.error(error);
    throw new Error(
      "Ocorreu algum erro na tentativa de deletar a resposta.",
      error.message
    );
  }
}
