import { findById, findByProprietaire, createOrg, updateOrg, setStatus, findAllByStatus } from "../database/queries/organizations.queries"
import { generateId, nowISO } from "../utils"
import { HTTPError } from "../middlewares/error.middleware"
import type { Organization, OrgType } from "../types"

export function getOrganization(id: string): Organization {
  const org = findById(id)
  if (!org) throw new HTTPError(404, "Organisation non trouvee")
  return org
}

export function getMyOrganization(proprietaireId: string): Organization | null {
  return findByProprietaire(proprietaireId)
}

export function create(data: {
  proprietaireId: string
  type: OrgType
  nom: string
  description?: string | null
  secteur?: string | null
  ville?: string | null
  region?: string | null
  adresse?: string | null
  telephone?: string | null
  email?: string | null
  site_web?: string | null
}): Organization {
  const existing = findByProprietaire(data.proprietaireId)
  if (existing) {
    throw new HTTPError(409, "Vous avez deja une organisation")
  }

  const now = nowISO()
  const org: Organization = {
    id: generateId(),
    proprietaire_id: data.proprietaireId,
    type: data.type,
    nom: data.nom,
    description: data.description ?? null,
    secteur: data.secteur ?? null,
    ville: data.ville ?? null,
    region: data.region ?? null,
    adresse: data.adresse ?? null,
    telephone: data.telephone ?? null,
    email: data.email ?? null,
    site_web: data.site_web ?? null,
    logo: null,
    statut: "en_attente",
    date_creation: now,
    date_modification: now,
  }

  createOrg(org)
  return org
}

export function update(id: string, proprietaireId: string, data: Record<string, unknown>): void {
  const org = findById(id)
  if (!org) throw new HTTPError(404, "Organisation non trouvee")
  if (org.proprietaire_id !== proprietaireId) {
    throw new HTTPError(403, "Vous n'etes pas proprietaire de cette organisation")
  }
  updateOrg(id, data)
}

export function validate(id: string, statut: "validee" | "rejetee"): void {
  const org = findById(id)
  if (!org) throw new HTTPError(404, "Organisation non trouvee")
  setStatus(id, statut)
}

export function list(status: string | null, page: number, limit: number) {
  return findAllByStatus(status, page, limit)
}
