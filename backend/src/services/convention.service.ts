import { findById, updateStatus, updateConvention, findByCandidat, findByEntreprise, findByEtablissement, updatePdfPath, findAllConventions } from "../database/queries/conventions.queries"
import { findById as findAppById } from "../database/queries/applications.queries"
import { findById as findOrgById, findByProprietaire } from "../database/queries/organizations.queries"
import { generatePdf } from "./pdf.service"
import { HTTPError } from "../middlewares/error.middleware"
import type { Convention, ConventionStatus } from "../types"
import { config } from "../config"
import { join } from "node:path"
import { mkdirSync } from "node:fs"

export function getConvention(id: string): Convention {
  const conv = findById(id)
  if (!conv) throw new HTTPError(404, "Convention non trouvee")
  return conv
}

export function validate(conventionId: string, userId: string, role: string): void {
  const conv = findById(conventionId)
  if (!conv) throw new HTTPError(404, "Convention non trouvee")

  const userOrg = findByProprietaire(userId)

  const validations: Record<string, { requiredStatus: ConventionStatus; nextStatus: ConventionStatus; ownerCheck: () => boolean }> = {
    entreprise: {
      requiredStatus: "creee",
      nextStatus: "validee_entreprise",
      ownerCheck: () => userOrg !== null && conv.entreprise_id === userOrg.id,
    },
    candidat: {
      requiredStatus: "validee_entreprise",
      nextStatus: "validee_candidat",
      ownerCheck: () => conv.candidat_id === userId,
    },
    etablissement: {
      requiredStatus: "validee_candidat",
      nextStatus: "finalisee",
      ownerCheck: () => userOrg !== null && conv.etablissement_id === userOrg.id,
    },
  }

  const validation = validations[role]
  if (!validation) {
    throw new HTTPError(400, "Role de validation invalide")
  }

  if (conv.statut !== validation.requiredStatus) {
    throw new HTTPError(400, `La convention doit etre en statut ${validation.requiredStatus} pour cette validation`)
  }

  if (!validation.ownerCheck()) {
    throw new HTTPError(403, "Vous n'etes pas autorise a valider cette convention")
  }

  updateStatus(conventionId, validation.nextStatus)
}

export function setEtablissement(conventionId: string, etablissementOrgId: string): void {
  const conv = findById(conventionId)
  if (!conv) throw new HTTPError(404, "Convention non trouvee")

  const org = findOrgById(etablissementOrgId)
  if (!org || org.type !== "etablissement") {
    throw new HTTPError(400, "Organisation etablissement invalide")
  }

  updateConvention(conventionId, { etablissement_id: etablissementOrgId } as Partial<Convention>)
}

export function updateDetails(conventionId: string, userId: string, data: Record<string, unknown>): void {
  const conv = findById(conventionId)
  if (!conv) throw new HTTPError(404, "Convention non trouvee")

  if (conv.statut !== "creee") {
    throw new HTTPError(400, "La convention ne peut plus etre modifiee")
  }

  updateConvention(conventionId, data)
}

export async function generatePdfForConvention(conventionId: string): Promise<string> {
  const conv = findById(conventionId)
  if (!conv) throw new HTTPError(404, "Convention non trouvee")

  const dir = join(config.uploadDir, "conventions")
  mkdirSync(dir, { recursive: true })
  const filename = `convention-${conventionId}.pdf`
  const filepath = join(dir, filename)

  await generatePdf(conv, filepath)
  updatePdfPath(conventionId, filepath)
  return filepath
}

export function listByUser(userId: string, role: string): Convention[] {
  switch (role) {
    case "candidat": return findByCandidat(userId)
    case "entreprise": return findByEntreprise(userId)
    case "etablissement": return findByEtablissement(userId)
    case "admin": return findAllConventions()
    default: throw new HTTPError(400, "Role invalide")
  }
}
