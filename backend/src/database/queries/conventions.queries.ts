import { allQuery, oneQuery, runQuery } from "../database"
import type { Convention, ConventionStatus } from "../../types"

export function findById(id: string): Convention | null {
  return oneQuery<Convention>("SELECT * FROM conventions WHERE id = ?", [id])
}

export function findByCandidature(candidatureId: string): Convention | null {
  return oneQuery<Convention>("SELECT * FROM conventions WHERE candidature_id = ?", [candidatureId])
}

export function createConvention(c: Convention): void {
  runQuery(
    `INSERT INTO conventions (id, candidature_id, candidat_id, entreprise_id, etablissement_id, date_debut, date_fin, missions, gratification, statut, date_validation_entreprise, date_validation_candidat, date_validation_etablissement, chemin_pdf, date_creation, date_modification)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [c.id, c.candidature_id, c.candidat_id, c.entreprise_id, c.etablissement_id, c.date_debut, c.date_fin, c.missions, c.gratification, c.statut, c.date_validation_entreprise, c.date_validation_candidat, c.date_validation_etablissement, c.chemin_pdf, c.date_creation, c.date_modification]
  )
}

export function updateStatus(id: string, statut: ConventionStatus): void {
  const now = new Date().toISOString()
  const fields: Record<ConventionStatus, string> = {
    creee: "",
    validee_entreprise: "date_validation_entreprise",
    validee_candidat: "date_validation_candidat",
    validee_etablissement: "date_validation_etablissement",
    finalisee: "date_validation_etablissement",
  }
  const dateField = fields[statut]
  if (dateField) {
    runQuery(`UPDATE conventions SET statut = ?, ${dateField} = ?, date_modification = ? WHERE id = ?`, [statut, now, now, id])
  } else {
    runQuery("UPDATE conventions SET statut = ?, date_modification = ? WHERE id = ?", [statut, now, id])
  }
}

export function updatePdfPath(id: string, chemin: string): void {
  runQuery("UPDATE conventions SET chemin_pdf = ?, date_modification = ? WHERE id = ?", [chemin, new Date().toISOString(), id])
}

const ALLOWED_CONVENTION_FIELDS = new Set(["date_debut", "date_fin", "missions", "gratification", "etablissement_id", "chemin_pdf"])

export function updateConvention(id: string, data: Partial<Convention>): void {
  const sets: string[] = []
  const params: unknown[] = []
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && ALLOWED_CONVENTION_FIELDS.has(key)) {
      sets.push(`${key} = ?`)
      params.push(value)
    }
  }
  if (sets.length === 0) return
  sets.push("date_modification = ?")
  params.push(new Date().toISOString())
  params.push(id)
  runQuery(`UPDATE conventions SET ${sets.join(", ")} WHERE id = ?`, params)
}

export function findByCandidat(candidatId: string): Convention[] {
  return allQuery<Convention>("SELECT * FROM conventions WHERE candidat_id = ? ORDER BY date_creation DESC", [candidatId])
}

export function findByEntreprise(entrepriseId: string): Convention[] {
  return allQuery<Convention>("SELECT * FROM conventions WHERE entreprise_id = ? ORDER BY date_creation DESC", [entrepriseId])
}

export function findByEtablissement(etablissementId: string): Convention[] {
  return allQuery<Convention>("SELECT * FROM conventions WHERE etablissement_id = ? ORDER BY date_creation DESC", [etablissementId])
}

export function findAllConventions(): Convention[] {
  return allQuery<Convention>("SELECT * FROM conventions ORDER BY date_creation DESC")
}
