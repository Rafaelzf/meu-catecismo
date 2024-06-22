import axios from "axios";
export const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}`,
});

export async function getUser(user: string) {
  const response = await instance.get("/user", {
    params: { user },
  });

  return response.data;
}
