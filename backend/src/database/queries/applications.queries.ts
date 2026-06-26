import { allQuery, oneQuery, runQuery } from "../database"
import type { Application, ApplicationHistory, ApplicationStatus } from "../../types"

export function findById(id: string): Application | null {
  return oneQuery<Application>("SELECT * FROM applications WHERE id = ?", [id])
}

export function findByCandidatAndOffer(candidatId: string, offreId: string): Application | null {
  return oneQuery<Application>("SELECT * FROM applications WHERE candidat_id = ? AND offre_id = ?", [candidatId, offreId])
}

export function createApplication(a: Application): void {
  runQuery(
    `INSERT INTO applications (id, offre_id, candidat_id, message, statut, date_creation, date_modification) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [a.id, a.offre_id, a.candidat_id, a.message, a.statut, a.date_creation, a.date_modification]
  )
}

export function updateStatus(id: string, statut: ApplicationStatus): void {
  runQuery("UPDATE applications SET statut = ?, date_modification = ? WHERE id = ?", [statut, new Date().toISOString(), id])
}

export function findByCandidat(candidatId: string): Application[] {
  return allQuery<Application>("SELECT * FROM applications WHERE candidat_id = ? ORDER BY date_creation DESC", [candidatId])
}

export function findByOffer(offreId: string): Application[] {
  return allQuery<Application>("SELECT * FROM applications WHERE offre_id = ? ORDER BY date_creation DESC", [offreId])
}

export function findApplicationsByEntreprise(entrepriseId: string): (Application & { offre_titre: string })[] {
  return allQuery<Application & { offre_titre: string }>(
    `SELECT a.*, o.titre as offre_titre FROM applications a JOIN offers o ON a.offre_id = o.id WHERE o.entreprise_id = ? ORDER BY a.date_creation DESC`,
    [entrepriseId]
  )
}

export function createHistory(h: ApplicationHistory): void {
  runQuery(
    `INSERT INTO application_history (id, candidature_id, ancien_statut, nouveau_statut, utilisateur_id, commentaire, date) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [h.id, h.candidature_id, h.ancien_statut, h.nouveau_statut, h.utilisateur_id, h.commentaire, h.date]
  )
}

export function getHistory(candidatureId: string): ApplicationHistory[] {
  return allQuery<ApplicationHistory>("SELECT * FROM application_history WHERE candidature_id = ? ORDER BY date DESC", [candidatureId])
}
