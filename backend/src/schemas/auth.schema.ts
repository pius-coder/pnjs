import { z } from "zod"

export const registerSchema = z.object({
  prenom: z.string().min(2, "Le prenom doit faire au moins 2 caracteres"),
  nom: z.string().min(2, "Le nom doit faire au moins 2 caracteres"),
  email: z.string().email("Email invalide"),
  mot_de_passe: z.string().min(6, "Le mot de passe doit faire au moins 6 caracteres"),
  confirmation: z.string(),
  role: z.enum(["candidat", "entreprise", "etablissement"]),
}).refine(data => data.mot_de_passe === data.confirmation, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmation"],
})

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  mot_de_passe: z.string().min(1, "Mot de passe requis"),
})

export const changePasswordSchema = z.object({
  ancien_mot_de_passe: z.string().min(1, "Ancien mot de passe requis"),
  nouveau_mot_de_passe: z.string().min(6, "Le nouveau mot de passe doit faire au moins 6 caracteres"),
})
