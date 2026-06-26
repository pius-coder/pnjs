export type Role = "candidat" | "entreprise" | "etablissement" | "admin"

export type User = {
  id: string
  prenom: string
  nom: string
  email: string
  telephone: string | null
  mot_de_passe: string
  role: Role
  actif: boolean
  date_creation: string
  date_modification: string
}

export type UserPublic = Omit<User, "mot_de_passe">

export type CandidateProfile = {
  id: string
  utilisateur_id: string
  titre: string | null
  biographie: string | null
  ville: string | null
  region: string | null
  niveau_etude: string | null
  filiere: string | null
  etablissement: string | null
  disponibilite: string | null
  date_modification: string
}

export type CandidateEducation = {
  id: string
  candidat_id: string
  diplome: string
  etablissement: string
  domaine: string
  annee_debut: number
  annee_fin: number | null
  description: string | null
}

export type CandidateSkill = {
  id: string
  candidat_id: string
  nom: string
  niveau: string | null
}

export type CandidateLanguage = {
  id: string
  candidat_id: string
  langue: string
  niveau: string
}

export type CandidateExperience = {
  id: string
  candidat_id: string
  titre: string
  organisation: string
  date_debut: string
  date_fin: string | null
  description: string | null
}

export type OrgType = "entreprise" | "etablissement"
export type OrgStatus = "en_attente" | "validee" | "rejetee"

export type Organization = {
  id: string
  proprietaire_id: string
  type: OrgType
  nom: string
  description: string | null
  secteur: string | null
  ville: string | null
  region: string | null
  adresse: string | null
  telephone: string | null
  email: string | null
  site_web: string | null
  logo: string | null
  statut: OrgStatus
  date_creation: string
  date_modification: string
}

export type OfferType = "stage_academique" | "stage_professionnel" | "emploi"
export type OfferStatus = "brouillon" | "en_attente" | "publiee" | "cloturee" | "rejetee"

export type Offer = {
  id: string
  entreprise_id: string
  titre: string
  type: OfferType
  description: string
  profil_recherche: string | null
  competences: string | null
  ville: string | null
  region: string | null
  duree: string | null
  date_debut: string | null
  date_limite: string | null
  gratification: string | null
  nombre_places: number
  statut: OfferStatus
  date_publication: string | null
  date_creation: string
  date_modification: string
}

export type ApplicationStatus =
  | "envoyee"
  | "en_etude"
  | "entretien"
  | "acceptee"
  | "refusee"
  | "retiree"

export type Application = {
  id: string
  offre_id: string
  candidat_id: string
  message: string | null
  statut: ApplicationStatus
  date_creation: string
  date_modification: string
}

export type ApplicationHistory = {
  id: string
  candidature_id: string
  ancien_statut: string | null
  nouveau_statut: string
  utilisateur_id: string
  commentaire: string | null
  date: string
}

export type ConventionStatus =
  | "creee"
  | "validee_entreprise"
  | "validee_candidat"
  | "validee_etablissement"
  | "finalisee"

export type Convention = {
  id: string
  candidature_id: string
  candidat_id: string
  entreprise_id: string
  etablissement_id: string | null
  date_debut: string | null
  date_fin: string | null
  missions: string | null
  gratification: string | null
  statut: ConventionStatus
  date_validation_entreprise: string | null
  date_validation_candidat: string | null
  date_validation_etablissement: string | null
  chemin_pdf: string | null
  date_creation: string
  date_modification: string
}

export type PaginatedResponse<T> = {
  succes: boolean
  donnees: T[]
  total: number
  page: number
  limite: number
}

export type ApiResponse<T = unknown> = {
  succes: boolean
  donnees?: T
  message?: string
  code?: string
  erreurs?: Record<string, string[]>
}

export type AuthUser = {
  id: string
  email: string
  role: Role
  prenom: string
  nom: string
}
