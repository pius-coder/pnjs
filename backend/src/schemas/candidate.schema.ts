import { z } from "zod"

export const profileSchema = z.object({
  titre: z.string().max(200).nullable().optional(),
  biographie: z.string().max(2000).nullable().optional(),
  ville: z.string().max(100).nullable().optional(),
  region: z.string().max(100).nullable().optional(),
  niveau_etude: z.string().max(100).nullable().optional(),
  filiere: z.string().max(200).nullable().optional(),
  etablissement: z.string().max(200).nullable().optional(),
  disponibilite: z.string().max(100).nullable().optional(),
})

export const educationSchema = z.object({
  diplome: z.string().min(1, "Diplome requis"),
  etablissement: z.string().min(1, "Etablissement requis"),
  domaine: z.string().min(1, "Domaine requis"),
  annee_debut: z.number().int().min(1900).max(2100),
  annee_fin: z.number().int().min(1900).max(2100).nullable().optional(),
  description: z.string().max(2000).nullable().optional(),
})

export const skillSchema = z.object({
  nom: z.string().min(1, "Nom de la competence requis"),
  niveau: z.string().max(100).nullable().optional(),
})

export const languageSchema = z.object({
  langue: z.string().min(1, "Langue requise"),
  niveau: z.string().min(1, "Niveau requis"),
})

export const experienceSchema = z.object({
  titre: z.string().min(1, "Titre requis"),
  organisation: z.string().min(1, "Organisation requise"),
  date_debut: z.string().min(1, "Date debut requise"),
  date_fin: z.string().nullable().optional(),
  description: z.string().max(2000).nullable().optional(),
})
