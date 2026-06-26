import { allQuery, oneQuery, runQuery } from "../database"
import type { CandidateProfile, CandidateEducation, CandidateSkill, CandidateLanguage, CandidateExperience } from "../../types"

export function getProfile(utilisateurId: string): CandidateProfile | null {
  return oneQuery<CandidateProfile>("SELECT * FROM candidate_profiles WHERE utilisateur_id = ?", [utilisateurId])
}

export function upsertProfile(p: CandidateProfile): void {
  const existing = getProfile(p.utilisateur_id)
  if (existing) {
    runQuery(
      `UPDATE candidate_profiles SET titre=?, biographie=?, ville=?, region=?, niveau_etude=?, filiere=?, etablissement=?, disponibilite=?, date_modification=? WHERE utilisateur_id=?`,
      [p.titre, p.biographie, p.ville, p.region, p.niveau_etude, p.filiere, p.etablissement, p.disponibilite, p.date_modification, p.utilisateur_id]
    )
  } else {
    runQuery(
      `INSERT INTO candidate_profiles (id, utilisateur_id, titre, biographie, ville, region, niveau_etude, filiere, etablissement, disponibilite, date_modification) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [p.id, p.utilisateur_id, p.titre, p.biographie, p.ville, p.region, p.niveau_etude, p.filiere, p.etablissement, p.disponibilite, p.date_modification]
    )
  }
}

export function getEducations(candidatId: string): CandidateEducation[] {
  return allQuery<CandidateEducation>("SELECT * FROM candidate_educations WHERE candidat_id = ? ORDER BY annee_debut DESC", [candidatId])
}

export function createEducation(e: CandidateEducation): void {
  runQuery(
    `INSERT INTO candidate_educations (id, candidat_id, diplome, etablissement, domaine, annee_debut, annee_fin, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [e.id, e.candidat_id, e.diplome, e.etablissement, e.domaine, e.annee_debut, e.annee_fin, e.description]
  )
}

export function deleteEducation(id: string, candidatId: string): void {
  runQuery("DELETE FROM candidate_educations WHERE id = ? AND candidat_id = ?", [id, candidatId])
}

export function getSkills(candidatId: string): CandidateSkill[] {
  return allQuery<CandidateSkill>("SELECT * FROM candidate_skills WHERE candidat_id = ?", [candidatId])
}

export function createSkill(s: CandidateSkill): void {
  runQuery("INSERT INTO candidate_skills (id, candidat_id, nom, niveau) VALUES (?, ?, ?, ?)", [s.id, s.candidat_id, s.nom, s.niveau])
}

export function deleteSkill(id: string, candidatId: string): void {
  runQuery("DELETE FROM candidate_skills WHERE id = ? AND candidat_id = ?", [id, candidatId])
}

export function getLanguages(candidatId: string): CandidateLanguage[] {
  return allQuery<CandidateLanguage>("SELECT * FROM candidate_languages WHERE candidat_id = ?", [candidatId])
}

export function createLanguage(l: CandidateLanguage): void {
  runQuery("INSERT INTO candidate_languages (id, candidat_id, langue, niveau) VALUES (?, ?, ?, ?)", [l.id, l.candidat_id, l.langue, l.niveau])
}

export function deleteLanguage(id: string, candidatId: string): void {
  runQuery("DELETE FROM candidate_languages WHERE id = ? AND candidat_id = ?", [id, candidatId])
}

export function getExperiences(candidatId: string): CandidateExperience[] {
  return allQuery<CandidateExperience>("SELECT * FROM candidate_experiences WHERE candidat_id = ? ORDER BY date_debut DESC", [candidatId])
}

export function createExperience(e: CandidateExperience): void {
  runQuery(
    `INSERT INTO candidate_experiences (id, candidat_id, titre, organisation, date_debut, date_fin, description) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [e.id, e.candidat_id, e.titre, e.organisation, e.date_debut, e.date_fin, e.description]
  )
}

export function deleteExperience(id: string, candidatId: string): void {
  runQuery("DELETE FROM candidate_experiences WHERE id = ? AND candidat_id = ?", [id, candidatId])
}

export function getFullProfile(userId: string) {
  const profile = getProfile(userId)
  if (!profile) return null
  return {
    ...profile,
    formations: getEducations(profile.id),
    competences: getSkills(profile.id),
    langues: getLanguages(profile.id),
    experiences: getExperiences(profile.id),
  }
}
