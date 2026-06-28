# Backlog APEX — PNGS‑IE
## Tâches organisées par flows, avec pistes frontend/backend indépendantes

## Convention

Chaque flow suit cet ordre :

```text
C = contrat partagé
B = backend
F = frontend avec mock
I = intégration
T = tests et validation
```

Les tâches `B` et `F` peuvent être réalisées en parallèle après `C`.

---

# LOT 0 — Socle

## L0-C01 — Initialiser le contrat partagé

**Livrable :** `contract.ts`

- définir rôles ;
- statuts utilisateurs ;
- statuts offres ;
- statuts candidatures ;
- statuts conventions ;
- format réponse/erreur ;
- pagination ;
- codes d’erreur.

**Acceptation :**
- importable en type par frontend et backend ;
- aucune dépendance à Svelte ou Elysia ;
- aucune logique métier.

## L0-B01 — Initialiser Bun/Elysia

- app Elysia ;
- variables d’environnement validées ;
- erreur globale ;
- request ID ;
- CORS ;
- `/health` ;
- test santé.

## L0-B02 — Initialiser Bun.SQL

- connexion SQLite ;
- connexion MySQL via configuration ;
- runner migrations ;
- script status/reset dev ;
- test connexion.

## L0-F01 — Initialiser SvelteKit/shadcn-svelte

- SvelteKit ;
- Tailwind ;
- composants de base ;
- app shell ;
- thème par défaut ;
- layout public ;
- layout app ;
- page 404 et erreur.

## L0-F02 — Créer l’abstraction API

- `PngsApi` ;
- `mock-api.ts` ;
- `api.ts` ;
- sélection par environnement ;
- gestion commune d’erreur.

## L0-I01 — Brancher frontend/backend localement

- URL API ;
- CORS credentials ;
- vérification `/health` ;
- README commandes.

---

# FLOW 00 — Authentification

## F00-C01 — Figer le contrat

- RegisterInput ;
- LoginInput ;
- SessionView ;
- erreurs ;
- scénarios mock.

## F00-B01 — Migrations identité

- users ;
- sessions ;
- audit_logs ;
- index.

## F00-B02 — Inscription

- validation ;
- normalisation email ;
- hash mot de passe ;
- rôle autorisé ;
- email unique ;
- test.

## F00-B03 — Sessions

- login ;
- token opaque ;
- cookie ;
- session courante ;
- logout ;
- révocation ;
- garde authentification ;
- garde rôle.

## F00-F01 — Landing

- header ;
- hero ;
- avantages ;
- rôles ;
- étapes ;
- CTA ;
- footer ;
- mobile.

## F00-F02 — Login/register

- formulaires ;
- validation ;
- erreurs ;
- chargement ;
- redirection ;
- mock.

## F00-I01 — Intégration auth

- brancher API réelle ;
- cookie ;
- CORS ;
- session après refresh ;
- logout.

## F00-T01 — E2E auth

- candidat ;
- entreprise ;
- email dupliqué ;
- mauvais mot de passe ;
- suspendu.

---

# FLOW 01 — Profil candidat

## F01-C01 — Contrats profil/CV

## F01-B01 — Migrations profil candidat

## F01-B02 — Lecture et mise à jour profil

## F01-B03 — Formations, compétences, langues, projets

## F01-B04 — Complétude et validation étudiant

## F01-B05 — Génération/téléchargement CV

## F01-F01 — Dashboard candidat

## F01-F02 — Formulaire profil multi-sections

## F01-F03 — Prévisualisation CV

## F01-I01 — Branchement complet

## F01-T01 — Permissions et CV

---

# FLOW 02 — Entreprise et offres

## F02-C01 — Contrats entreprise/offre

## F02-B01 — Profil entreprise et vérification

## F02-B02 — Brouillon offre

## F02-B03 — Soumission et modération

## F02-B04 — Publication, suspension, clôture

## F02-F01 — Dashboard entreprise

## F02-F02 — Profil entreprise

## F02-F03 — Formulaire offre

## F02-F04 — Liste/statuts offres

## F02-F05 — Modération administrateur

## F02-I01 — Intégration publication

## F02-T01 — Propriété et transitions

---

# FLOW 03 — Recherche et candidature

## F03-C01 — Contrats recherche/candidature

## F03-B01 — Recherche filtrée et pagination

## F03-B02 — Détail public

## F03-B03 — Candidature transactionnelle

## F03-B04 — Liste, détail et retrait candidat

## F03-F01 — Listing offres

## F03-F02 — Filtres desktop/mobile

## F03-F03 — Détail et dialog postuler

## F03-F04 — Suivi candidatures

## F03-I01 — Intégration et erreurs

## F03-T01 — Double candidature et offre fermée

---

# FLOW 04 — Sélection

## F04-C01 — Contrat transitions

## F04-B01 — Liste candidats par offre

## F04-B02 — Détail candidature et CV snapshot

## F04-B03 — Transitions/historique

## F04-B04 — Acceptation transactionnelle et convention

## F04-F01 — Liste candidats responsive

## F04-F02 — Détail candidature

## F04-F03 — Actions de transition

## F04-I01 — Intégration décisions

## F04-T01 — Capacité et isolation

**Jalon : MVP technique terminé.**

---

# FLOW 05 — Établissement

## F05-C01 — Contrats validation étudiant

## F05-B01 — Profil établissement

## F05-B02 — Demandes de validation

## F05-B03 — Validation/rejet

## F05-B04 — Liste stages/conventions du périmètre

## F05-F01 — Dashboard établissement

## F05-F02 — Demandes étudiants

## F05-F03 — Stages et conventions

## F05-I01 — Intégration

## F05-T01 — Isolation établissements

---

# FLOW 06 — Convention

## F06-C01 — Contrats convention/signature

## F06-B01 — Générateur PDF et stockage

## F06-B02 — Hash/version document

## F06-B03 — Signature entreprise

## F06-B04 — Signature candidat

## F06-B05 — Signature établissement et activation

## F06-F01 — Écran convention partagé

## F06-F02 — Stepper et consentement

## F06-F03 — Téléchargement

## F06-I01 — Parcours trois acteurs

## F06-T01 — Ordre, idempotence, document modifié

---

# FLOW 07 — Stage et rapport

## F07-C01 — Contrats stage/rapport

## F07-B01 — Cycle stage

## F07-B02 — Upload sécurisé

## F07-B03 — Validation rapport

## F07-B04 — Feedback/clôture

## F07-F01 — Espace candidat

## F07-F02 — Espace entreprise

## F07-F03 — Espace établissement

## F07-I01 — Intégration fichiers

## F07-T01 — Permissions fichiers

---

# FLOW 08 — Ressources

## F08-C01 — Contrats ressources

## F08-B01 — CRUD et publication

## F08-F01 — Catalogue candidat

## F08-F02 — Gestion administrateur

## F08-I01 — Intégration

## F08-T01 — Brouillons et nettoyage contenu

---

# FLOW 10 — Administration

## F10-C01 — Contrats actions administrateur

## F10-B01 — Utilisateurs et suspension

## F10-B02 — Organisations et vérification

## F10-B03 — Audit

## F10-F01 — Dashboard

## F10-F02 — Utilisateurs

## F10-F03 — Organisations

## F10-F04 — Audit

## F10-I01 — Intégration

## F10-T01 — Actions sensibles

---

# FLOW 11 — Statistiques

## F11-C01 — Contrats filtres/KPI

## F11-B01 — Dataset de test déterministe

## F11-B02 — Agrégats nationaux

## F11-B03 — Agrégats établissement

## F11-B04 — Agrégats entreprise

## F11-B05 — Export CSV

## F11-F01 — Dashboard admin

## F11-F02 — Dashboard établissement

## F11-F03 — Dashboard entreprise

## F11-I01 — Branchement filtres

## F11-T01 — Vérifier résultats connus

**Jalon : V1 académique terminée.**

---

# FLOW 09 — Mentorat, évolution

## F09-C01 — Contrats mentorat

## F09-B01 — Profils mentor

## F09-B02 — Demandes

## F09-F01 — Annuaire

## F09-F02 — Espace mentor

## F09-I01 — Intégration

## F09-T01 — Permissions
