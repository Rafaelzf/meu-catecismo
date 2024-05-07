import { z } from "zod";

export const editFormSchema = {
  title: z
    .string()
    .min(3, {
      message: "O título deve conter no mínimo 3 caracteres.",
    })
    .max(20, {
      message: "O título deve conter no máximo 20 caracteres.",
    }),
  message: z
    .string()
    .min(10, {
      message: "A mensagem deve conter no mínimo 10 caracteres.",
    })
    .max(50, {
      message: "A mensagem deve conter no máximo 50 caracteres.",
    }),
  active: z.boolean(),
};
