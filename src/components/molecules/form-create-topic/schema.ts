import { z } from "zod";

export const createFormSchema = {
  title: z
    .string()
    .min(3, {
      message: "O título deve conter no mínimo 3 caracteres.",
    })
    .max(20, {
      message: "O título deve conter no máximo 20 caracteres.",
    }),
  image: z.any(),
};
