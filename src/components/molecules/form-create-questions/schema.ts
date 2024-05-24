import { z } from "zod";

export const createFormSchema = {
  question: z.string().min(3, {
    message: "O título deve conter no mínimo 3 caracteres.",
  }),
  asks: z.array(
    z.object({
      id: z.number().optional(),
      ask: z.string().min(3, {
        message: "A resposta deve conter no mínimo 3 caracteres.",
      }),
    })
  ),
  topicId: z.number(),
};
