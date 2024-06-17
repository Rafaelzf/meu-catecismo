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
  active: z.boolean(),
  image: z.any(),
});
