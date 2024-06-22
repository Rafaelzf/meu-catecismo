import { z } from "zod";

export const createFormSchema = {
  name: z.string().min(3, { message: "Name is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
};
