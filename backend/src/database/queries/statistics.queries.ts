import { allQuery, oneQuery } from "../database"

export function getAdminStats() {
  const users = oneQuery<{ count: number }>("SELECT COUNT(*) as count FROM users")
  const candidats = oneQuery<{ count: number }>("SELECT COUNT(*) as count FROM users WHERE role = 'candidat'")
  const entreprises = oneQuery<{ count: number }>("SELECT COUNT(*) as count FROM users WHERE role = 'entreprise'")
  const etablissements = oneQuery<{ count: number }>("SELECT COUNT(*) as count FROM users WHERE role = 'etablissement'")
  const offres = oneQuery<{ count: number }>("SELECT COUNT(*) as count FROM offers WHERE statut = 'publiee'")
  const candidatures = oneQuery<{ count: number }>("SELECT COUNT(*) as count FROM applications")
  const acceptees = oneQuery<{ count: number }>("SELECT COUNT(*) as count FROM applications WHERE statut = 'acceptee'")
  const conventions = oneQuery<{ count: number }>("SELECT COUNT(*) as count FROM conventions WHERE statut = 'finalisee'")
  const stagesParMois = allQuery<{ mois: string; count: number }>(
    `SELECT strftime('%Y-%m', date_creation) as mois, COUNT(*) as count FROM conventions GROUP BY mois ORDER BY mois DESC LIMIT 12`
  )
  const stagesParRegion = allQuery<{ region: string; count: number }>(
    `SELECT o.region, COUNT(*) as count FROM conventions c JOIN applications a ON c.candidature_id = a.id JOIN offers o ON a.offre_id = o.id GROUP BY o.region ORDER BY count DESC LIMIT 10`
  )
  const repartitionCandidatures = allQuery<{ statut: string; count: number }>(
    "SELECT statut, COUNT(*) as count FROM applications GROUP BY statut"
  )

  return {
    utilisateurs: users?.count ?? 0,
    candidats: candidats?.count ?? 0,
    entreprises: entreprises?.count ?? 0,
    etablissements: etablissements?.count ?? 0,
    offres_publiees: offres?.count ?? 0,
    candidatures_total: candidatures?.count ?? 0,
    candidatures_acceptees: acceptees?.count ?? 0,
    conventions_finalisees: conventions?.count ?? 0,
    stages_par_mois: stagesParMois,
    stages_par_region: stagesParRegion,
    repartition_candidatures: repartitionCandidatures,
  }
}

export function getEntrepriseStats(entrepriseId: string) {
  const offres = oneQuery<{ count: number }>("SELECT COUNT(*) as count FROM offers WHERE entreprise_id = ?", [entrepriseId])
  const recues = oneQuery<{ count: number }>(
    `SELECT COUNT(*) as count FROM applications a JOIN offers o ON a.offre_id = o.id WHERE o.entreprise_id = ?`,
    [entrepriseId]
  )
  const acceptees = oneQuery<{ count: number }>(
    `SELECT COUNT(*) as count FROM applications a JOIN offers o ON a.offre_id = o.id WHERE o.entreprise_id = ? AND a.statut = 'acceptee'`,
    [entrepriseId]
  )
  const refused = oneQuery<{ count: number }>(
    `SELECT COUNT(*) as count FROM applications a JOIN offers o ON a.offre_id = o.id WHERE o.entreprise_id = ? AND a.statut = 'refusee'`,
    [entrepriseId]
  )
  return {
    offres: offres?.count ?? 0,
    candidatures_recues: recues?.count ?? 0,
    candidatures_acceptees: acceptees?.count ?? 0,
    candidatures_refusees: refused?.count ?? 0,
  }
}

export function getEtablissementStats(etablissementId: string) {
  const conventions = oneQuery<{ count: number }>("SELECT COUNT(*) as count FROM conventions WHERE etablissement_id = ?", [etablissementId])
  const enAttente = oneQuery<{ count: number }>(
    "SELECT COUNT(*) as count FROM conventions WHERE etablissement_id = ? AND statut = 'validee_candidat'",
    [etablissementId]
  )
  const finalisees = oneQuery<{ count: number }>(
    "SELECT COUNT(*) as count FROM conventions WHERE etablissement_id = ? AND statut = 'finalisee'",
    [etablissementId]
  )
  const candidats = allQuery<{ id: string; prenom: string; nom: string; email: string }>(
    `SELECT u.id, u.prenom, u.nom, u.email FROM users u JOIN candidate_profiles cp ON u.id = cp.utilisateur_id WHERE cp.etablissement = (SELECT nom FROM organizations WHERE id = ?)`,
    [etablissementId]
  )
  return {
    conventions_total: conventions?.count ?? 0,
    conventions_en_attente: enAttente?.count ?? 0,
    conventions_finalisees: finalisees?.count ?? 0,
    candidats,
  }
}
