import axios from "axios";

export const instance = axios.create({
  baseURL: `${process.env.BASE_URL}`,
});

export async function getSections() {
  try {
    const response = await instance.get("/sections");
    return response.data;
  } catch (error: any) {
    throw new Error(
      "Ocorreu algum erro na tentativa de obter as secoes.",
      error.message
    );
  }
}

export async function createNewSection() {
  try {
    const response = await instance.post("/sections", {
      firstName: "Santos",
      lastName: "Dumont",
    });
    return console.log(response.data);
  } catch (error) {
    throw new Error("Could not create new section");
  }
}
