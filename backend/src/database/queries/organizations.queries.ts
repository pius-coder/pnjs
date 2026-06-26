import { allQuery, oneQuery, runQuery } from "../database"
import type { Organization, OrgStatus } from "../../types"

export function findById(id: string): Organization | null {
  return oneQuery<Organization>("SELECT * FROM organizations WHERE id = ?", [id])
}

export function findByProprietaire(proprietaireId: string): Organization | null {
  return oneQuery<Organization>("SELECT * FROM organizations WHERE proprietaire_id = ?", [proprietaireId])
}

export function createOrg(o: Organization): void {
  runQuery(
    `INSERT INTO organizations (id, proprietaire_id, type, nom, description, secteur, ville, region, adresse, telephone, email, site_web, logo, statut, date_creation, date_modification)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [o.id, o.proprietaire_id, o.type, o.nom, o.description, o.secteur, o.ville, o.region, o.adresse, o.telephone, o.email, o.site_web, o.logo, o.statut, o.date_creation, o.date_modification]
  )
}

const ALLOWED_ORG_FIELDS = new Set(["nom", "description", "secteur", "ville", "region", "adresse", "telephone", "email", "site_web", "logo"])

export function updateOrg(id: string, data: Partial<Organization>): void {
  const sets: string[] = []
  const params: unknown[] = []
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && ALLOWED_ORG_FIELDS.has(key)) {
      sets.push(`${key} = ?`)
      params.push(value)
    }
  }
  if (sets.length === 0) return
  sets.push("date_modification = ?")
  params.push(new Date().toISOString())
  params.push(id)
  runQuery(`UPDATE organizations SET ${sets.join(", ")} WHERE id = ?`, params)
}

export function setStatus(id: string, statut: OrgStatus): void {
  const now = new Date().toISOString()
  runQuery("UPDATE organizations SET statut = ?, date_modification = ? WHERE id = ?", [statut, now, id])
}

export function findAllByStatus(statut: string | null, page: number, limit: number): { orgs: Organization[]; total: number } {
  const where = statut ? "WHERE statut = ?" : ""
  const params: unknown[] = statut ? [statut] : []
  const total = oneQuery<{ count: number }>(`SELECT COUNT(*) as count FROM organizations ${where}`, params)
  const orgs = allQuery<Organization>(
    `SELECT * FROM organizations ${where} ORDER BY date_creation DESC LIMIT ? OFFSET ?`,
    [...params, limit, (page - 1) * limit]
  )
  return { orgs, total: total?.count ?? 0 }
}
