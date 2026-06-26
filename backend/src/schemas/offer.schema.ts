import { z } from "zod"

export const createOfferSchema = z.object({
  titre: z.string().min(2, "Le titre doit faire au moins 2 caracteres"),
  type: z.enum(["stage_academique", "stage_professionnel", "emploi"]),
  description: z.string().min(10, "La description doit faire au moins 10 caracteres"),
  profil_recherche: z.string().max(2000).nullable().optional(),
  competences: z.string().max(2000).nullable().optional(),
  ville: z.string().max(100).nullable().optional(),
  region: z.string().max(100).nullable().optional(),
  duree: z.string().max(100).nullable().optional(),
  date_debut: z.string().nullable().optional(),
  date_limite: z.string().nullable().optional(),
  gratification: z.string().max(200).nullable().optional(),
  nombre_places: z.number().int().min(1).default(1),
})

export const updateOfferSchema = createOfferSchema.partial()
