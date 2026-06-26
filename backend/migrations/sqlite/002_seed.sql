-- Password for all accounts: "password123" (hashed with bcrypt)
-- Admin
INSERT INTO users (id, prenom, nom, email, telephone, mot_de_passe, role, actif, date_creation, date_modification)
VALUES ('admin-001', 'Admin', 'Systeme', 'admin@pngs-ie.sn', '771234567', '$2b$10$v.K0GA962e0zFcc9WPSTxOIgtLfB4OLYr8a7odoRuIL0RvuRJMu3y', 'admin', 1, '2026-01-01T00:00:00Z', '2026-01-01T00:00:00Z');

-- Candidats
INSERT INTO users (id, prenom, nom, email, telephone, mot_de_passe, role, actif, date_creation, date_modification)
VALUES ('cand-001', 'Fatou', 'Diop', 'fatou.diop@email.sn', '781234561', '$2b$10$v.K0GA962e0zFcc9WPSTxOIgtLfB4OLYr8a7odoRuIL0RvuRJMu3y', 'candidat', 1, '2026-01-15T00:00:00Z', '2026-01-15T00:00:00Z');

INSERT INTO users (id, prenom, nom, email, telephone, mot_de_passe, role, actif, date_creation, date_modification)
VALUES ('cand-002', 'Mamadou', 'Fall', 'mamadou.fall@email.sn', '782345612', '$2b$10$v.K0GA962e0zFcc9WPSTxOIgtLfB4OLYr8a7odoRuIL0RvuRJMu3y', 'candidat', 1, '2026-02-01T00:00:00Z', '2026-02-01T00:00:00Z');

-- Entreprises
INSERT INTO users (id, prenom, nom, email, telephone, mot_de_passe, role, actif, date_creation, date_modification)
VALUES ('ent-001', 'Amadou', 'Ba', 'contact@orange-sn.sn', '771111111', '$2b$10$v.K0GA962e0zFcc9WPSTxOIgtLfB4OLYr8a7odoRuIL0RvuRJMu3y', 'entreprise', 1, '2026-01-20T00:00:00Z', '2026-01-20T00:00:00Z');

INSERT INTO users (id, prenom, nom, email, telephone, mot_de_passe, role, actif, date_creation, date_modification)
VALUES ('ent-002', 'Aissatou', 'Sow', 'rh@sonatel.sn', '772222222', '$2b$10$v.K0GA962e0zFcc9WPSTxOIgtLfB4OLYr8a7odoRuIL0RvuRJMu3y', 'entreprise', 1, '2026-02-10T00:00:00Z', '2026-02-10T00:00:00Z');

-- Etablissement
INSERT INTO users (id, prenom, nom, email, telephone, mot_de_passe, role, actif, date_creation, date_modification)
VALUES ('etab-001', 'Seydou', 'Ndiaye', 'contact@esp.sn', '773333333', '$2b$10$v.K0GA962e0zFcc9WPSTxOIgtLfB4OLYr8a7odoRuIL0RvuRJMu3y', 'etablissement', 1, '2026-01-10T00:00:00Z', '2026-01-10T00:00:00Z');

-- Candidate Profiles
INSERT INTO candidate_profiles (id, utilisateur_id, titre, biographie, ville, region, niveau_etude, filiere, etablissement, disponibilite, date_modification)
VALUES ('cp-001', 'cand-001', 'Developpeur Full Stack', 'Passionne par le developpement web et les technologies modernes.', 'Dakar', 'Dakar', 'Master', 'Informatique', 'ESP', 'Immediatement', '2026-03-01T00:00:00Z');

INSERT INTO candidate_profiles (id, utilisateur_id, titre, biographie, ville, region, niveau_etude, filiere, etablissement, disponibilite, date_modification)
VALUES ('cp-002', 'cand-002', 'Analyste Reseau', 'Etudiant en ingenierie reseau cherche un stage professionnel.', 'Thies', 'Thies', 'Licence', 'Reseau et Telecoms', 'UT', 'Dans 1 mois', '2026-03-15T00:00:00Z');

-- Educations
INSERT INTO candidate_educations (id, candidat_id, diplome, etablissement, domaine, annee_debut, annee_fin, description)
VALUES ('ce-001', 'cp-001', 'Master en Informatique', 'ESP Dakar', 'Genie Logiciel', 2023, 2025, 'Formation approfondie en genie logiciel.');

INSERT INTO candidate_educations (id, candidat_id, diplome, etablissement, domaine, annee_debut, annee_fin, description)
VALUES ('ce-002', 'cp-001', 'Licence en Informatique', 'UCAD', 'Informatique', 2020, 2023, 'Formation fondamentale en informatique.');

INSERT INTO candidate_educations (id, candidat_id, diplome, etablissement, domaine, annee_debut, annee_fin, description)
VALUES ('ce-003', 'cp-002', 'Licence Reseau', 'UT Thies', 'Reseau et Telecoms', 2022, 2025, 'Formation en reseaux et telecommunications.');

-- Skills
INSERT INTO candidate_skills (id, candidat_id, nom, niveau) VALUES ('cs-001', 'cp-001', 'TypeScript', 'Avance');
INSERT INTO candidate_skills (id, candidat_id, nom, niveau) VALUES ('cs-002', 'cp-001', 'React', 'Avance');
INSERT INTO candidate_skills (id, candidat_id, nom, niveau) VALUES ('cs-003', 'cp-001', 'Node.js', 'Intermediaire');
INSERT INTO candidate_skills (id, candidat_id, nom, niveau) VALUES ('cs-004', 'cp-002', 'Cisco', 'Intermediaire');
INSERT INTO candidate_skills (id, candidat_id, nom, niveau) VALUES ('cs-005', 'cp-002', 'Linux', 'Avance');
INSERT INTO candidate_skills (id, candidat_id, nom, niveau) VALUES ('cs-006', 'cp-002', 'TCP/IP', 'Avance');

-- Languages
INSERT INTO candidate_languages (id, candidat_id, langue, niveau) VALUES ('cl-001', 'cp-001', 'Francais', 'Langue maternelle');
INSERT INTO candidate_languages (id, candidat_id, langue, niveau) VALUES ('cl-002', 'cp-001', 'Anglais', 'Courant');
INSERT INTO candidate_languages (id, candidat_id, langue, niveau) VALUES ('cl-003', 'cp-002', 'Francais', 'Langue maternelle');
INSERT INTO candidate_languages (id, candidat_id, langue, niveau) VALUES ('cl-004', 'cp-002', 'Anglais', 'Intermediaire');

-- Experiences
INSERT INTO candidate_experiences (id, candidat_id, titre, organisation, date_debut, date_fin, description)
VALUES ('cexp-001', 'cp-001', 'Stage Developpeur Web', 'Orange Senegal', '2024-06-01', '2024-09-30', 'Developpement de fonctionnalites frontend avec React.');

INSERT INTO candidate_experiences (id, candidat_id, titre, organisation, date_debut, date_fin, description)
VALUES ('cexp-002', 'cp-002', 'Stage Technicien Reseau', 'Sonatel', '2024-07-01', '2024-10-01', 'Maintenance et configuration des equipements reseau.');

-- Organizations (Companies & Schools)
INSERT INTO organizations (id, proprietaire_id, type, nom, description, secteur, ville, region, adresse, telephone, email, site_web, statut, date_creation, date_modification)
VALUES ('org-001', 'ent-001', 'entreprise', 'Orange Senegal', 'Operateur de telecommunications leader au Senegal.', 'Telecommunications', 'Dakar', 'Dakar', 'Km 5,5 Avenue Cheikh Anta Diop', '771111111', 'contact@orange-sn.sn', 'https://www.orange.sn', 'validee', '2026-01-20T00:00:00Z', '2026-01-25T00:00:00Z');

INSERT INTO organizations (id, proprietaire_id, type, nom, description, secteur, ville, region, adresse, telephone, email, site_web, statut, date_creation, date_modification)
VALUES ('org-002', 'ent-002', 'entreprise', 'Sonatel', 'Premier fournisseur de services de telecommunications au Senegal.', 'Telecommunications', 'Dakar', 'Dakar', 'Route de la Corniche Ouest', '772222222', 'rh@sonatel.sn', 'https://www.sonatel.sn', 'validee', '2026-02-10T00:00:00Z', '2026-02-15T00:00:00Z');

INSERT INTO organizations (id, proprietaire_id, type, nom, description, secteur, ville, region, adresse, telephone, email, site_web, statut, date_creation, date_modification)
VALUES ('org-003', 'etab-001', 'etablissement', 'ESP Dakar', 'Ecole Superieure Polytechnique de Dakar.', 'Education', 'Dakar', 'Dakar', 'Universite Cheikh Anta Diop', '773333333', 'contact@esp.sn', 'https://www.esp.sn', 'validee', '2026-01-10T00:00:00Z', '2026-01-12T00:00:00Z');

-- Offers
INSERT INTO offers (id, entreprise_id, titre, type, description, profil_recherche, competences, ville, region, duree, date_debut, date_limite, gratification, nombre_places, statut, date_publication, date_creation, date_modification)
VALUES ('offre-001', 'org-001', 'Stage Developpeur Full Stack', 'stage_academique', 'Nous recherchons un stagiaire developpeur full stack pour rejoindre notre equipe digitale.', 'Etudiant en Master Informatique', 'TypeScript, React, Node.js', 'Dakar', 'Dakar', '3 mois', '2026-06-01', '2026-07-30', '150000 FCFA/mois', 2, 'publiee', '2026-04-01T00:00:00Z', '2026-03-15T00:00:00Z', '2026-04-01T00:00:00Z');

INSERT INTO offers (id, entreprise_id, titre, type, description, profil_recherche, competences, ville, region, duree, date_debut, date_limite, gratification, nombre_places, statut, date_publication, date_creation, date_modification)
VALUES ('offre-002', 'org-001', 'Stage Administration Reseau', 'stage_academique', 'Stage en administration des infrastructures reseau.', 'Etudiant en Reseau et Telecoms', 'Cisco, Linux, TCP/IP', 'Dakar', 'Dakar', '4 mois', '2026-06-15', '2026-07-15', '150000 FCFA/mois', 1, 'publiee', '2026-04-05T00:00:00Z', '2026-03-20T00:00:00Z', '2026-04-05T00:00:00Z');

INSERT INTO offers (id, entreprise_id, titre, type, description, profil_recherche, competences, ville, region, duree, date_debut, date_limite, gratification, nombre_places, statut, date_publication, date_creation, date_modification)
VALUES ('offre-003', 'org-002', 'Stage Developpement Mobile', 'stage_academique', 'Stage en developpement d applications mobiles.', 'Etudiant en informatique', 'Flutter, Dart, Firebase', 'Dakar', 'Dakar', '3 mois', '2026-07-01', '2026-07-31', '200000 FCFA/mois', 2, 'publiee', '2026-04-10T00:00:00Z', '2026-03-25T00:00:00Z', '2026-04-10T00:00:00Z');

INSERT INTO offers (id, entreprise_id, titre, type, description, profil_recherche, competences, ville, region, duree, date_debut, date_limite, gratification, nombre_places, statut, date_publication, date_creation, date_modification)
VALUES ('offre-004', 'org-002', 'Stage Marketing Digital', 'stage_academique', 'Stage en marketing digital et communication.', 'Etudiant en Marketing', 'SEO, Social Media, Analyse', 'Dakar', 'Dakar', '3 mois', '2026-06-01', '2026-06-30', '100000 FCFA/mois', 1, 'en_attente', NULL, '2026-04-01T00:00:00Z', '2026-04-01T00:00:00Z');

-- Applications
INSERT INTO applications (id, offre_id, candidat_id, message, statut, date_creation, date_modification)
VALUES ('app-001', 'offre-001', 'cand-001', 'Je suis tres interesse par ce stage et je pense avoir le profil requis.', 'acceptee', '2026-04-10T10:00:00Z', '2026-04-15T14:00:00Z');

INSERT INTO applications (id, offre_id, candidat_id, message, statut, date_creation, date_modification)
VALUES ('app-002', 'offre-002', 'cand-002', 'Je souhaite postuler pour ce stage en administration reseau.', 'envoyee', '2026-04-12T11:00:00Z', '2026-04-12T11:00:00Z');

INSERT INTO applications (id, offre_id, candidat_id, message, statut, date_creation, date_modification)
VALUES ('app-003', 'offre-003', 'cand-001', 'Interesse par le developpement mobile, je postule.', 'en_etude', '2026-04-14T09:00:00Z', '2026-04-16T10:00:00Z');

INSERT INTO applications (id, offre_id, candidat_id, message, statut, date_creation, date_modification)
VALUES ('app-004', 'offre-001', 'cand-002', 'Candidature pour le poste de developpeur full stack.', 'refusee', '2026-04-11T08:00:00Z', '2026-04-15T14:30:00Z');

-- Application History
INSERT INTO application_history (id, candidature_id, ancien_statut, nouveau_statut, utilisateur_id, commentaire, date)
VALUES ('ah-001', 'app-001', NULL, 'envoyee', 'cand-001', 'Candidature soumise', '2026-04-10T10:00:00Z');

INSERT INTO application_history (id, candidature_id, ancien_statut, nouveau_statut, utilisateur_id, commentaire, date)
VALUES ('ah-002', 'app-001', 'envoyee', 'en_etude', 'ent-001', 'Candidature en cours d etude', '2026-04-12T09:00:00Z');

INSERT INTO application_history (id, candidature_id, ancien_statut, nouveau_statut, utilisateur_id, commentaire, date)
VALUES ('ah-003', 'app-001', 'en_etude', 'acceptee', 'ent-001', 'Profil retenu pour le stage', '2026-04-15T14:00:00Z');

INSERT INTO application_history (id, candidature_id, ancien_statut, nouveau_statut, utilisateur_id, commentaire, date)
VALUES ('ah-004', 'app-002', NULL, 'envoyee', 'cand-002', 'Candidature soumise', '2026-04-12T11:00:00Z');

INSERT INTO application_history (id, candidature_id, ancien_statut, nouveau_statut, utilisateur_id, commentaire, date)
VALUES ('ah-005', 'app-003', NULL, 'envoyee', 'cand-001', 'Candidature soumise', '2026-04-14T09:00:00Z');

INSERT INTO application_history (id, candidature_id, ancien_statut, nouveau_statut, utilisateur_id, commentaire, date)
VALUES ('ah-006', 'app-003', 'envoyee', 'en_etude', 'ent-002', 'En cours d analyse', '2026-04-16T10:00:00Z');

INSERT INTO application_history (id, candidature_id, ancien_statut, nouveau_statut, utilisateur_id, commentaire, date)
VALUES ('ah-007', 'app-004', NULL, 'envoyee', 'cand-002', 'Candidature soumise', '2026-04-11T08:00:00Z');

INSERT INTO application_history (id, candidature_id, ancien_statut, nouveau_statut, utilisateur_id, commentaire, date)
VALUES ('ah-008', 'app-004', 'envoyee', 'refusee', 'ent-001', 'Profil non retenu pour ce stage', '2026-04-15T14:30:00Z');

-- Conventions
INSERT INTO conventions (id, candidature_id, candidat_id, entreprise_id, etablissement_id, date_debut, date_fin, missions, gratification, statut, date_validation_entreprise, date_validation_candidat, date_validation_etablissement, chemin_pdf, date_creation, date_modification)
VALUES ('conv-001', 'app-001', 'cand-001', 'org-001', 'org-003', '2026-06-01', '2026-08-31', 'Developpement de fonctionnalites web avec TypeScript et React. Participation aux revues de code et aux sprint meetings.', '150000 FCFA/mois', 'validee_etablissement', '2026-04-16T10:00:00Z', '2026-04-18T14:00:00Z', '2026-04-20T09:00:00Z', NULL, '2026-04-15T15:00:00Z', '2026-04-20T09:00:00Z');
