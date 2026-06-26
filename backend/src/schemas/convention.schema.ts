import { z } from "zod"

export const updateConventionSchema = z.object({
  date_debut: z.string().nullable().optional(),
  date_fin: z.string().nullable().optional(),
  missions: z.string().max(5000).nullable().optional(),
  gratification: z.string().max(200).nullable().optional(),
})
