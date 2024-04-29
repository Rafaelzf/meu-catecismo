import axios from "axios";

export const instance = axios.create({
  baseURL: `${process.env.LOCAL_URL}`,
});

export async function getSections() {
  try {
    const response = await instance.get("/sections");
    return response.data;
  } catch (error) {
    throw new Error("Could not get sections");
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
