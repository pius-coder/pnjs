import { findById as findOfferById } from "../database/queries/offers.queries"
import { findById, findByCandidatAndOffer, createApplication, updateStatus, findByCandidat, findApplicationsByEntreprise, createHistory, getHistory } from "../database/queries/applications.queries"
import { getFullProfile } from "../database/queries/candidates.queries"
import { findById as findOrgById } from "../database/queries/organizations.queries"
import { generateId, nowISO } from "../utils"
import { transaction } from "../database/database"
import { HTTPError } from "../middlewares/error.middleware"
import type { Application, ApplicationStatus, Convention } from "../types"
import { createConvention } from "../database/queries/conventions.queries"

export function apply(candidatId: string, offreId: string, message?: string | null): Application {
  const offer = findOfferById(offreId)
  if (!offer) throw new HTTPError(404, "Offre non trouvee")
  if (offer.statut !== "publiee") {
    throw new HTTPError(400, "Cette offre n'est pas ouverte aux candidatures")
  }

  if (offer.date_limite && new Date(offer.date_limite) < new Date()) {
    throw new HTTPError(400, "La date limite de candidature est passee")
  }

  const existing = findByCandidatAndOffer(candidatId, offreId)
  if (existing) {
    throw new HTTPError(409, "Vous avez deja postule a cette offre")
  }

  const profile = getFullProfile(candidatId)
  if (!profile) {
    throw new HTTPError(400, "Vous devez d abord completer votre profil")
  }
  if (!profile.titre) {
    throw new HTTPError(400, "Veuillez ajouter un titre professionnel a votre profil")
  }

  const now = nowISO()
  const application: Application = {
    id: generateId(),
    offre_id: offreId,
    candidat_id: candidatId,
    message: message ?? null,
    statut: "envoyee",
    date_creation: now,
    date_modification: now,
  }

  createApplication(application)

  createHistory({
    id: generateId(),
    candidature_id: application.id,
    ancien_statut: null,
    nouveau_statut: "envoyee",
    utilisateur_id: candidatId,
    commentaire: "Candidature soumise",
    date: now,
  })

  return application
}

export function changeStatus(
  applicationId: string,
  userId: string,
  newStatus: ApplicationStatus,
  commentaire?: string | null
): void {
  const app = findById(applicationId)
  if (!app) throw new HTTPError(404, "Candidature non trouvee")

  const allowedTransitions: Record<string, string[]> = {
    envoyee: ["en_etude", "refusee"],
    en_etude: ["entretien", "acceptee", "refusee"],
    entretien: ["acceptee", "refusee"],
  }

  if (!allowedTransitions[app.statut]?.includes(newStatus)) {
    throw new HTTPError(400, `Transition de ${app.statut} vers ${newStatus} non autorisee`)
  }

  if (["acceptee", "refusee"].includes(newStatus) && app.statut !== "en_etude" && app.statut !== "entretien") {
    throw new HTTPError(400, "Cette candidature doit d abord etre etudiee")
  }

  transaction(() => {
    const oldStatus = app.statut
    updateStatus(applicationId, newStatus)
    createHistory({
      id: generateId(),
      candidature_id: applicationId,
      ancien_statut: oldStatus,
      nouveau_statut: newStatus,
      utilisateur_id: userId,
      commentaire: commentaire ?? null,
      date: nowISO(),
    })
    if (newStatus === "acceptee") {
      autoCreateConvention(applicationId)
    }
  })
}

export function withdraw(candidatId: string, applicationId: string): void {
  const app = findById(applicationId)
  if (!app) throw new HTTPError(404, "Candidature non trouvee")
  if (app.candidat_id !== candidatId) {
    throw new HTTPError(403, "Vous n'etes pas proprietaire de cette candidature")
  }
  if (app.statut === "acceptee") {
    throw new HTTPError(400, "Une candidature acceptee ne peut pas etre retiree")
  }

  const oldStatus = app.statut
  updateStatus(applicationId, "retiree")

  createHistory({
    id: generateId(),
    candidature_id: applicationId,
    ancien_statut: oldStatus,
    nouveau_statut: "retiree",
    utilisateur_id: candidatId,
    commentaire: "Candidature retiree par le candidat",
    date: nowISO(),
  })
}

export function getMyApplications(candidatId: string) {
  return findByCandidat(candidatId)
}

export function getReceivedApplications(entrepriseId: string) {
  return findApplicationsByEntreprise(entrepriseId)
}

export function getApplicationHistory(applicationId: string) {
  return getHistory(applicationId)
}

function autoCreateConvention(applicationId: string): void {
  const existing = findByCandidatAndOffer(
    findById(applicationId)?.candidat_id || "",
    findById(applicationId)?.offre_id || ""
  )
  if (!existing) return

  const offer = findOfferById(existing.offre_id)
  if (!offer) return

  const org = findOrgById(offer.entreprise_id)
  if (!org) return

  const now = nowISO()
  const convention: Convention = {
    id: generateId(),
    candidature_id: applicationId,
    candidat_id: existing.candidat_id,
    entreprise_id: offer.entreprise_id,
    etablissement_id: null,
    date_debut: offer.date_debut,
    date_fin: null,
    missions: offer.description,
    gratification: offer.gratification,
    statut: "creee",
    date_validation_entreprise: null,
    date_validation_candidat: null,
    date_validation_etablissement: null,
    chemin_pdf: null,
    date_creation: now,
    date_modification: now,
  }

  createConvention(convention)
}

export { autoCreateConvention }
