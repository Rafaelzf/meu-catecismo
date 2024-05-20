import { z } from "zod";

export const editFormSchema = z.object({
  id: z.number().optional(),
  title: z
    .string()
    .min(3, {
      message: "O título deve conter no mínimo 3 caracteres.",
    })
    .max(20, {
      message: "O título deve conter no máximo 20 caracteres.",
    }),

  questionsAsks: z.array(
    z.object({
      question: z.string(),
      asks: z.array(
        z.object({
          ask: z.string(),
        })
      ),
      topicId: z.number(),
    })
  ),
  active: z.boolean(),
});
