import { findById as findOrgById } from "../database/queries/organizations.queries"
import { findById, createOffer, updateOffer, setOfferStatus, findPublicOffers, findByEntreprise, findPendingOffers, deleteOffer } from "../database/queries/offers.queries"
import { generateId, nowISO } from "../utils"
import { HTTPError } from "../middlewares/error.middleware"
import type { Offer, OfferType } from "../types"

export function getOffer(id: string): Offer {
  const offer = findById(id)
  if (!offer) throw new HTTPError(404, "Offre non trouvee")
  return offer
}

export function create(data: {
  entrepriseId: string
  titre: string
  type: OfferType
  description: string
  profil_recherche?: string | null
  competences?: string | null
  ville?: string | null
  region?: string | null
  duree?: string | null
  date_debut?: string | null
  date_limite?: string | null
  gratification?: string | null
  nombre_places?: number
}): Offer {
  const org = findOrgById(data.entrepriseId)
  if (!org || org.type !== "entreprise") {
    throw new HTTPError(400, "Organisation entreprise invalide")
  }

  const now = nowISO()
  const offer: Offer = {
    id: generateId(),
    entreprise_id: data.entrepriseId,
    titre: data.titre,
    type: data.type,
    description: data.description,
    profil_recherche: data.profil_recherche ?? null,
    competences: data.competences ?? null,
    ville: data.ville ?? null,
    region: data.region ?? null,
    duree: data.duree ?? null,
    date_debut: data.date_debut ?? null,
    date_limite: data.date_limite ?? null,
    gratification: data.gratification ?? null,
    nombre_places: data.nombre_places ?? 1,
    statut: "brouillon",
    date_publication: null,
    date_creation: now,
    date_modification: now,
  }

  createOffer(offer)
  return offer
}

export function update(id: string, entrepriseId: string, data: Record<string, unknown>): void {
  const offer = findById(id)
  if (!offer) throw new HTTPError(404, "Offre non trouvee")
  if (offer.entreprise_id !== entrepriseId) {
    throw new HTTPError(403, "Vous n'etes pas proprietaire de cette offre")
  }
  if (offer.statut !== "brouillon") {
    throw new HTTPError(400, "Seules les offres en brouillon peuvent etre modifiees")
  }
  updateOffer(id, data)
}

export function submit(id: string, entrepriseId: string): void {
  const offer = findById(id)
  if (!offer) throw new HTTPError(404, "Offre non trouvee")
  if (offer.entreprise_id !== entrepriseId) {
    throw new HTTPError(403, "Vous n'etes pas proprietaire de cette offre")
  }
  if (offer.statut !== "brouillon") {
    throw new HTTPError(400, "Seules les offres en brouillon peuvent etre soumises")
  }
  setOfferStatus(id, "en_attente")
}

export function publish(id: string): void {
  const offer = findById(id)
  if (!offer) throw new HTTPError(404, "Offre non trouvee")
  if (offer.statut !== "en_attente") {
    throw new HTTPError(400, "Seules les offres en attente peuvent etre publiees")
  }
  setOfferStatus(id, "publiee")
}

export function reject(id: string): void {
  const offer = findById(id)
  if (!offer) throw new HTTPError(404, "Offre non trouvee")
  setOfferStatus(id, "rejetee")
}

export function close(id: string, entrepriseId: string): void {
  const offer = findById(id)
  if (!offer) throw new HTTPError(404, "Offre non trouvee")
  if (offer.entreprise_id !== entrepriseId) {
    throw new HTTPError(403, "Vous n'etes pas proprietaire de cette offre")
  }
  setOfferStatus(id, "cloturee")
}

export function remove(id: string, entrepriseId: string): void {
  const offer = findById(id)
  if (!offer) throw new HTTPError(404, "Offre non trouvee")
  if (offer.entreprise_id !== entrepriseId) {
    throw new HTTPError(403, "Vous n'etes pas proprietaire de cette offre")
  }
  if (offer.statut !== "brouillon") {
    throw new HTTPError(400, "Seules les offres en brouillon peuvent etre supprimees")
  }
  deleteOffer(id, entrepriseId)
}

export function listPublic(filters: {
  search?: string
  type?: string
  region?: string
  page: number
  limit: number
}) {
  return findPublicOffers(filters)
}

export function listByEntreprise(entrepriseId: string) {
  return findByEntreprise(entrepriseId)
}

export function listPending(page: number, limit: number) {
  return findPendingOffers(page, limit)
}
