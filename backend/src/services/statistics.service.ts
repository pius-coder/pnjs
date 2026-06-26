import { getAdminStats, getEntrepriseStats, getEtablissementStats } from "../database/queries/statistics.queries"
import { HTTPError } from "../middlewares/error.middleware"

export function adminStats() {
  return getAdminStats()
}

export function entrepriseStats(entrepriseId: string) {
  const stats = getEntrepriseStats(entrepriseId)
  if (!stats) throw new HTTPError(404, "Statistiques non disponibles")
  return stats
}

export function etablissementStats(etablissementId: string) {
  return getEtablissementStats(etablissementId)
}
