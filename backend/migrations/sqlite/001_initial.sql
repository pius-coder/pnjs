CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  prenom TEXT NOT NULL,
  nom TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  telephone TEXT,
  mot_de_passe TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('candidat', 'entreprise', 'etablissement', 'admin')),
  actif INTEGER NOT NULL DEFAULT 1,
  date_creation TEXT NOT NULL,
  date_modification TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS candidate_profiles (
  id TEXT PRIMARY KEY,
  utilisateur_id TEXT NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  titre TEXT,
  biographie TEXT,
  ville TEXT,
  region TEXT,
  niveau_etude TEXT,
  filiere TEXT,
  etablissement TEXT,
  disponibilite TEXT,
  date_modification TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS candidate_educations (
  id TEXT PRIMARY KEY,
  candidat_id TEXT NOT NULL REFERENCES candidate_profiles(id) ON DELETE CASCADE,
  diplome TEXT NOT NULL,
  etablissement TEXT NOT NULL,
  domaine TEXT NOT NULL,
  annee_debut INTEGER NOT NULL,
  annee_fin INTEGER,
  description TEXT
);

CREATE TABLE IF NOT EXISTS candidate_skills (
  id TEXT PRIMARY KEY,
  candidat_id TEXT NOT NULL REFERENCES candidate_profiles(id) ON DELETE CASCADE,
  nom TEXT NOT NULL,
  niveau TEXT
);

CREATE TABLE IF NOT EXISTS candidate_languages (
  id TEXT PRIMARY KEY,
  candidat_id TEXT NOT NULL REFERENCES candidate_profiles(id) ON DELETE CASCADE,
  langue TEXT NOT NULL,
  niveau TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS candidate_experiences (
  id TEXT PRIMARY KEY,
  candidat_id TEXT NOT NULL REFERENCES candidate_profiles(id) ON DELETE CASCADE,
  titre TEXT NOT NULL,
  organisation TEXT NOT NULL,
  date_debut TEXT NOT NULL,
  date_fin TEXT,
  description TEXT
);

CREATE TABLE IF NOT EXISTS organizations (
  id TEXT PRIMARY KEY,
  proprietaire_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK(type IN ('entreprise', 'etablissement')),
  nom TEXT NOT NULL,
  description TEXT,
  secteur TEXT,
  ville TEXT,
  region TEXT,
  adresse TEXT,
  telephone TEXT,
  email TEXT,
  site_web TEXT,
  logo TEXT,
  statut TEXT NOT NULL DEFAULT 'en_attente' CHECK(statut IN ('en_attente', 'validee', 'rejetee')),
  date_creation TEXT NOT NULL,
  date_modification TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS offers (
  id TEXT PRIMARY KEY,
  entreprise_id TEXT NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  titre TEXT NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('stage_academique', 'stage_professionnel', 'emploi')),
  description TEXT NOT NULL,
  profil_recherche TEXT,
  competences TEXT,
  ville TEXT,
  region TEXT,
  duree TEXT,
  date_debut TEXT,
  date_limite TEXT,
  gratification TEXT,
  nombre_places INTEGER NOT NULL DEFAULT 1,
  statut TEXT NOT NULL DEFAULT 'brouillon' CHECK(statut IN ('brouillon', 'en_attente', 'publiee', 'cloturee', 'rejetee')),
  date_publication TEXT,
  date_creation TEXT NOT NULL,
  date_modification TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS applications (
  id TEXT PRIMARY KEY,
  offre_id TEXT NOT NULL REFERENCES offers(id) ON DELETE CASCADE,
  candidat_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  message TEXT,
  statut TEXT NOT NULL DEFAULT 'envoyee' CHECK(statut IN ('envoyee', 'en_etude', 'entretien', 'acceptee', 'refusee', 'retiree')),
  date_creation TEXT NOT NULL,
  date_modification TEXT NOT NULL,
  UNIQUE(offre_id, candidat_id)
);

CREATE TABLE IF NOT EXISTS application_history (
  id TEXT PRIMARY KEY,
  candidature_id TEXT NOT NULL REFERENCES applications(id) ON DELETE CASCADE,
  ancien_statut TEXT,
  nouveau_statut TEXT NOT NULL,
  utilisateur_id TEXT NOT NULL REFERENCES users(id),
  commentaire TEXT,
  date TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS conventions (
  id TEXT PRIMARY KEY,
  candidature_id TEXT NOT NULL UNIQUE REFERENCES applications(id) ON DELETE CASCADE,
  candidat_id TEXT NOT NULL REFERENCES users(id),
  entreprise_id TEXT NOT NULL REFERENCES organizations(id),
  etablissement_id TEXT REFERENCES organizations(id),
  date_debut TEXT,
  date_fin TEXT,
  missions TEXT,
  gratification TEXT,
  statut TEXT NOT NULL DEFAULT 'creee' CHECK(statut IN ('creee', 'validee_entreprise', 'validee_candidat', 'validee_etablissement', 'finalisee')),
  date_validation_entreprise TEXT,
  date_validation_candidat TEXT,
  date_validation_etablissement TEXT,
  chemin_pdf TEXT,
  date_creation TEXT NOT NULL,
  date_modification TEXT NOT NULL
);
