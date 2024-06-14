import { z } from "zod";
const MAX_FILE_SIZE = 500000;
const ACCEPTED_MIME_TYPES = ["jpeg", "jpg", "png"];

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
  message: z
    .string()
    .min(10, {
      message: "A mensagem deve conter no mínimo 10 caracteres.",
    })
    .max(100, {
      message: "A mensagem deve conter no máximo 100 caracteres.",
    }),
};
