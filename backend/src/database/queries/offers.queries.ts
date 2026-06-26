import { allQuery, oneQuery, runQuery } from "../database"
import type { Offer, OfferStatus, OfferType } from "../../types"

export function findById(id: string): Offer | null {
  return oneQuery<Offer>("SELECT * FROM offers WHERE id = ?", [id])
}

export function createOffer(o: Offer): void {
  runQuery(
    `INSERT INTO offers (id, entreprise_id, titre, type, description, profil_recherche, competences, ville, region, duree, date_debut, date_limite, gratification, nombre_places, statut, date_publication, date_creation, date_modification)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [o.id, o.entreprise_id, o.titre, o.type, o.description, o.profil_recherche, o.competences, o.ville, o.region, o.duree, o.date_debut, o.date_limite, o.gratification, o.nombre_places, o.statut, o.date_publication, o.date_creation, o.date_modification]
  )
}

const ALLOWED_OFFER_FIELDS = new Set(["titre", "type", "description", "profil_recherche", "competences", "ville", "region", "duree", "date_debut", "date_limite", "gratification", "nombre_places"])

export function updateOffer(id: string, data: Partial<Offer>): void {
  const sets: string[] = []
  const params: unknown[] = []
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined && ALLOWED_OFFER_FIELDS.has(key)) {
      sets.push(`${key} = ?`)
      params.push(value)
    }
  }
  if (sets.length === 0) return
  sets.push("date_modification = ?")
  params.push(new Date().toISOString())
  params.push(id)
  runQuery(`UPDATE offers SET ${sets.join(", ")} WHERE id = ?`, params)
}

export function setOfferStatus(id: string, statut: OfferStatus): void {
  const now = new Date().toISOString()
  const pubDate = statut === "publiee" ? now : null
  runQuery("UPDATE offers SET statut = ?, date_publication = ?, date_modification = ? WHERE id = ?", [statut, pubDate, now, id])
}

export function findPublicOffers(filters: {
  search?: string
  type?: string
  region?: string
  page: number
  limit: number
}): { offers: Offer[]; total: number } {
  const conditions: string[] = ["statut = 'publiee'"]
  const params: unknown[] = []

  if (filters.search) {
    conditions.push("(titre LIKE ? OR description LIKE ?)")
    params.push(`%${filters.search}%`, `%${filters.search}%`)
  }
  if (filters.type) {
    conditions.push("type = ?")
    params.push(filters.type)
  }
  if (filters.region) {
    conditions.push("region = ?")
    params.push(filters.region)
  }

  const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : ""
  const total = oneQuery<{ count: number }>(`SELECT COUNT(*) as count FROM offers ${where}`, params)
  const offers = allQuery<Offer>(
    `SELECT * FROM offers ${where} ORDER BY date_publication DESC LIMIT ? OFFSET ?`,
    [...params, filters.limit, (filters.page - 1) * filters.limit]
  )
  return { offers, total: total?.count ?? 0 }
}

export function findByEntreprise(entrepriseId: string): Offer[] {
  return allQuery<Offer>("SELECT * FROM offers WHERE entreprise_id = ? ORDER BY date_creation DESC", [entrepriseId])
}

export function findPendingOffers(page: number, limit: number): { offers: Offer[]; total: number } {
  const total = oneQuery<{ count: number }>("SELECT COUNT(*) as count FROM offers WHERE statut = 'en_attente'")
  const offers = allQuery<Offer>("SELECT * FROM offers WHERE statut = 'en_attente' ORDER BY date_creation DESC LIMIT ? OFFSET ?", [limit, (page - 1) * limit])
  return { offers, total: total?.count ?? 0 }
}

export function deleteOffer(id: string, entrepriseId: string): void {
  runQuery("DELETE FROM offers WHERE id = ? AND entreprise_id = ?", [id, entrepriseId])
}
