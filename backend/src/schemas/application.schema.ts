import { z } from "zod"

export const createApplicationSchema = z.object({
  message: z.string().max(2000).nullable().optional(),
})

export const updateStatusSchema = z.object({
  statut: z.enum(["en_etude", "entretien", "acceptee", "refusee"]),
  commentaire: z.string().max(500).nullable().optional(),
})
