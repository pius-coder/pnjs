import { getFullProfile, upsertProfile, createEducation, deleteEducation, createSkill, deleteSkill, createLanguage, deleteLanguage, createExperience, deleteExperience } from "../database/queries/candidates.queries"
import { generateId, nowISO } from "../utils"
import { HTTPError } from "../middlewares/error.middleware"
import type { CandidateProfile } from "../types"

export function getProfile(userId: string) {
  const profile = getFullProfile(userId)
  if (!profile) return null
  return profile
}

export function saveProfile(userId: string, data: Record<string, unknown>): void {
  const existing = getFullProfile(userId)
  const profile: CandidateProfile = {
    id: existing?.id || generateId(),
    utilisateur_id: userId,
    titre: (data.titre as string) || null,
    biographie: (data.biographie as string) || null,
    ville: (data.ville as string) || null,
    region: (data.region as string) || null,
    niveau_etude: (data.niveau_etude as string) || null,
    filiere: (data.filiere as string) || null,
    etablissement: (data.etablissement as string) || null,
    disponibilite: (data.disponibilite as string) || null,
    date_modification: nowISO(),
  }
  upsertProfile(profile)
}

export function addEducation(userId: string, data: {
  diplome: string
  etablissement: string
  domaine: string
  annee_debut: number
  annee_fin?: number | null
  description?: string | null
}): void {
  const profile = getFullProfile(userId)
  if (!profile) throw new HTTPError(400, "Profil candidat inexistant")

  createEducation({
    id: generateId(),
    candidat_id: profile.id,
    diplome: data.diplome,
    etablissement: data.etablissement,
    domaine: data.domaine,
    annee_debut: data.annee_debut,
    annee_fin: data.annee_fin ?? null,
    description: data.description ?? null,
  })
}

export function removeEducation(userId: string, educationId: string): void {
  const profile = getFullProfile(userId)
  if (!profile) throw new HTTPError(400, "Profil candidat inexistant")
  deleteEducation(educationId, profile.id)
}

export function addSkill(userId: string, data: { nom: string; niveau?: string | null }): void {
  const profile = getFullProfile(userId)
  if (!profile) throw new HTTPError(400, "Profil candidat inexistant")

  createSkill({
    id: generateId(),
    candidat_id: profile.id,
    nom: data.nom,
    niveau: data.niveau ?? null,
  })
}

export function removeSkill(userId: string, skillId: string): void {
  const profile = getFullProfile(userId)
  if (!profile) throw new HTTPError(400, "Profil candidat inexistant")
  deleteSkill(skillId, profile.id)
}

export function addLanguage(userId: string, data: { langue: string; niveau: string }): void {
  const profile = getFullProfile(userId)
  if (!profile) throw new HTTPError(400, "Profil candidat inexistant")

  createLanguage({
    id: generateId(),
    candidat_id: profile.id,
    langue: data.langue,
    niveau: data.niveau,
  })
}

export function removeLanguage(userId: string, languageId: string): void {
  const profile = getFullProfile(userId)
  if (!profile) throw new HTTPError(400, "Profil candidat inexistant")
  deleteLanguage(languageId, profile.id)
}

export function addExperience(userId: string, data: {
  titre: string
  organisation: string
  date_debut: string
  date_fin?: string | null
  description?: string | null
}): void {
  const profile = getFullProfile(userId)
  if (!profile) throw new HTTPError(400, "Profil candidat inexistant")

  createExperience({
    id: generateId(),
    candidat_id: profile.id,
    titre: data.titre,
    organisation: data.organisation,
    date_debut: data.date_debut,
    date_fin: data.date_fin ?? null,
    description: data.description ?? null,
  })
}

export function removeExperience(userId: string, experienceId: string): void {
  const profile = getFullProfile(userId)
  if (!profile) throw new HTTPError(400, "Profil candidat inexistant")
  deleteExperience(experienceId, profile.id)
}
