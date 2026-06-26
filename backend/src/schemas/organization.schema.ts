import { z } from "zod"

export const createOrgSchema = z.object({
  type: z.enum(["entreprise", "etablissement"]),
  nom: z.string().min(2, "Le nom doit faire au moins 2 caracteres"),
  description: z.string().max(2000).nullable().optional(),
  secteur: z.string().max(200).nullable().optional(),
  ville: z.string().max(100).nullable().optional(),
  region: z.string().max(100).nullable().optional(),
  adresse: z.string().max(500).nullable().optional(),
  telephone: z.string().max(50).nullable().optional(),
  email: z.string().email().nullable().optional().or(z.literal("")),
  site_web: z.string().url().nullable().optional().or(z.literal("")),
})

export const updateOrgSchema = createOrgSchema.partial()
