# Cahier des Charges d’Implémentation
## Plateforme Nationale de Gestion des Stages, de l’Insertion et de l’Employabilité — PNGS‑IE

**Version :** 1.0  
**Cible :** Projet académique de licence, démontrable, cohérent et extensible  
**Stack :** Bun + Elysia + Bun.SQL (SQLite/MySQL) | SvelteKit + Vite + shadcn-svelte  
**Méthode :** réalisation par flows métier verticaux, avec frontend et backend implémentables indépendamment  
**Style UI :** thème shadcn-svelte par défaut, responsive, sans animations ni design surchargé

---

# 1. Objet du document

Ce document transforme le cahier des charges fonctionnel en un plan d’implémentation concret.

Il définit :

- les acteurs et leurs permissions ;
- les états et transitions métier ;
- les données nécessaires ;
- les pages et composants frontend ;
- les traitements backend ;
- les contrats d’échange ;
- les tâches indépendantes frontend/backend ;
- les critères d’acceptation ;
- les tests à exécuter ;
- le périmètre du MVP et des évolutions.

Le projet ne sera pas découpé en une succession d’API techniques sans finalité visible. Il sera construit par **flows complets**.

Un flow est une action métier démontrable, par exemple :

> Une entreprise crée une offre, l’envoie en validation, un administrateur la publie, puis un candidat la trouve et postule.

Chaque flow est livré selon quatre pistes :

1. **Contrat** : données, états, erreurs et critères communs.
2. **Backend** : règles métier, persistance et routes.
3. **Frontend** : écrans et interactions, d’abord sur données simulées.
4. **Intégration** : branchement réel et tests de bout en bout.

---

# 2. Décisions structurantes

## 2.1 Architecture générale

```text
Navigateur mobile / desktop
          |
          | HTTPS
          v
Frontend SvelteKit
app.domaine.tld
          |
          | API typée / JSON + cookies HttpOnly
          v
Backend Bun + Elysia
api.domaine.tld
          |
          v
SQLite en développement
MySQL en production
```

## 2.2 Déploiement séparé

Le frontend et le backend sont déployés indépendamment.

- Le frontend ne doit jamais accéder directement à la base.
- Le backend reste l’unique autorité des permissions et transitions d’état.
- Le frontend masque les actions interdites, mais cette protection visuelle ne remplace jamais la vérification backend.
- Les contrats sont définis avant l’implémentation afin que le frontend puisse travailler avec un mock API.

## 2.3 Structure de dépôt recommandée

La structure reste compacte et pensée pour le workflow APEX + DOX.

```text
/
├── AGENTS.md
├── README.md
├── contract.ts
├── package.json
├── frontend/
│   ├── AGENTS.md
│   ├── package.json
│   ├── src/
│   │   ├── routes/
│   │   ├── lib/
│   │   │   ├── api.ts
│   │   │   ├── mock-api.ts
│   │   │   ├── session.svelte.ts
│   │   │   └── components/
│   │   └── app.css
│   └── static/
└── backend/
    ├── AGENTS.md
    ├── package.json
    ├── src/
    │   ├── app.ts
    │   ├── db.ts
    │   ├── auth.ts
    │   ├── storage.ts
    │   ├── pdf.ts
    │   └── flows/
    │       ├── identity.ts
    │       ├── candidate.ts
    │       ├── offers.ts
    │       ├── applications.ts
    │       ├── agreements.ts
    │       ├── internships.ts
    │       ├── learning.ts
    │       ├── moderation.ts
    │       └── statistics.ts
    ├── migrations/
    │   ├── sqlite/
    │   └── mysql/
    └── storage/
```

`contract.ts` contient uniquement les types et valeurs partagés stables :

- rôles ;
- statuts ;
- DTO d’entrée/sortie ;
- codes d’erreur ;
- pagination ;
- routes logiques si nécessaire.

Il ne contient aucune logique métier ni accès à la base.

## 2.4 Organisation du backend

Le backend est organisé par grands flows, pas par couches artificielles.

Un fichier de flow peut contenir plusieurs sections :

```text
CONTRACT VALIDATION
BUSINESS RULES
DATA OPERATIONS
HTTP ROUTES
```

Une séparation physique est créée uniquement si une zone devient trop volumineuse ou possède un cycle de changement réellement indépendant.

## 2.5 Organisation du frontend

SvelteKit impose naturellement un fichier par route. Cette séparation est conservée.

Les composants sont extraits seulement lorsqu’ils sont :

- utilisés par plusieurs pages ;
- complexes ;
- suffisamment autonomes pour être testés séparément.

Aucun dossier `services`, `repositories`, `view-models` ou `controllers` ne doit être créé par réflexe.

## 2.6 Mode frontend indépendant

Le frontend utilise une interface unique :

```ts
export interface PngsApi {
  auth: AuthApi;
  candidate: CandidateApi;
  offers: OffersApi;
  applications: ApplicationsApi;
  agreements: AgreementsApi;
  internships: InternshipsApi;
  learning: LearningApi;
  admin: AdminApi;
  statistics: StatisticsApi;
}
```

Deux implémentations sont prévues :

- `mock-api.ts` : retourne des scénarios déterministes pour construire l’UI ;
- `api.ts` : appelle Elysia avec Eden Treaty ou `fetch`.

Une variable d’environnement sélectionne l’adaptateur :

```env
PUBLIC_API_MODE=mock
PUBLIC_API_URL=http://localhost:3000
```

Ainsi, le frontend n’attend pas la disponibilité du backend.

---

# 3. Périmètre fonctionnel et phases

## 3.1 Version démontrable V1

La V1 doit démontrer tout le parcours principal :

1. inscription et connexion ;
2. création du profil candidat ;
3. création et validation d’une entreprise ;
4. publication d’une offre ;
5. recherche d’offres ;
6. candidature ;
7. traitement de la candidature ;
8. acceptation ;
9. génération d’une convention ;
10. signature séquentielle ;
11. suivi du stage et dépôt du rapport ;
12. statistiques principales.

## 3.2 MVP technique

Le MVP technique est livré avant la V1 complète :

- authentification ;
- profils candidat et entreprise ;
- dépôt/modération d’offres ;
- recherche et candidature ;
- revue et décision ;
- tableaux de bord simples.

## 3.3 Évolutions après V1

- mentorat avancé ;
- notifications email/SMS réelles ;
- signature électronique certifiée par un prestataire ;
- application mobile ;
- vérification automatique par registres nationaux ;
- recommandations intelligentes ;
- stockage objet externe ;
- tableaux de bord géographiques avancés.

---

# 4. Acteurs et permissions

## 4.1 Rôles applicatifs

```ts
export type UserRole =
  | "CANDIDATE"
  | "COMPANY"
  | "INSTITUTION"
  | "ADMIN";
```

Le mentor n’est pas un cinquième rôle global dans la V1. Un utilisateur validé peut avoir un profil mentor complémentaire.

## 4.2 Matrice de permissions

| Action | Candidat | Entreprise | Établissement | Administrateur |
|---|---:|---:|---:|---:|
| Gérer son compte | Oui | Oui | Oui | Oui |
| Modifier profil candidat | Oui | Non | Non | Assistance seulement |
| Modifier profil organisation | Non | Oui | Oui | Assistance seulement |
| Créer une offre | Non | Oui | Non | Non |
| Soumettre une offre | Non | Oui | Non | Non |
| Modérer une offre | Non | Non | Non | Oui |
| Consulter offres publiées | Oui | Oui | Oui | Oui |
| Postuler | Oui | Non | Non | Non |
| Traiter les candidatures | Non | Oui, sur ses offres | Lecture limitée | Modération |
| Valider statut étudiant | Non | Non | Oui | Oui |
| Signer comme candidat | Oui | Non | Non | Non |
| Signer comme entreprise | Non | Oui | Non | Non |
| Signer comme établissement | Non | Non | Oui | Non |
| Déposer rapport | Oui | Non | Non | Assistance |
| Voir rapports | Propriétaire | Stage concerné | Étudiant concerné | Oui |
| Gérer ressources | Non | Non | Optionnel | Oui |
| Voir statistiques nationales | Non | Statistiques propres | Périmètre établissement | Oui |

## 4.3 États de vérification

```ts
export type VerificationStatus =
  | "PENDING"
  | "VERIFIED"
  | "REJECTED";
```

Règles :

- une entreprise non vérifiée peut compléter son profil et enregistrer des brouillons ;
- elle ne peut pas soumettre une offre à publication avant vérification ;
- un établissement est créé par un administrateur ou vérifié par celui-ci ;
- un candidat étudiant peut postuler, mais une convention académique exige une validation de son statut étudiant ;
- un diplômé n’est pas obligé d’être rattaché à un établissement pour une offre d’emploi ou un stage professionnel.

---

# 5. Machines à états métier

## 5.1 Offre

```text
DRAFT
  -> PENDING_REVIEW
  -> PUBLISHED
  -> CLOSED

PENDING_REVIEW -> REJECTED
REJECTED -> DRAFT
PUBLISHED -> SUSPENDED -> PUBLISHED
PUBLISHED -> CLOSED
```

Règles :

- seule l’entreprise propriétaire modifie un brouillon ou une offre rejetée ;
- une offre publiée ne peut plus modifier les champs structurants sans nouvelle validation ;
- l’administrateur publie, rejette ou suspend ;
- une offre clôturée n’accepte plus de candidatures.

## 5.2 Candidature

```text
SUBMITTED
  -> UNDER_REVIEW
  -> INTERVIEW
  -> ACCEPTED
  -> REJECTED

SUBMITTED -> WITHDRAWN
UNDER_REVIEW -> REJECTED
INTERVIEW -> REJECTED
```

Règles :

- une candidature unique par candidat et par offre ;
- le candidat peut retirer uniquement avant `ACCEPTED` ou `REJECTED` ;
- seule l’entreprise propriétaire de l’offre change le statut ;
- chaque transition est enregistrée dans un historique ;
- une acceptation sur un stage crée une convention en brouillon ;
- une acceptation sur un emploi ne crée pas de convention de stage.

## 5.3 Convention

```text
DRAFT
  -> COMPANY_SIGNED
  -> CANDIDATE_SIGNED
  -> INSTITUTION_SIGNED
  -> ACTIVE

DRAFT / *_SIGNED -> CANCELLED
ACTIVE -> COMPLETED
```

Règles :

- l’ordre de signature est strict ;
- chaque signature porte sur le même hash de document ;
- toute modification du contenu invalide les signatures et régénère une version ;
- la signature V1 est une attestation interne : consentement, date, utilisateur, adresse IP, agent utilisateur et hash du document ;
- elle ne doit pas être présentée comme une signature électronique qualifiée ou certifiée.

## 5.4 Stage

```text
PLANNED -> ACTIVE -> COMPLETED
PLANNED -> CANCELLED
ACTIVE -> TERMINATED
```

## 5.5 Validation des transitions

```ts
type ApplicationStatus =
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "INTERVIEW"
  | "ACCEPTED"
  | "REJECTED"
  | "WITHDRAWN";

const APPLICATION_TRANSITIONS: Record<
  ApplicationStatus,
  readonly ApplicationStatus[]
> = {
  SUBMITTED: ["UNDER_REVIEW", "WITHDRAWN", "REJECTED"],
  UNDER_REVIEW: ["INTERVIEW", "ACCEPTED", "REJECTED"],
  INTERVIEW: ["ACCEPTED", "REJECTED"],
  ACCEPTED: [],
  REJECTED: [],
  WITHDRAWN: []
};

export function assertApplicationTransition(
  current: ApplicationStatus,
  next: ApplicationStatus
): void {
  if (!APPLICATION_TRANSITIONS[current].includes(next)) {
    throw new DomainError(
      "INVALID_APPLICATION_TRANSITION",
      `Transition interdite : ${current} -> ${next}`,
      409
    );
  }
}
```

Cette fonction doit être appelée dans le backend, même si le frontend ne propose que les boutons autorisés.

---

# 6. Modèle de données

Les identifiants sont des UUID sous forme de chaînes.

Toutes les tables métier possèdent :

```text
id
created_at
updated_at
```

Les dates sont stockées en UTC.

## 6.1 Identité et sessions

### `users`

| Champ | Type logique | Contraintes |
|---|---|---|
| id | UUID | PK |
| email | string | unique, normalisé en minuscules |
| password_hash | string | obligatoire |
| role | enum | obligatoire |
| status | enum | ACTIVE, SUSPENDED, DISABLED |
| email_verified_at | datetime nullable | |
| last_login_at | datetime nullable | |

### `sessions`

| Champ | Description |
|---|---|
| id | UUID |
| user_id | propriétaire |
| token_hash | hash SHA-256 du token opaque |
| expires_at | expiration |
| revoked_at | révocation |
| ip_address | journal sécurité |
| user_agent | journal sécurité |

Le token brut n’est jamais stocké en base.

## 6.2 Profils

### `candidate_profiles`

- `user_id` unique ;
- `candidate_type` : STUDENT ou GRADUATE ;
- prénom, nom ;
- téléphone chiffré ;
- région, ville ;
- titre professionnel ;
- biographie ;
- disponibilité ;
- établissement actuel nullable ;
- numéro étudiant chiffré nullable ;
- statut de validation étudiant ;
- pourcentage de complétude calculé.

### `candidate_educations`

- candidat ;
- établissement ;
- diplôme ;
- filière ;
- niveau ;
- date de début et date de fin ;
- en cours.

### `candidate_skills`

- candidat ;
- nom ;
- niveau optionnel.

### `candidate_languages`

- candidat ;
- langue ;
- niveau.

### `candidate_projects`

- candidat ;
- titre ;
- description ;
- lien nullable.

### `company_profiles`

- `user_id` unique ;
- raison sociale ;
- numéro registre chiffré ;
- secteur ;
- taille ;
- région, ville ;
- description ;
- site web ;
- logo_path ;
- statut de vérification ;
- motif de rejet nullable.

### `institution_profiles`

- `user_id` unique ;
- nom ;
- type ;
- région, ville ;
- code ou immatriculation ;
- logo_path ;
- statut de vérification.

## 6.3 Offres et candidatures

### `offers`

- `company_id` ;
- type : ACADEMIC_INTERNSHIP, PROFESSIONAL_INTERNSHIP, EMPLOYMENT ;
- titre ;
- description ;
- profil recherché ;
- secteur ;
- région, ville ;
- durée en semaines nullable ;
- gratification : booléen ;
- montant nullable ;
- ouvertures ;
- date limite ;
- statut ;
- motif de rejet nullable ;
- publié le ;
- clôturé le.

Index :

- statut + date de publication ;
- région ;
- secteur ;
- type ;
- entreprise.

### `applications`

- offer_id ;
- candidate_id ;
- statut ;
- message de motivation ;
- cv_snapshot_path ;
- submitted_at ;
- decided_at nullable ;
- decision_note nullable.

Contrainte unique :

```text
(candidate_id, offer_id)
```

### `application_status_history`

- application_id ;
- ancien statut ;
- nouveau statut ;
- changé par ;
- commentaire ;
- date.

Cette table est indispensable pour les statistiques de délais.

## 6.4 Convention et stage

### `agreements`

- application_id unique ;
- institution_id ;
- version ;
- status ;
- document_path ;
- document_hash ;
- starts_at ;
- ends_at ;
- supervisor_name ;
- supervisor_email ;
- generated_at ;
- activated_at nullable.

### `agreement_signatures`

- agreement_id ;
- signer_user_id ;
- signer_role ;
- document_hash ;
- consent_text ;
- signed_at ;
- ip_address ;
- user_agent.

Contrainte unique :

```text
(agreement_id, signer_role, document_hash)
```

### `internships`

- agreement_id unique ;
- candidate_id ;
- company_id ;
- institution_id ;
- status ;
- starts_at ;
- ends_at ;
- company_feedback nullable ;
- institution_feedback nullable.

### `internship_reports`

- internship_id unique ;
- candidate_id ;
- file_path ;
- original_filename ;
- mime_type ;
- size_bytes ;
- submitted_at ;
- validation_status ;
- validated_by nullable ;
- validated_at nullable.

## 6.5 Ressources et mentorat

### `learning_resources`

- titre ;
- type : ARTICLE, VIDEO, WEBINAR ;
- résumé ;
- URL ou contenu ;
- catégorie ;
- statut ;
- publié par.

### `mentor_profiles`

- user_id ;
- titre ;
- domaines ;
- biographie ;
- disponibilité ;
- statut.

### `mentorship_requests`

- candidate_id ;
- mentor_id ;
- objectif ;
- statut ;
- date de demande.

Le mentorat est hors MVP, mais le modèle est défini pour éviter une réécriture complète.

## 6.6 Pilotage

### `employment_outcomes`

- candidate_id ;
- source_internship_id nullable ;
- outcome_type : EMPLOYED_CDI, EMPLOYED_CDD, SELF_EMPLOYED, UNEMPLOYED, UNKNOWN ;
- company_name nullable ;
- recorded_at ;
- recorded_by.

### `audit_logs`

- actor_user_id nullable ;
- action ;
- resource_type ;
- resource_id ;
- metadata JSON ;
- ip_address ;
- created_at.

À journaliser au minimum :

- changement de rôle ou statut ;
- vérification/rejet d’une organisation ;
- publication/suspension d’une offre ;
- décision sur candidature ;
- génération et signature de convention ;
- export de statistiques.

---

# 7. Contrat API commun

## 7.1 Réponse réussie

```json
{
  "data": {},
  "meta": {
    "requestId": "uuid"
  }
}
```

## 7.2 Liste paginée

```json
{
  "data": [],
  "meta": {
    "page": 1,
    "pageSize": 20,
    "total": 145,
    "totalPages": 8,
    "requestId": "uuid"
  }
}
```

## 7.3 Erreur

```json
{
  "error": {
    "code": "OFFER_NOT_PUBLISHED",
    "message": "Cette offre n'accepte pas de candidatures.",
    "fields": null,
    "requestId": "uuid"
  }
}
```

## 7.4 Codes d’erreur essentiels

```text
UNAUTHENTICATED
FORBIDDEN
ACCOUNT_SUSPENDED
VALIDATION_ERROR
RESOURCE_NOT_FOUND
EMAIL_ALREADY_USED
PROFILE_INCOMPLETE
COMPANY_NOT_VERIFIED
STUDENT_NOT_VERIFIED
OFFER_NOT_EDITABLE
OFFER_NOT_PUBLISHED
OFFER_CLOSED
APPLICATION_ALREADY_EXISTS
INVALID_APPLICATION_TRANSITION
AGREEMENT_SIGNATURE_ORDER_INVALID
AGREEMENT_DOCUMENT_CHANGED
UPLOAD_INVALID
RATE_LIMITED
```

---

# 8. Sécurité et confidentialité

## 8.1 Authentification

Choix retenu : sessions opaques stockées en base.

Avantages pour ce projet :

- révocation simple ;
- déconnexion de toutes les sessions ;
- pas de logique de refresh token complexe ;
- cookie HttpOnly ;
- audit des appareils.

```ts
import { createHash, randomBytes } from "node:crypto";

function hashSessionToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(userId: string, request: Request) {
  const token = randomBytes(32).toString("base64url");
  const tokenHash = hashSessionToken(token);

  await db`
    INSERT INTO sessions (
      id, user_id, token_hash, expires_at, ip_address, user_agent
    ) VALUES (
      ${crypto.randomUUID()},
      ${userId},
      ${tokenHash},
      ${new Date(Date.now() + 7 * 86400_000)},
      ${readClientIp(request)},
      ${request.headers.get("user-agent")}
    )
  `;

  return token;
}
```

Cookie :

```text
HttpOnly
Secure en production
SameSite=Lax
Path=/
Durée : 7 jours
```

Pour des sous-domaines séparés, le backend autorise uniquement l’origine du frontend et `credentials: true`.

## 8.2 Mots de passe

- hash asynchrone avec `Bun.password.hash` ;
- vérification avec `Bun.password.verify` ;
- longueur minimale de 8 caractères pour la V1 ;
- limitation des tentatives de connexion ;
- aucun mot de passe dans les logs.

## 8.3 Chiffrement applicatif

Le chiffrement concerne les champs sensibles ciblés :

- téléphone ;
- numéro étudiant ;
- registre de commerce ;
- éventuellement adresse précise.

Il ne faut pas chiffrer les champs nécessaires à la recherche comme la région ou le secteur.

Exemple AES-GCM :

```ts
const encoder = new TextEncoder();
const decoder = new TextDecoder();

async function importEncryptionKey(secretBase64: string) {
  const bytes = Uint8Array.from(
    atob(secretBase64),
    (char) => char.charCodeAt(0)
  );

  return crypto.subtle.importKey(
    "raw",
    bytes,
    "AES-GCM",
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encryptText(
  plaintext: string,
  key: CryptoKey
): Promise<string> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = new Uint8Array(
    await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      encoder.encode(plaintext)
    )
  );

  const packed = new Uint8Array(iv.length + ciphertext.length);
  packed.set(iv);
  packed.set(ciphertext, iv.length);

  return btoa(String.fromCharCode(...packed));
}

export async function decryptText(
  encoded: string,
  key: CryptoKey
): Promise<string> {
  const packed = Uint8Array.from(
    atob(encoded),
    (char) => char.charCodeAt(0)
  );
  const iv = packed.slice(0, 12);
  const ciphertext = packed.slice(12);

  const plaintext = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    ciphertext
  );

  return decoder.decode(plaintext);
}
```

La clé n’est jamais stockée dans la base ou le dépôt Git.

## 8.4 Fichiers

- taille maximale configurable ;
- types MIME autorisés ;
- nom physique généré ;
- nom original conservé comme métadonnée ;
- aucun fichier exécutable ;
- CV/rapports non publics ;
- téléchargement via route autorisée ou URL temporaire ;
- validation du propriétaire à chaque accès.

## 8.5 Limites de la V1 académique

La V1 vise de bonnes pratiques techniques, mais ne constitue pas à elle seule :

- une certification RGPD ;
- un audit de sécurité ;
- une signature électronique qualifiée ;
- une homologation gouvernementale.

---

# 9. Flows d’implémentation

---

## FLOW 00 — Découverte publique, inscription et connexion

### Objectif

Permettre à un visiteur de comprendre la plateforme, de créer le bon type de compte et d’accéder à son espace.

### User stories

- En tant que visiteur, je veux comprendre rapidement l’objectif de la plateforme.
- En tant que candidat, je veux créer un compte avec mon email.
- En tant qu’entreprise, je veux créer un compte et compléter ensuite mon identité.
- En tant qu’établissement, je veux demander ou recevoir un accès.
- En tant qu’utilisateur, je veux me connecter et être redirigé vers mon tableau de bord.
- En tant qu’utilisateur suspendu, je dois être empêché de me connecter.

### Landing page

Route :

```text
/
```

Sections, sans animation complexe :

1. barre de navigation ;
2. hero avec titre, texte et deux CTA ;
3. trois avantages ;
4. quatre cartes de rôles ;
5. fonctionnement en trois étapes ;
6. quelques indicateurs factices clairement identifiés avant production ;
7. CTA final ;
8. pied de page.

Composants shadcn-svelte :

- `Button`
- `Card`
- `Badge`
- `Separator`

### Pages frontend

```text
/login
/register
/forgot-password              Phase 2
/app                          redirection selon rôle
```

### Contrat

Entrée inscription :

```ts
type RegisterInput = {
  email: string;
  password: string;
  role: "CANDIDATE" | "COMPANY" | "INSTITUTION";
  acceptTerms: true;
};
```

Sortie session :

```ts
type SessionView = {
  user: {
    id: string;
    email: string;
    role: UserRole;
    status: "ACTIVE" | "SUSPENDED" | "DISABLED";
  };
};
```

### Tâches backend

- migration `users`, `sessions`, `audit_logs` ;
- inscription avec email unique ;
- hash du mot de passe ;
- connexion ;
- création et révocation de session ;
- endpoint session courante ;
- déconnexion ;
- garde `requireUser` ;
- garde `requireRole` ;
- limitation simple des tentatives ;
- journalisation de connexion réussie/échouée sans mot de passe.

### Tâches frontend indépendantes

- landing ;
- formulaires inscription/connexion ;
- validation locale ;
- état chargement/erreur ;
- adaptateur mock :
  - succès candidat ;
  - succès entreprise ;
  - email déjà utilisé ;
  - mauvais mot de passe ;
  - compte suspendu ;
- store session ;
- redirection selon rôle.

### Composants

- `Form` ou formulaire HTML structuré ;
- `Input`
- `Label`
- `Select`
- `Checkbox`
- `Alert`
- `Button`
- `Card`

### Critères d’acceptation

- un compte ne peut pas partager l’email d’un autre compte ;
- le mot de passe n’est jamais renvoyé ;
- une session persiste après rechargement ;
- la déconnexion invalide la session ;
- le dashboard reçu correspond au rôle ;
- l’interface est utilisable à 360 px de largeur.

---

## FLOW 01 — Onboarding et profil candidat

### Objectif

Construire un profil utilisable pour candidater et générer un CV.

### User stories

- Je renseigne mon identité, ma formation, mes compétences et mes langues.
- Je vois la complétude de mon profil.
- J’ajoute, modifie ou retire une formation.
- Je prévisualise et télécharge mon CV.
- Si je suis étudiant, je demande la validation de mon statut.

### Pages

```text
/app/candidate
/app/candidate/profile
/app/candidate/cv
/app/candidate/settings
```

### UI

Dashboard :

- carte de complétude ;
- candidatures récentes ;
- offres recommandées simples ;
- prochain stage éventuel ;
- actions rapides.

Profil :

- onglets Identité, Formation, Compétences, Langues, Projets ;
- sauvegarde par section ;
- message de confirmation.

Composants :

- `Card`
- `Progress`
- `Tabs`
- `Input`
- `Textarea`
- `Select`
- `Badge`
- `Dialog`
- `Button`
- `AlertDialog`

### Règles métier

- nom, prénom, région et titre sont requis pour candidater ;
- une candidature exige au moins une formation ou un niveau d’étude ;
- le numéro étudiant est obligatoire seulement pour `STUDENT` ;
- la complétude est calculée au backend ;
- les compétences sont dédupliquées sans tenir compte de la casse ;
- le CV est généré à partir d’un snapshot du profil.

### Tâches backend

- migrations profils et collections ;
- lecture/mise à jour du profil ;
- opérations formations/compétences/langues/projets ;
- calcul de complétude ;
- chiffrement des champs sensibles ;
- génération du CV ;
- route de téléchargement autorisée ;
- demande de validation du statut étudiant.

### Tâches frontend indépendantes

- tous les formulaires avec mock ;
- ordre et suppression des entrées ;
- prévisualisation CV HTML ;
- bouton téléchargement simulé ;
- états :
  - profil vide ;
  - profil partiel ;
  - profil complet ;
  - validation étudiante en attente/rejetée/validée.

### Critères d’acceptation

- le candidat récupère son profil après reconnexion ;
- la complétude est identique frontend/backend ;
- le CV ne contient pas le mot de passe ou les identifiants internes ;
- un autre candidat ne peut pas télécharger ce CV ;
- la vue CV est lisible au format A4.

---

## FLOW 02 — Onboarding entreprise et cycle de publication d’offre

### Objectif

Permettre à une entreprise vérifiée de créer une offre et de la faire publier par un administrateur.

### User stories

- L’entreprise complète sa présentation.
- Elle crée une offre brouillon.
- Elle soumet l’offre à validation.
- L’administrateur publie ou rejette.
- L’entreprise corrige une offre rejetée.
- Elle clôture une offre publiée.

### Pages entreprise

```text
/app/company
/app/company/profile
/app/company/offers
/app/company/offers/new
/app/company/offers/[id]
/app/company/offers/[id]/edit
```

### Pages administrateur

```text
/app/admin/offers
/app/admin/offers/[id]
/app/admin/organizations
```

### Règles métier

- entreprise `VERIFIED` obligatoire pour soumettre ;
- titre, type, description, secteur, région, date limite et ouvertures requis ;
- montant requis uniquement si gratification activée ;
- une offre soumise devient non modifiable ;
- un rejet contient un motif ;
- une modification après rejet retourne l’offre en brouillon ;
- une offre publiée est visible publiquement ;
- une offre dépassant sa date limite n’accepte plus de candidature.

### Tâches backend

- profil entreprise ;
- vérification administrateur ;
- CRUD limité au brouillon ;
- soumission ;
- modération ;
- publication, rejet, suspension, clôture ;
- audit ;
- requête tableau de bord entreprise.

### Tâches frontend indépendantes

- profil entreprise ;
- formulaire offre ;
- liste et filtres par statut ;
- badges de statut ;
- écran de modération ;
- dialog publier/rejeter ;
- mock de tous les états.

### Composants

- `Table`
- `Badge`
- `DropdownMenu`
- `Dialog`
- `AlertDialog`
- `Textarea`
- `Select`
- `Switch`
- `Date Picker` si disponible, sinon input date natif.

### Critères d’acceptation

- une entreprise non vérifiée ne peut pas soumettre ;
- une entreprise ne voit ni ne modifie les brouillons d’une autre ;
- le motif de rejet apparaît dans son tableau de bord ;
- seule une offre publiée apparaît dans la recherche candidat.

---

## FLOW 03 — Recherche d’offres et candidature

### Objectif

Permettre au candidat de trouver une offre pertinente et postuler une seule fois.

### User stories

- Je recherche par texte.
- Je filtre par région, secteur, type et durée.
- Je consulte le détail.
- Je postule en un clic avec confirmation.
- Je vois immédiatement le statut de ma candidature.

### Pages

```text
/offers
/offers/[id]
/app/candidate/applications
/app/candidate/applications/[id]
```

### Règles métier

- seules les offres publiées et ouvertes sont visibles ;
- recherche sur titre, description et profil recherché ;
- pagination ;
- profil minimal obligatoire ;
- une seule candidature par offre ;
- un snapshot du CV est attaché à la candidature ;
- le candidat peut ajouter un court message ;
- la candidature ne peut pas être modifiée après soumission ;
- retrait autorisé avant décision finale.

### Tâches backend

- recherche filtrée et paginée ;
- détail public d’offre ;
- vérification profil ;
- transaction de candidature ;
- snapshot CV ;
- retrait ;
- liste candidatures candidat ;
- historique de statut.

### Tâches frontend indépendantes

- grille/listing responsive ;
- barre de recherche ;
- filtres dans `Sheet` sur mobile ;
- état vide ;
- skeletons ;
- détail offre ;
- dialog de candidature ;
- timeline de statut ;
- mock pagination et erreurs.

### Composants

- `Input`
- `Select`
- `Sheet`
- `Card`
- `Badge`
- `Pagination`
- `Skeleton`
- `Dialog`
- `Timeline` personnalisée simple avec HTML/CSS.

### Critères d’acceptation

- les filtres sont conservés dans l’URL ;
- le bouton postuler est désactivé si déjà candidaté ;
- deux requêtes concurrentes ne créent pas deux candidatures ;
- une offre clôturée retourne une erreur métier claire ;
- le candidat ne voit que ses candidatures.

---

## FLOW 04 — Revue, entretien et sélection des candidats

### Objectif

Permettre à l’entreprise de suivre ses candidats jusqu’à la décision.

### User stories

- L’entreprise voit les candidats d’une offre.
- Elle filtre par statut.
- Elle ouvre un profil et le CV snapshot.
- Elle passe une candidature en revue, entretien, acceptée ou refusée.
- Le candidat voit la décision.
- L’acceptation d’un stage prépare la convention.

### Pages entreprise

```text
/app/company/offers/[id]/applications
/app/company/applications/[id]
```

### Règles métier

- l’entreprise n’accède qu’aux candidatures de ses offres ;
- les transitions suivent la machine d’état ;
- toute décision finale exige une note optionnelle mais recommandée ;
- l’acceptation est transactionnelle ;
- le nombre d’acceptations ne dépasse pas les ouvertures ;
- lorsque tous les postes sont pourvus, l’offre est clôturée ;
- pour un stage, création unique d’une convention ;
- pour un emploi, aucune convention.

### Transaction complexe

```ts
await db.begin(async (tx) => {
  const application = await lockApplication(tx, applicationId);
  const offer = await lockOffer(tx, application.offerId);

  assertCompanyOwnsOffer(actor, offer);
  assertApplicationTransition(application.status, "ACCEPTED");

  const acceptedCount = await countAcceptedApplications(tx, offer.id);
  if (acceptedCount >= offer.openings) {
    throw new DomainError("OFFER_CAPACITY_REACHED", "Places déjà pourvues", 409);
  }

  await updateApplicationStatus(tx, application.id, "ACCEPTED", actor.id);
  await appendApplicationHistory(tx, application, "ACCEPTED", actor.id);

  if (offer.type !== "EMPLOYMENT") {
    await createAgreementIfMissing(tx, application);
  }

  if (acceptedCount + 1 >= offer.openings) {
    await closeOffer(tx, offer.id);
  }
});
```

Pour SQLite, la stratégie de verrouillage doit être adaptée aux transactions disponibles ; la contrainte et la transaction restent obligatoires.

### Tâches backend

- liste candidats par offre ;
- détail candidature ;
- transition ;
- historique ;
- contrôle capacité ;
- création convention ;
- audit.

### Tâches frontend indépendantes

- table desktop et cartes mobile ;
- filtres ;
- vue du profil ;
- boutons contextuels par statut ;
- dialogs entretien, acceptation, rejet ;
- affichage timeline ;
- mocks de transitions valides et invalides.

### Critères d’acceptation

- une entreprise ne peut pas accepter sur l’offre d’une autre ;
- une transition invalide retourne 409 ;
- l’historique conserve l’auteur et la date ;
- une seule convention existe par candidature acceptée ;
- le candidat voit le statut actualisé.

---

## FLOW 05 — Vérification étudiant et rattachement établissement

### Objectif

Permettre à l’établissement de confirmer qu’un candidat est bien étudiant et de suivre ses stages.

### User stories

- L’établissement voit les demandes de validation.
- Il recherche par numéro étudiant ou nom.
- Il valide ou rejette avec motif.
- Le candidat voit le résultat.
- L’établissement voit les conventions et stages de ses étudiants.

### Pages

```text
/app/institution
/app/institution/students
/app/institution/students/[id]
/app/institution/internships
```

### Règles métier

- un établissement ne valide que les demandes qui lui sont adressées ;
- un rejet exige un motif ;
- une nouvelle demande est possible après correction ;
- une convention académique ne progresse pas jusqu’à la signature établissement sans validation ;
- un diplômé peut rester sans rattachement.

### Tâches backend

- demande de rattachement ;
- liste institution ;
- validation/rejet ;
- lecture des stages du périmètre ;
- audit.

### Tâches frontend indépendantes

- dashboard ;
- table demandes ;
- détail candidat limité aux données nécessaires ;
- dialogs valider/rejeter ;
- liste stages.

### Critères d’acceptation

- les informations non nécessaires du candidat ne sont pas exposées ;
- le candidat reçoit le statut ;
- aucune institution ne voit les étudiants d’une autre.

---

## FLOW 06 — Génération et signature séquentielle de convention

### Objectif

Démontrer le cœur de dématérialisation du stage.

### User stories

- Après acceptation, la convention est générée.
- L’entreprise vérifie les informations et signe.
- Le candidat signe ensuite.
- L’établissement valide et signe en dernier.
- Toutes les parties téléchargent la version finale.
- Toute tentative de signature hors ordre est refusée.

### Pages

```text
/app/company/agreements/[id]
/app/candidate/agreements/[id]
/app/institution/agreements/[id]
```

### Règles métier

- document généré depuis un template standard ;
- version numérotée ;
- hash SHA-256 enregistré ;
- entreprise -> candidat -> établissement ;
- relecture du hash avant chaque signature ;
- une signature est idempotente ;
- activation et création du stage après dernière signature ;
- modification des dates ou parties crée une nouvelle version et annule les signatures précédentes.

### Validation de l’ordre

```ts
type AgreementStatus =
  | "DRAFT"
  | "COMPANY_SIGNED"
  | "CANDIDATE_SIGNED"
  | "INSTITUTION_SIGNED"
  | "ACTIVE"
  | "CANCELLED"
  | "COMPLETED";

const SIGNING_RULES = {
  COMPANY: {
    expected: "DRAFT",
    next: "COMPANY_SIGNED"
  },
  CANDIDATE: {
    expected: "COMPANY_SIGNED",
    next: "CANDIDATE_SIGNED"
  },
  INSTITUTION: {
    expected: "CANDIDATE_SIGNED",
    next: "INSTITUTION_SIGNED"
  }
} as const;

export async function signAgreement(
  actor: AuthUser,
  agreementId: string,
  consent: boolean,
  request: Request
) {
  if (!consent) {
    throw new DomainError("CONSENT_REQUIRED", "Consentement obligatoire", 422);
  }

  await db.begin(async (tx) => {
    const agreement = await getAgreementForUpdate(tx, agreementId);
    const rule = SIGNING_RULES[actor.role as keyof typeof SIGNING_RULES];

    if (!rule || agreement.status !== rule.expected) {
      throw new DomainError(
        "AGREEMENT_SIGNATURE_ORDER_INVALID",
        "La convention ne peut pas être signée à cette étape.",
        409
      );
    }

    const currentHash = await hashStoredDocument(agreement.documentPath);
    if (currentHash !== agreement.documentHash) {
      throw new DomainError(
        "AGREEMENT_DOCUMENT_CHANGED",
        "Le document a changé depuis sa génération.",
        409
      );
    }

    await insertSignatureIdempotently(tx, {
      agreementId,
      userId: actor.id,
      role: actor.role,
      documentHash: currentHash,
      ip: readClientIp(request),
      userAgent: request.headers.get("user-agent")
    });

    await updateAgreementStatus(tx, agreementId, rule.next);

    if (rule.next === "INSTITUTION_SIGNED") {
      await activateAgreementAndCreateInternship(tx, agreement);
    }
  });
}
```

### Tâches backend

- template convention ;
- génération PDF ;
- stockage ;
- hash ;
- endpoint prévisualisation/téléchargement ;
- signature ;
- activation ;
- création stage ;
- audit.

### Tâches frontend indépendantes

- lecteur PDF ou lien de téléchargement ;
- stepper de signatures ;
- détail des parties ;
- checkbox consentement ;
- dialog de confirmation ;
- affichage de la signature actuelle ;
- mocks pour chaque étape.

### Composants

- `Card`
- `Badge`
- `Checkbox`
- `Dialog`
- `Button`
- `Alert`
- stepper simple.

### Critères d’acceptation

- le candidat ne signe pas avant l’entreprise ;
- l’établissement ne signe pas avant le candidat ;
- le même utilisateur ne crée pas deux signatures ;
- une altération du document bloque la signature ;
- le stage est créé une seule fois ;
- le PDF final est accessible uniquement aux parties et à l’administrateur.

---

## FLOW 07 — Suivi du stage et rapport

### Objectif

Suivre la période de stage et centraliser le rapport final.

### User stories

- Le candidat voit son stage actif.
- Il téléverse son rapport.
- L’entreprise et l’établissement consultent le rapport.
- L’établissement valide le dépôt.
- Les parties renseignent un retour simple.

### Pages

```text
/app/candidate/internships/[id]
/app/company/internships/[id]
/app/institution/internships/[id]
```

### Règles métier

- un stage passe automatiquement de PLANNED à ACTIVE selon la date ou manuellement par tâche planifiée ;
- rapport accepté : PDF uniquement dans la V1 ;
- taille maximale 10 Mo ;
- un seul rapport courant, remplaçable avant validation ;
- validation établissement ;
- stage terminé seulement après date de fin et action explicite ;
- les retours ne sont pas publics.

### Tâches backend

- détail stage par acteur ;
- mise à jour statut ;
- upload rapport ;
- téléchargement autorisé ;
- validation rapport ;
- feedback ;
- clôture.

### Tâches frontend indépendantes

- timeline ;
- informations stage ;
- upload avec progression visuelle ;
- état rapport ;
- formulaires feedback ;
- mocks fichier invalide, trop gros, succès.

### Critères d’acceptation

- accès limité aux parties ;
- fichier invalide refusé ;
- remplacement impossible après validation sans réouverture ;
- clôture enregistrée pour les KPI.

---

## FLOW 08 — Ressources d’employabilité

### Objectif

Offrir un espace simple de contenus pédagogiques.

### User stories

- Le candidat filtre les ressources.
- Il ouvre un article, une vidéo ou un webinaire.
- L’administrateur crée, publie ou archive une ressource.

### Pages

```text
/app/candidate/resources
/app/candidate/resources/[id]
/app/admin/resources
/app/admin/resources/new
```

### Règles métier

- seules les ressources publiées sont visibles candidat ;
- URL vidéo validée ;
- contenu article nettoyé ;
- archivage sans suppression physique.

### Tâches backend

- CRUD administrateur ;
- publication/archive ;
- listing public authentifié ;
- filtres.

### Tâches frontend indépendantes

- grille ressources ;
- filtres ;
- page détail ;
- formulaire admin ;
- états vides.

### Critères d’acceptation

- un candidat ne voit pas un brouillon ;
- un administrateur peut prévisualiser ;
- le contenu ne permet pas l’injection de scripts.

---

## FLOW 09 — Mentorat

### Objectif

Permettre une mise en relation simple sans construire une messagerie complète.

### Périmètre V1 étendue

- inscription comme mentor ;
- profil public limité ;
- demande de mentorat ;
- acceptation ou refus ;
- affichage des coordonnées après acceptation.

Aucune visioconférence ou messagerie temps réel n’est requise.

### Pages

```text
/app/candidate/mentors
/app/candidate/mentors/[id]
/app/mentor
/app/mentor/requests
```

### Tâches backend

- profil mentor ;
- modération ;
- recherche ;
- demande unique active ;
- acceptation/refus.

### Tâches frontend

- listing ;
- profil ;
- formulaire de demande ;
- tableau des demandes mentor.

---

## FLOW 10 — Administration et modération

### Objectif

Donner à l’administrateur un contrôle cohérent sans développer un back-office générique.

### Pages

```text
/app/admin
/app/admin/users
/app/admin/organizations
/app/admin/offers
/app/admin/resources
/app/admin/audit
```

### Fonctions

- vérifier/rejeter entreprises et établissements ;
- suspendre/réactiver un utilisateur ;
- modérer les offres ;
- consulter les incidents principaux ;
- gérer les ressources ;
- consulter l’audit.

### Règles métier

- un administrateur ne supprime pas définitivement un utilisateur depuis l’UI ;
- toute suspension exige un motif ;
- les actions sensibles sont auditées ;
- impossible de suspendre son propre compte dans la V1 ;
- aucun écran de modification libre de la base.

### Tâches backend

- listes paginées ;
- actions ciblées ;
- audit ;
- filtres.

### Tâches frontend

- tables ;
- panneaux détail ;
- dialogs confirmation ;
- badges ;
- filtres ;
- pages vides/erreurs.

---

## FLOW 11 — Statistiques et employabilité

### Objectif

Présenter des indicateurs reproductibles à partir des données métier.

### KPIs V1

1. stages obtenus par mois ;
2. stages par région ;
3. stages par filière ;
4. délai moyen entre inscription et première acceptation ;
5. délai moyen entre candidature et acceptation ;
6. répartition des candidatures par statut ;
7. conversion stage -> emploi ;
8. nombre d’entreprises et offres actives.

### Périmètres

- administrateur : national ;
- établissement : uniquement ses étudiants ;
- entreprise : uniquement ses offres, sur un tableau simplifié.

### Pages

```text
/app/admin/statistics
/app/institution/statistics
/app/company/statistics
```

### Règles métier

- les KPI utilisent les dates de l’historique, pas uniquement les statuts courants ;
- plage de dates obligatoire ou valeur par défaut ;
- les données personnelles ne figurent pas dans les exports agrégés ;
- les petits groupes peuvent être regroupés ou masqués dans une version réelle ;
- export CSV, pas Excel avancé dans la V1.

### Exemple d’agrégation

Pseudo-SQL portable à adapter par dialecte :

```sql
SELECT
  region,
  COUNT(*) AS internships_count
FROM internships
WHERE status IN ('ACTIVE', 'COMPLETED')
  AND starts_at >= ?
  AND starts_at < ?
GROUP BY region
ORDER BY internships_count DESC;
```

Le groupement mensuel diffère entre SQLite et MySQL. Il doit être implémenté dans deux requêtes adaptées ou calculé en TypeScript après une extraction bornée.

### Tâches backend

- service d’agrégats ;
- filtres date/région/filière ;
- restriction de périmètre ;
- export CSV ;
- tests sur jeux de données déterministes.

### Tâches frontend indépendantes

- cartes KPI ;
- graphiques simples ;
- filtres ;
- table de synthèse ;
- export ;
- mocks pour données nulles et normales.

Pour réduire les dépendances, les graphiques peuvent utiliser une bibliothèque unique ou des barres CSS simples pour la démonstration.

### Critères d’acceptation

- un établissement n’obtient jamais les données d’un autre ;
- un filtre modifie tous les KPI ;
- les valeurs correspondent à un dataset de test connu ;
- l’export reprend le même filtre.

---

# 10. Navigation frontend complète

## 10.1 Routes publiques

```text
/
/offers
/offers/[id]
/login
/register
```

## 10.2 Layout candidat

```text
/app/candidate
/app/candidate/profile
/app/candidate/cv
/app/candidate/applications
/app/candidate/applications/[id]
/app/candidate/agreements/[id]
/app/candidate/internships/[id]
/app/candidate/resources
/app/candidate/mentors
/app/candidate/settings
```

## 10.3 Layout entreprise

```text
/app/company
/app/company/profile
/app/company/offers
/app/company/offers/new
/app/company/offers/[id]
/app/company/offers/[id]/edit
/app/company/offers/[id]/applications
/app/company/applications/[id]
/app/company/agreements/[id]
/app/company/internships/[id]
/app/company/statistics
/app/company/settings
```

## 10.4 Layout établissement

```text
/app/institution
/app/institution/students
/app/institution/students/[id]
/app/institution/agreements/[id]
/app/institution/internships
/app/institution/internships/[id]
/app/institution/statistics
/app/institution/settings
```

## 10.5 Layout administrateur

```text
/app/admin
/app/admin/users
/app/admin/organizations
/app/admin/offers
/app/admin/resources
/app/admin/audit
/app/admin/statistics
```

---

# 11. Système UI shadcn-svelte

## 11.1 Principe

- thème par défaut ;
- palette principale unique ;
- fond clair ;
- dark mode non obligatoire ;
- pas d’animations décoratives ;
- bordures et cartes standards ;
- largeur de contenu cohérente ;
- navigation latérale sur desktop ;
- `Sheet` sur mobile.

## 11.2 Composants à installer

Base :

```text
button
card
input
label
textarea
select
checkbox
switch
badge
alert
separator
tabs
progress
skeleton
dialog
alert-dialog
dropdown-menu
sheet
table
pagination
tooltip
popover
```

Optionnels :

```text
calendar
command
breadcrumb
avatar
```

## 11.3 États obligatoires de chaque écran

Chaque page de données doit définir :

- chargement ;
- succès ;
- liste vide ;
- erreur récupérable ;
- interdit ;
- non trouvé ;
- action en cours ;
- action réussie.

## 11.4 Responsive

À 360–430 px :

- aucune table large sans alternative ;
- filtres dans un `Sheet` ;
- actions principales accessibles ;
- boutons suffisamment grands ;
- formulaires sur une colonne ;
- barres latérales remplacées par menu mobile.

À partir de 768 px :

- grilles ;
- tables ;
- navigation latérale.

---

# 12. Contrats frontend/backend indépendants

## 12.1 Processus par flow

Avant de coder un flow :

1. figer les user stories ;
2. figer les statuts et erreurs ;
3. ajouter les types dans `contract.ts` ;
4. créer les fixtures mock ;
5. développer frontend et backend en parallèle ;
6. brancher l’adaptateur réel ;
7. exécuter les tests d’acceptation.

## 12.2 Exemple de contrat

```ts
export type OfferCardView = {
  id: string;
  title: string;
  companyName: string;
  companyLogoUrl: string | null;
  type:
    | "ACADEMIC_INTERNSHIP"
    | "PROFESSIONAL_INTERNSHIP"
    | "EMPLOYMENT";
  sector: string;
  region: string;
  city: string;
  durationWeeks: number | null;
  gratification: boolean;
  deadline: string;
  publishedAt: string;
};

export type OfferSearchInput = {
  query?: string;
  region?: string;
  sector?: string;
  type?: OfferCardView["type"];
  maxDurationWeeks?: number;
  page: number;
  pageSize: number;
};

export type OfferSearchResult = {
  items: OfferCardView[];
  page: number;
  pageSize: number;
  total: number;
};
```

Le frontend construit l’interface avec ces types. Le backend garantit ensuite que ses sorties satisfont le même contrat.

---

# 13. Migrations SQLite/MySQL

## 13.1 Règle

Chaque migration logique porte le même numéro dans les deux dialectes.

```text
backend/migrations/
├── sqlite/
│   ├── 001_identity.sql
│   ├── 002_profiles.sql
│   └── 003_offers_applications.sql
└── mysql/
    ├── 001_identity.sql
    ├── 002_profiles.sql
    └── 003_offers_applications.sql
```

## 13.2 Restrictions de portabilité

- UUID stocké comme texte/char ;
- booléens normalisés ;
- éviter les fonctions de date propres au moteur dans les requêtes métier ;
- JSON utilisé seulement pour audit/métadonnées, pas pour relations principales ;
- pas de `ENUM` natif MySQL : utiliser `VARCHAR` + validation applicative ;
- index explicitement créés dans les deux dialectes.

## 13.3 Validation

Pour chaque migration :

1. base SQLite neuve ;
2. migration complète ;
3. tests d’intégration SQLite ;
4. base MySQL neuve en CI ou environnement d’intégration ;
5. migration complète ;
6. mêmes tests d’intégration.

---

# 14. Tests

## 14.1 Tests unitaires

À couvrir :

- transitions d’état ;
- permissions ;
- calcul de complétude ;
- capacité d’une offre ;
- ordre de signature ;
- calculs KPI purs ;
- validation des filtres.

## 14.2 Tests d’intégration backend

- inscription/session ;
- isolation des propriétaires ;
- candidature concurrente ;
- acceptation transactionnelle ;
- création unique de convention ;
- signature idempotente ;
- autorisation des fichiers ;
- périmètre statistique.

## 14.3 Tests composants frontend

Priorité :

- formulaires complexes ;
- filtres ;
- timeline candidature ;
- stepper convention ;
- affichage des erreurs.

## 14.4 E2E prioritaires

```text
E2E-01 candidat s’inscrit et complète son profil
E2E-02 entreprise vérifiée crée une offre
E2E-03 admin publie l’offre
E2E-04 candidat recherche et postule
E2E-05 entreprise accepte
E2E-06 signatures dans le bon ordre
E2E-07 candidat dépose son rapport
E2E-08 admin consulte les KPI
```

---

# 15. Critères non fonctionnels mesurables

## Performance V1

- pagination obligatoire sur toutes les listes ;
- page standard chargée sans télécharger des milliers de lignes ;
- index sur statuts, dates et clés étrangères ;
- fichiers servis en streaming ;
- aucune génération PDF à chaque affichage : générer et stocker une version ;
- requêtes statistiques bornées par dates ;
- pas de N+1 dans les listes.

## Disponibilité et robustesse

- endpoint `/health` ;
- arrêt propre des connexions ;
- migration avant démarrage de la version ;
- erreurs structurées ;
- request ID ;
- logs JSON en production.

## Accessibilité

- labels de formulaires ;
- navigation clavier ;
- focus visible ;
- textes d’erreur associés aux champs ;
- contrastes du thème par défaut ;
- boutons avec texte ou libellé accessible ;
- aucun statut transmis uniquement par couleur.

---

# 16. Ordre global de réalisation

## Lot 0 — Socle

- monorepo Bun ;
- SvelteKit ;
- shadcn-svelte ;
- Elysia ;
- SQLite/MySQL ;
- migrations ;
- contrat partagé ;
- gestion erreurs ;
- mock API ;
- layouts ;
- CI minimale.

## Lot 1 — FLOW 00

Authentification et landing.

## Lot 2 — FLOW 01 + FLOW 02

Profils candidat et entreprise.

## Lot 3 — FLOW 02 + FLOW 10 partiel

Offres et modération.

## Lot 4 — FLOW 03

Recherche et candidature.

## Lot 5 — FLOW 04

Traitement et sélection.

**Fin du MVP technique.**

## Lot 6 — FLOW 05 + FLOW 06

Établissement et conventions.

## Lot 7 — FLOW 07

Suivi et rapport.

## Lot 8 — FLOW 08

Ressources.

## Lot 9 — FLOW 11

Statistiques.

**Fin de la V1 académique.**

## Lot 10 — FLOW 09

Mentorat et évolutions.

---

# 17. Définition de “terminé” pour un flow

Un flow n’est terminé que si :

- contrat partagé validé ;
- migrations présentes pour SQLite et MySQL ;
- règles métier backend testées ;
- routes sécurisées ;
- frontend responsive ;
- mock frontend disponible ;
- adaptateur API réel branché ;
- états chargement/vide/erreur présents ;
- critères d’acceptation vérifiés ;
- DOX mis à jour avec l’état actuel ;
- aucune ancienne information obsolète conservée.

---

# 18. Risques et décisions de réduction de complexité

| Risque | Décision |
|---|---|
| Signature légale complexe | Attestation interne avec hash, consentement et audit |
| Notifications externes | Notifications UI ou logs en V1 |
| Stockage cloud | Adaptateur local en dev, remplaçable |
| Multi-utilisateurs par entreprise | Un compte principal en V1 ; membres en évolution |
| Matching intelligent | Recherche et filtres déterministes |
| CV avancé | Un template A4 unique |
| BI complexe | KPI SQL ciblés et CSV |
| Messagerie mentorat | Échange de coordonnées après acceptation |
| Carte géographique | Table/barres par région |
| Microservices | Monolithe modulaire unique |

Ces choix réduisent la complexité technique sans supprimer les parcours métier attendus.

---

# 19. Références techniques officielles

- SvelteKit : routing, chargement de données et formulaires.
- shadcn-svelte : composants copiés dans le projet et thème Svelte 5/Tailwind actuel.
- Elysia : serveur Bun et Eden Treaty pour le typage de bout en bout.
- Bun : runtime, test runner, hash de mots de passe et API SQL SQLite/MySQL.
