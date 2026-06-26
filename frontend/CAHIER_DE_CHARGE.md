# CAHIER DES CHARGES FRONTEND

## Plateforme Nationale de Gestion des Stages, de l’Insertion et de l’Employabilité — PNGS-IE

**Version :** 1.0
**Nature :** projet académique
**Périmètre :** frontend web uniquement
**Statut :** document de référence pour le développement
**Framework :** SvelteKit avec TypeScript
**Gestionnaire de paquets :** Bun
**Système UI :** Shadcn-Svelte
**Méthodologie :** Workflow APEX avec worktrees
**Approche d’intégration :** contract-first avec API Hono

---

# 1. OBJET DU DOCUMENT

Le présent cahier des charges définit les exigences fonctionnelles, techniques, ergonomiques et visuelles du frontend de la plateforme PNGS-IE.

Il constitue la référence pour :

- l’architecture du frontend ;
- la création des layouts ;
- l’utilisation de Shadcn-Svelte ;
- le développement des espaces utilisateurs ;
- la gestion des formulaires ;
- la gestion des tableaux de données ;
- l’intégration future avec le backend ;
- les tests ;
- la validation visuelle ;
- le découpage des travaux avec APEX.

Ce document ne décrit pas l’implémentation interne du backend.

Le frontend doit pouvoir être développé indépendamment à partir de contrats API, de mocks et de fixtures.

---

# 2. PRÉSENTATION DU PROJET

## 2.1 Nom

**PNGS-IE**

Plateforme Nationale de Gestion des Stages, de l’Insertion et de l’Employabilité.

## 2.2 Finalité

La plateforme centralise :

- les profils des étudiants et diplômés ;
- les offres de stage et d’emploi ;
- les candidatures ;
- les entretiens ;
- les conventions de stage ;
- le suivi des stages ;
- les rapports ;
- les ressources de formation ;
- le mentorat ;
- les statistiques d’employabilité.

## 2.3 Utilisateurs

Le frontend doit gérer cinq catégories d’accès :

1. visiteur public ;
2. candidat ;
3. entreprise ;
4. établissement ;
5. administrateur.

---

# 3. OBJECTIFS DU FRONTEND

Le frontend doit :

- proposer une interface institutionnelle moderne ;
- fournir une navigation claire selon le rôle ;
- permettre l’utilisation complète des fonctionnalités métier ;
- offrir des tableaux riches et exploitables ;
- offrir des formulaires cohérents ;
- afficher tous les états asynchrones ;
- fonctionner avec des mocks avant disponibilité du backend ;
- respecter les contrats API ;
- utiliser Shadcn-Svelte comme système UI principal ;
- appliquer le Windowed Material System ;
- fonctionner en mode clair et sombre ;
- être responsive ;
- être accessible ;
- être développable feature par feature avec APEX.

---

# 4. PÉRIMÈTRE DU FRONTEND

## 4.1 Inclus

Le frontend comprend :

- le site public ;
- l’authentification ;
- les espaces par rôle ;
- les layouts ;
- le système de navigation ;
- les composants UI ;
- les composants métier ;
- les formulaires ;
- les Data Tables ;
- les filtres ;
- la pagination ;
- les actions de masse pertinentes ;
- les états de chargement ;
- les états vides ;
- les erreurs ;
- les notifications ;
- les graphiques ;
- les prévisualisations de documents ;
- les mocks ;
- le client API ;
- les guards frontend ;
- les tests frontend.

## 4.2 Exclus

Le frontend ne doit pas :

- accéder directement à une base de données ;
- contenir de SQL ;
- connaître les repositories backend ;
- connaître SQLite, MySQL ou PostgreSQL ;
- reproduire les règles métier critiques ;
- décider seul des transitions métier ;
- générer localement une convention officielle ;
- gérer une signature électronique certifiée ;
- contenir les secrets de l’application ;
- gérer la sécurité finale des données ;
- remplacer les contrôles d’autorisation backend.

---

# 5. ARCHITECTURE GÉNÉRALE

## 5.1 Principe de séparation

Le projet frontend est totalement séparé du backend.

```text
pngs-ie-frontend/
```

Il possède :

- son propre dépôt ;
- son propre fichier `package.json` ;
- sa propre configuration ;
- ses propres dépendances ;
- ses propres tests ;
- ses propres dossiers APEX ;
- ses propres worktrees.

Il ne possède pas :

- de package partagé avec le backend ;
- de workspace commun ;
- de dépendance directe vers le code Hono ;
- de types importés depuis le backend.

## 5.2 Source de vérité

Le contrat OpenAPI publié par le backend constitue la source de vérité pour :

- les endpoints ;
- les paramètres ;
- les réponses ;
- les erreurs ;
- les enums ;
- les règles de pagination ;
- les filtres ;
- les transitions disponibles.

---

# 6. STACK TECHNIQUE

## 6.1 Technologies obligatoires

- SvelteKit ;
- Svelte ;
- TypeScript ;
- Bun ;
- Tailwind CSS ;
- Shadcn-Svelte ;
- Lucide Svelte ;
- TanStack Table ;
- Zod ;
- bibliothèque de graphiques compatible avec Shadcn-Svelte ;
- Playwright ;
- Vitest.

## 6.2 Technologies facultatives

Selon les besoins validés :

- génération de client OpenAPI ;
- mocks réseau ;
- Storybook ou route interne de design system ;
- bibliothèque de gestion de formulaires compatible Svelte ;
- outil de tests d’accessibilité.

## 6.3 Interdictions

Ne pas ajouter sans validation :

- une seconde bibliothèque de composants ;
- Bootstrap ;
- Material UI ;
- DaisyUI ;
- Chakra UI ;
- une bibliothèque de thème parallèle ;
- une bibliothèque d’état globale surdimensionnée ;
- des dépendances uniquement décoratives.

---

# 7. INITIALISATION

## 7.1 Création du projet

Le projet doit être initialisé avec le CLI officiel Svelte.

Options attendues :

- SvelteKit ;
- TypeScript ;
- Bun ;
- ESLint ;
- Prettier ;
- Tailwind CSS ;
- Playwright ;
- Vitest.

Le squelette du projet ne doit pas être créé manuellement.

## 7.2 Initialisation de Shadcn-Svelte

Shadcn-Svelte doit être initialisé avec son CLI officiel.

Le catalogue officiel des composants doit être installé ou ajouté progressivement selon les features.

## 7.3 Configuration initiale

La configuration initiale doit prévoir :

- alias d’import ;
- variables de thème ;
- styles globaux ;
- mode clair ;
- mode sombre ;
- configuration du client API ;
- configuration des mocks ;
- gestion des erreurs ;
- route interne de design system.

---

# 8. STRUCTURE DES DOSSIERS

```text
src/
├── app.html
├── app.d.ts
├── hooks.client.ts
├── hooks.server.ts
│
├── lib/
│   ├── api/
│   ├── auth/
│   ├── components/
│   │   ├── ui/
│   │   ├── material/
│   │   ├── layout/
│   │   ├── patterns/
│   │   └── features/
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── candidates/
│   │   ├── organizations/
│   │   ├── offers/
│   │   ├── applications/
│   │   ├── interviews/
│   │   ├── conventions/
│   │   ├── internships/
│   │   ├── reports/
│   │   ├── resources/
│   │   ├── mentorship/
│   │   ├── statistics/
│   │   └── administration/
│   │
│   ├── mocks/
│   ├── schemas/
│   ├── stores/
│   ├── types/
│   ├── utils/
│   └── config/
│
├── routes/
│   ├── (public)/
│   ├── (auth)/
│   ├── (candidate)/
│   ├── (company)/
│   ├── (institution)/
│   ├── (administration)/
│   └── (internal)/
│
├── styles/
│   ├── app.css
│   ├── theme.css
│   ├── material.css
│   └── typography.css
│
└── tests/
```

---

# 9. ORGANISATION DES COMPOSANTS

## 9.1 `components/ui`

Ce dossier contient exclusivement les composants Shadcn-Svelte générés par le CLI.

Les composants ne doivent pas être profondément modifiés.

Les modifications autorisées concernent :

- les imports ;
- la compatibilité du projet ;
- les variables du thème ;
- des corrections nécessaires ;
- des variantes prévues par le projet.

## 9.2 `components/material`

Ce dossier contient les recettes visuelles du Windowed Material System.

Composants attendus :

- `WindowSurface`
- `WindowHeader`
- `WindowBody`
- `WindowFooter`
- `PanelSurface`
- `FloatingSurface`
- `InsetSurface`
- `DocumentPreviewWindow`

## 9.3 `components/layout`

Composants attendus :

- `AppShell`
- `PublicShell`
- `CandidateShell`
- `CompanyShell`
- `InstitutionShell`
- `AdministrationShell`
- `SidebarNavigation`
- `MobileNavigation`
- `Topbar`
- `UserMenu`
- `PageContainer`

## 9.4 `components/patterns`

Composants attendus :

- `PageHeader`
- `PageToolbar`
- `DataTableToolbar`
- `FilterPanel`
- `SearchField`
- `PaginationControls`
- `ColumnVisibilityMenu`
- `BulkActionBar`
- `AsyncBoundary`
- `LoadingState`
- `EmptyState`
- `FilteredEmptyState`
- `ErrorState`
- `ForbiddenState`
- `OfflineState`
- `FormSection`
- `FormActions`
- `ConfirmActionDialog`
- `DetailDrawer`
- `MasterDetailWorkspace`
- `SplitWorkspace`
- `StatusTimeline`

## 9.5 `components/features`

Ce dossier contient les composants liés aux domaines métier.

Exemples :

- `OfferCard`
- `OfferFilters`
- `CandidateProfileSummary`
- `ApplicationStatusBadge`
- `ConventionProgress`
- `OrganizationPreview`
- `InternshipTimeline`
- `StatisticsSummary`

---

# 10. WINDOWED MATERIAL SYSTEM

## 10.1 Définition

Le Windowed Material System est le langage visuel principal de PNGS-IE.

Il est inspiré de la construction visuelle des fenêtres macOS :

- contour externe ;
- bordure ;
- ring fin ;
- liseré intérieur ;
- ombre diffuse ;
- ombre de contact ;
- barre supérieure ;
- surfaces translucides limitées ;
- séparation claire entre niveaux.

Il ne doit pas simuler un système d’exploitation.

## 10.2 Niveaux de surfaces

### Canvas

Fond général.

Usage :

- fond de page ;
- espace autour des surfaces ;
- fond public.

### Panel

Surface secondaire simple.

Usage :

- statistiques ;
- états ;
- sections courtes ;
- informations secondaires.

### Window

Surface principale.

Usage :

- Data Table ;
- formulaire principal ;
- détail d’une offre ;
- profil ;
- convention ;
- dashboard ;
- workspace.

### Floating

Surface temporaire.

Usage :

- Dialog ;
- Alert Dialog ;
- Drawer ;
- Sheet ;
- Popover ;
- Dropdown Menu ;
- Command ;
- Date Picker.

### Inset

Surface intégrée ou enfoncée.

Usage :

- toolbar ;
- filtres ;
- recherche ;
- zone de dépôt ;
- métadonnées ;
- aperçu secondaire.

---

# 11. RÈGLES DE MATÉRIALITÉ

## 11.1 Fenêtre principale

Une `WindowSurface` doit inclure :

- fond utilisant `card` ;
- bordure utilisant `border` ;
- ring très fin ;
- rayon centralisé ;
- liseré intérieur ;
- ombre de profondeur ;
- ombre de contact ;
- contenu clipsé ;
- barre supérieure facultative.

## 11.2 Surface flottante

Une `FloatingSurface` doit inclure :

- fond utilisant `popover` ;
- bordure ;
- ring ;
- ombre plus profonde ;
- blur facultatif ;
- contraste supérieur à la fenêtre.

## 11.3 Sidebar

La sidebar doit rester plus plate.

Elle doit utiliser :

- les tokens `sidebar` ;
- une séparation ;
- une sélection discrète ;
- aucun contour de carte pour chaque élément.

## 11.4 Densité

Une page ne doit normalement pas dépasser :

- une fenêtre principale ;
- deux surfaces secondaires importantes ;
- trois niveaux d’élévation ;
- un gradient décoratif majeur.

---

# 12. THÈME ET COULEURS

## 12.1 Tokens autorisés

Le frontend doit utiliser les tokens Shadcn-Svelte :

- background ;
- foreground ;
- card ;
- card-foreground ;
- popover ;
- popover-foreground ;
- primary ;
- primary-foreground ;
- secondary ;
- secondary-foreground ;
- muted ;
- muted-foreground ;
- accent ;
- accent-foreground ;
- destructive ;
- border ;
- input ;
- ring ;
- chart ;
- sidebar.

## 12.2 Couleurs directes

Les couleurs directes sont interdites dans les composants fonctionnels.

Exceptions :

- logo officiel ;
- illustrations ;
- contrôles décoratifs de prévisualisation ;
- graphiques utilisant les tokens `chart`.

## 12.3 Thèmes

Le frontend doit proposer :

- thème clair ;
- thème sombre ;
- thème système.

Toutes les surfaces doivent être testées dans les trois modes.

---

# 13. SPACING ET ALIGNEMENT

## 13.1 Échelle

Les espacements doivent utiliser l’échelle Tailwind.

Les valeurs arbitraires sont interdites sauf besoin validé.

## 13.2 Règles générales

- mêmes paddings pour les fenêtres équivalentes ;
- mêmes gaps pour les groupes d’actions ;
- largeur maximale cohérente ;
- titres et actions alignés ;
- boutons d’un formulaire alignés ;
- tableaux alignés avec le header ;
- espaces verticaux réguliers ;
- aucune marge compensatoire aléatoire.

## 13.3 Densité des interfaces

Prévoir trois densités éventuelles :

- confortable ;
- standard ;
- compacte.

La densité compacte est réservée aux grandes Data Tables.

---

# 14. TYPOGRAPHIE

## 14.1 Hiérarchie

Prévoir :

- titre de page ;
- titre de fenêtre ;
- titre de section ;
- sous-titre ;
- texte courant ;
- texte secondaire ;
- légende ;
- métadonnée ;
- valeur statistique.

## 14.2 Contraintes

- pas de tailles arbitraires ;
- poids limités ;
- contrastes suffisants ;
- line-height lisible ;
- largeur de lecture contrôlée ;
- labels cohérents.

---

# 15. CATALOGUE SHADCN-SVELTE

Le frontend doit être Shadcn-Svelte driven.

Les composants officiels doivent être utilisés de manière pertinente.

## 15.1 Navigation

- Sidebar ;
- Navigation Menu ;
- Breadcrumb ;
- Tabs ;
- Menubar ;
- Sheet ;
- Drawer ;
- Collapsible ;
- Scroll Area ;
- Resizable.

## 15.2 Actions

- Button ;
- Button Group ;
- Dropdown Menu ;
- Context Menu ;
- Command ;
- Toggle ;
- Toggle Group ;
- Tooltip ;
- Kbd.

## 15.3 Formulaires

- Field ;
- Label ;
- Input ;
- Input Group ;
- Input OTP ;
- Textarea ;
- Checkbox ;
- Radio Group ;
- Select ;
- Native Select ;
- Combobox ;
- Switch ;
- Slider ;
- Calendar ;
- Date Picker ;
- Range Calendar.

## 15.4 Données

- Data Table ;
- Table ;
- Pagination ;
- Badge ;
- Avatar ;
- Progress ;
- Chart ;
- Item ;
- Hover Card.

## 15.5 Feedback

- Alert ;
- Alert Dialog ;
- Empty ;
- Skeleton ;
- Spinner ;
- Sonner ;
- Dialog ;
- Popover.

## 15.6 Contenus

- Card ;
- Accordion ;
- Carousel ;
- Aspect Ratio ;
- Separator ;
- Typography.

---

# 16. LAYOUT PUBLIC

## 16.1 Routes

- `/`
- `/offres`
- `/offres/[id]`
- `/organisations/[id]`
- `/ressources`
- `/a-propos`
- `/connexion`
- `/inscription`

## 16.2 Composition

Le layout public doit contenir :

- logo ;
- Navigation Menu ;
- actions de connexion ;
- contenu ;
- footer ;
- menu mobile ;
- choix de thème.

## 16.3 Page d’accueil

La page doit contenir :

- présentation de la plateforme ;
- recherche d’offres ;
- avantages par acteur ;
- aperçu de l’application ;
- statistiques fictives ou contractuelles ;
- offres récentes ;
- ressources ;
- appels à l’action.

Le hero peut utiliser une grande prévisualisation sous forme de fenêtre.

---

# 17. AUTHENTIFICATION

## 17.1 Pages

- connexion ;
- inscription candidat ;
- inscription entreprise ;
- inscription établissement ;
- mot de passe oublié facultatif ;
- session expirée ;
- accès suspendu.

## 17.2 Exigences

- validation Zod ;
- erreurs par champ ;
- état d’envoi ;
- prévention des doubles envois ;
- visibilité du mot de passe ;
- conservation de l’URL de redirection ;
- message adapté selon le rôle et le statut ;
- support clavier ;
- responsive.

---

# 18. LAYOUT CANDIDAT

## 18.1 Navigation

- tableau de bord ;
- profil ;
- CV ;
- offres ;
- candidatures ;
- entretiens ;
- conventions ;
- stages ;
- rapports ;
- ressources ;
- mentorat ;
- notifications.

## 18.2 Dashboard

Le dashboard doit afficher :

- progression du profil ;
- candidatures récentes ;
- entretiens à venir ;
- conventions en attente ;
- stage actif ;
- ressources recommandées ;
- notifications importantes.

## 18.3 Profil

Sections :

- identité ;
- présentation ;
- formation ;
- compétences ;
- langues ;
- expériences ;
- projets ;
- préférences ;
- établissement.

Exigences :

- progression ;
- Tabs ;
- sauvegarde par section ;
- aperçu ;
- validation ;
- état non sauvegardé.

## 18.4 CV

Fonctions :

- aperçu ;
- sections manquantes ;
- génération ;
- téléchargement ;
- prévisualisation dans `DocumentPreviewWindow`.

## 18.5 Offres

Fonctions :

- recherche ;
- filtres ;
- tri ;
- pagination ;
- vue liste ;
- vue grille ;
- favoris facultatifs ;
- détail ;
- candidature.

## 18.6 Candidatures

Fonctions :

- Data Table ;
- filtres ;
- statut ;
- historique ;
- entretien ;
- retrait ;
- détail ;
- timeline.

## 18.7 Conventions

Fonctions :

- liste ;
- statut ;
- progression ;
- prévisualisation ;
- validation ;
- historique ;
- téléchargement.

## 18.8 Stages et rapports

Fonctions :

- stage actuel ;
- historique ;
- période ;
- entreprise ;
- statut ;
- dépôt de rapport ;
- validation ;
- commentaires.

---

# 19. LAYOUT ENTREPRISE

## 19.1 Navigation

- tableau de bord ;
- organisation ;
- offres ;
- candidatures ;
- entretiens ;
- conventions ;
- stagiaires ;
- rapports ;
- statistiques ;
- paramètres.

## 19.2 Dashboard

Indicateurs :

- offres actives ;
- candidatures reçues ;
- candidatures en revue ;
- entretiens ;
- candidats acceptés ;
- conventions en attente ;
- stagiaires actifs.

## 19.3 Organisation

Fonctions :

- informations générales ;
- logo ;
- secteur ;
- description ;
- contacts ;
- site web ;
- statut de vérification ;
- documents facultatifs.

## 19.4 Offres

Fonctions :

- création ;
- édition ;
- duplication ;
- aperçu ;
- soumission ;
- publication ;
- clôture ;
- archivage ;
- recherche ;
- filtres ;
- actions de masse limitées.

## 19.5 Candidatures

Fonctions :

- Data Table ;
- recherche ;
- filtres ;
- tri ;
- visibilité des colonnes ;
- détail ;
- comparaison ;
- notes internes ;
- transitions ;
- planification d’entretien ;
- acceptation ;
- refus.

Le desktop peut utiliser `SplitWorkspace`.

Le mobile doit utiliser `Drawer`.

## 19.6 Conventions

Fonctions :

- liste ;
- filtres ;
- prévisualisation ;
- validation ;
- versions ;
- historique ;
- téléchargement.

## 19.7 Stagiaires

Fonctions :

- liste ;
- stage ;
- période ;
- statut ;
- rapport ;
- progression.

---

# 20. LAYOUT ÉTABLISSEMENT

## 20.1 Navigation

- tableau de bord ;
- organisation ;
- étudiants ;
- conventions ;
- stages ;
- rapports ;
- statistiques ;
- paramètres.

## 20.2 Étudiants

Fonctions :

- recherche ;
- filtres ;
- Data Table ;
- profil académique ;
- validation du statut ;
- historique de stages ;
- conventions.

## 20.3 Conventions

Fonctions :

- file d’attente ;
- détail ;
- document ;
- validation ;
- historique ;
- téléchargement.

## 20.4 Stages et rapports

Fonctions :

- suivi ;
- filtres ;
- période ;
- entreprise ;
- étudiant ;
- rapport ;
- validation.

---

# 21. LAYOUT ADMINISTRATION

## 21.1 Navigation

- tableau de bord ;
- utilisateurs ;
- organisations ;
- offres ;
- modération ;
- référentiels ;
- ressources ;
- statistiques ;
- audit ;
- paramètres.

## 21.2 Dashboard

Indicateurs :

- utilisateurs ;
- candidats ;
- entreprises ;
- établissements ;
- offres ;
- candidatures ;
- conventions ;
- stages ;
- répartition géographique.

## 21.3 Utilisateurs

Fonctions :

- Data Table ;
- recherche ;
- filtres ;
- rôle ;
- statut ;
- suspension ;
- réactivation ;
- consultation.

## 21.4 Organisations

Fonctions :

- recherche ;
- filtres ;
- vérification ;
- rejet ;
- suspension ;
- réactivation ;
- détail ;
- historique.

## 21.5 Modération

Le workspace doit inclure :

- file d’attente ;
- détails ;
- documents ;
- décision ;
- justification ;
- historique.

## 21.6 Référentiels

Gestion de :

- régions ;
- secteurs ;
- filières ;
- compétences ;
- langues ;
- types d’offres ;
- niveaux d’étude.

## 21.7 Statistiques

Fonctions :

- période ;
- région ;
- secteur ;
- filière ;
- organisation ;
- graphiques ;
- tableaux ;
- export.

---

# 22. DATA TABLES

## 22.1 Fonctionnalités obligatoires

Pour chaque tableau pertinent :

- recherche ;
- filtres ;
- tri ;
- pagination ;
- taille de page ;
- visibilité des colonnes ;
- ordre des colonnes lorsque pertinent ;
- sélection ;
- actions par ligne ;
- actions de masse pertinentes ;
- export éventuel ;
- vue enregistrée éventuelle ;
- état de chargement ;
- état vide ;
- état filtré vide ;
- erreur ;
- réessai.

## 22.2 Paramètres URL

Les paramètres suivants doivent être synchronisables avec l’URL :

- page ;
- taille ;
- recherche ;
- tri ;
- filtres principaux ;
- vue.

## 22.3 Mobile

Sur smartphone :

- affichage en cartes ;
- filtres dans un Sheet ;
- détails dans un Drawer ;
- actions dans un Dropdown Menu ;
- colonnes prioritaires uniquement.

---

# 23. FORMULAIRES

## 23.1 Principes

Chaque formulaire doit gérer :

- état initial ;
- modification ;
- validation ;
- envoi ;
- succès ;
- erreur métier ;
- erreur serveur ;
- sortie non sauvegardée.

## 23.2 Formulaires longs

Utiliser :

- Window principale ;
- navigation de sections ;
- Field ;
- Separator ;
- footer d’actions ;
- aperçu facultatif.

## 23.3 Formulaires courts

Utiliser :

- Dialog ;
- Drawer sur mobile ;
- actions cohérentes ;
- validation locale et serveur.

## 23.4 Actions sensibles

Utiliser Alert Dialog pour :

- suppression ;
- rejet ;
- suspension ;
- clôture ;
- archivage ;
- retrait ;
- changement irréversible.

---

# 24. OVERLAYS

## 24.1 Dialog

Pour :

- création courte ;
- édition courte ;
- détail compact ;
- confirmation non destructive.

## 24.2 Alert Dialog

Pour :

- actions destructives ;
- transitions sensibles ;
- refus ;
- suspension ;
- archivage.

## 24.3 Drawer

Pour :

- détail mobile ;
- historique ;
- formulaire mobile ;
- fiche rapide.

## 24.4 Sheet

Pour :

- navigation mobile ;
- filtres ;
- configuration ;
- panneau latéral.

## 24.5 Règles

- focus trap ;
- fermeture clavier ;
- retour du focus ;
- contenu scrollable ;
- actions visibles ;
- aucun overlay imbriqué inutile.

---

# 25. ÉTATS ASYNCHRONES

Chaque page de données doit prévoir :

- chargement initial ;
- chargement partiel ;
- rafraîchissement ;
- succès ;
- liste vide ;
- résultat filtré vide ;
- erreur réseau ;
- erreur API ;
- accès interdit ;
- session expirée ;
- ressource inexistante ;
- mode hors ligne ;
- réessai.

L’état doit apparaître dans la même surface que le contenu prévu.

---

# 26. CLIENT API

## 26.1 Responsabilités

Le client API doit gérer :

- URL de base ;
- cookies ;
- headers ;
- CSRF ;
- parsing JSON ;
- erreurs standardisées ;
- annulation ;
- réponses sans contenu ;
- redirection sur session expirée ;
- identifiant de requête facultatif.

## 26.2 Organisation

```text
lib/api/
├── client.ts
├── errors.ts
├── auth.api.ts
├── candidates.api.ts
├── organizations.api.ts
├── offers.api.ts
├── applications.api.ts
├── interviews.api.ts
├── conventions.api.ts
├── internships.api.ts
├── reports.api.ts
├── resources.api.ts
├── mentorship.api.ts
├── statistics.api.ts
└── administration.api.ts
```

## 26.3 Interdictions

- aucun `fetch` dupliqué dans les composants ;
- aucune URL codée directement ;
- aucune interprétation locale des erreurs brutes ;
- aucun type `any` pour les contrats principaux.

---

# 27. MOCKS ET FIXTURES

## 27.1 Objectif

Permettre le développement complet d’une feature sans backend disponible.

## 27.2 Scénarios obligatoires

Pour chaque feature :

- succès ;
- chargement ;
- liste vide ;
- filtre vide ;
- erreur validation ;
- erreur métier ;
- erreur réseau ;
- accès interdit ;
- session expirée ;
- pagination ;
- tri ;
- filtres.

## 27.3 Organisation

```text
lib/mocks/
├── handlers/
├── fixtures/
├── factories/
└── scenarios/
```

## 27.4 Règle d’intégration

Le remplacement du mock par l’API réelle ne doit pas modifier les composants métier.

Seul le provider de données ou le client doit changer.

---

# 28. SESSION ET GUARDS

## 28.1 États

Le frontend doit gérer :

- inconnu ;
- chargement ;
- connecté ;
- non connecté ;
- suspendu ;
- organisation non validée ;
- organisation suspendue ;
- mauvais rôle ;
- session expirée.

## 28.2 Guards

Les guards doivent vérifier :

- authentification ;
- rôle ;
- statut ;
- organisation ;
- accès à la route.

## 28.3 Redirections

- utilisateur non connecté vers connexion ;
- mauvais rôle vers son dashboard ;
- compte suspendu vers page dédiée ;
- organisation suspendue vers page dédiée ;
- session expirée vers connexion.

Aucun contenu privé ne doit clignoter avant redirection.

---

# 29. RESPONSIVE DESIGN

## 29.1 Points de contrôle

Tester :

- petit smartphone ;
- smartphone ;
- tablette ;
- ordinateur ;
- grand écran.

## 29.2 Règles

- navigation mobile par Sheet ;
- tables transformées en cartes ;
- Dialog transformable en Drawer ;
- filtres regroupés ;
- actions principales accessibles ;
- aucun débordement incontrôlé ;
- taille tactile suffisante ;
- textes lisibles ;
- formulaires en une colonne sur mobile.

---

# 30. ACCESSIBILITÉ

## 30.1 Exigences

- navigation clavier ;
- focus visible ;
- labels ;
- erreurs reliées aux champs ;
- contraste ;
- rôles ARIA ;
- titres structurés ;
- overlays accessibles ;
- textes alternatifs ;
- composants décoratifs masqués ;
- reduced motion.

## 30.2 Règle de matérialité

Les ombres, transparences et rings décoratifs ne doivent jamais masquer le focus fonctionnel.

---

# 31. MOTION

## 31.1 Autorisé

- ouverture des overlays ;
- Sheet ;
- Drawer ;
- sidebar ;
- onglets ;
- skeleton ;
- changement d’état ;
- variation légère d’ombre.

## 31.2 Interdit

- fenêtres déplaçables ;
- minimisation ;
- dock ;
- rebond ;
- parallaxe excessive ;
- gradient animé permanent ;
- déplacement important au survol ;
- animation purement décorative répétitive.

---

# 32. ROUTE INTERNE DESIGN SYSTEM

Une route interne doit présenter :

- tous les composants Shadcn ;
- modes clair et sombre ;
- Panel ;
- Window ;
- Floating ;
- Inset ;
- Data Tables ;
- formulaires ;
- overlays ;
- états ;
- gradients ;
- densités ;
- typographie ;
- responsive.

Route suggérée :

```text
/internal/design-system
```

Cette route doit être désactivée ou protégée dans la version finale.

---

# 33. USER STORIES TRANSVERSALES

## US-FE-001 — Navigation par rôle

En tant qu’utilisateur, je veux disposer d’une navigation adaptée à mon rôle afin d’accéder uniquement aux fonctionnalités pertinentes.

### Critères d’acceptation

- le menu dépend du rôle ;
- la route active est visible ;
- la navigation mobile fonctionne ;
- aucune entrée non autorisée n’est affichée ;
- les guards restent actifs.

## US-FE-002 — Hiérarchie des surfaces

En tant qu’utilisateur, je veux distinguer la surface principale, les panneaux secondaires et les overlays.

### Critères d’acceptation

- une fenêtre principale identifiable ;
- surfaces secondaires plus plates ;
- overlays au-dessus ;
- toolbar intégrée ;
- aucune concurrence visuelle excessive.

## US-FE-003 — Gestion des listes

En tant qu’utilisateur, je veux rechercher, filtrer, trier et paginer les listes.

### Critères d’acceptation

- recherche ;
- filtres ;
- tri ;
- pagination ;
- colonnes ;
- état vide ;
- mobile.

## US-FE-004 — Gestion des erreurs

En tant qu’utilisateur, je veux comprendre les erreurs et pouvoir reprendre mon action.

### Critères d’acceptation

- message clair ;
- aucune erreur technique brute ;
- action de réessai ;
- erreurs de champs ;
- redirection adaptée.

## US-FE-005 — Utilisation sans backend

En tant que développeur frontend, je veux développer une feature avec des mocks afin de ne pas dépendre de l’avancement backend.

### Critères d’acceptation

- contrat disponible ;
- fixtures ;
- scénarios ;
- mock ;
- remplacement sans réécriture.

## US-FE-006 — Thème clair et sombre

En tant qu’utilisateur, je veux utiliser le thème de mon choix.

### Critères d’acceptation

- clair ;
- sombre ;
- système ;
- persistance ;
- surfaces lisibles ;
- contraste acceptable.

---

# 34. WORKFLOW APEX

## 34.1 Règle principale

Une feature correspond à :

- un worktree ;
- une branche ;
- un dossier APEX ;
- un scope limité ;
- des critères d’acceptation ;
- des mocks ;
- des tests ;
- une validation visuelle.

## 34.2 Dossier

```text
.claude/output/apex/{feature-id}/
```

## 34.3 Interdictions

Une tâche APEX frontend ne doit pas :

- modifier le backend ;
- modifier une autre feature sans nécessité ;
- ajouter un endpoint ;
- changer un contrat validé ;
- inventer une surface ;
- créer sa propre palette ;
- modifier les composants UI sans justification.

---

# 35. DÉCOUPAGE APEX RECOMMANDÉ

## FE-00 — Initialisation

- SvelteKit ;
- Bun ;
- Tailwind ;
- Shadcn-Svelte ;
- lint ;
- tests.

## FE-01 — Windowed Material Foundation

- tokens ;
- surfaces ;
- ombres ;
- rings ;
- bordures ;
- gradients ;
- route design system.

## FE-02 — Catalogue Shadcn

- installation ;
- validation ;
- documentation d’usage.

## FE-03 — Layouts

- public ;
- candidat ;
- entreprise ;
- établissement ;
- administration.

## FE-04 — Session et guards

- authentification ;
- rôles ;
- statuts ;
- redirections.

## FE-05 — API client et mocks

- client ;
- erreurs ;
- providers ;
- fixtures.

## FE-06 — Data Table System

- toolbar ;
- recherche ;
- filtres ;
- tri ;
- colonnes ;
- pagination ;
- mobile.

## FE-07 — Form System

- champs ;
- sections ;
- validation ;
- actions ;
- Dialog ;
- Drawer ;
- Alert Dialog.

## FE-08 — Site public

- accueil ;
- offres ;
- détails ;
- organisations ;
- authentification.

## FE-09 — Espace candidat

À diviser en plusieurs features :

- dashboard ;
- profil ;
- CV ;
- offres ;
- candidatures ;
- conventions ;
- stages ;
- rapports.

## FE-10 — Espace entreprise

À diviser en plusieurs features :

- dashboard ;
- organisation ;
- offres ;
- candidatures ;
- entretiens ;
- conventions ;
- stagiaires.

## FE-11 — Espace établissement

À diviser en plusieurs features :

- dashboard ;
- étudiants ;
- conventions ;
- stages ;
- rapports.

## FE-12 — Administration

À diviser en plusieurs features :

- dashboard ;
- utilisateurs ;
- organisations ;
- modération ;
- référentiels ;
- statistiques ;
- audit.

## FE-13 — Ressources et mentorat

- catalogue ;
- détail ;
- demandes ;
- suivi.

## FE-14 — Responsive et accessibilité

- mobile ;
- clavier ;
- contrastes ;
- reduced motion.

## FE-15 — Intégration API

- remplacement des mocks ;
- tests contractuels ;
- corrections d’écarts.

---

# 36. TESTS

## 36.1 Tests unitaires

Tester :

- utilitaires ;
- schémas ;
- mappings ;
- stores ;
- formatage ;
- permissions d’affichage.

## 36.2 Tests composants

Tester prioritairement :

- WindowSurface ;
- AsyncBoundary ;
- DataTableToolbar ;
- ColumnVisibilityMenu ;
- ConfirmActionDialog ;
- DetailDrawer ;
- FormSection ;
- StatusTimeline.

## 36.3 Tests end-to-end

Tester :

- connexion ;
- redirection par rôle ;
- profil candidat ;
- recherche d’offres ;
- candidature ;
- création d’offre ;
- traitement d’une candidature ;
- convention ;
- validation établissement ;
- modération administrative ;
- erreurs ;
- session expirée ;
- mobile.

## 36.4 Tests visuels

Vérifier :

- clair ;
- sombre ;
- responsive ;
- profondeur des surfaces ;
- cohérence des ombres ;
- alignement ;
- absence de débordement ;
- états vides ;
- skeletons ;
- overlays.

---

# 37. CRITÈRES DE RECETTE D’UNE PAGE

Chaque page doit respecter la checklist suivante :

- le layout correct est utilisé ;
- le rôle est vérifié ;
- le statut est vérifié ;
- la surface principale est identifiable ;
- les actions sont alignées ;
- le chargement est traité ;
- l’erreur est traitée ;
- l’état vide est traité ;
- le responsive est traité ;
- les composants Shadcn sont utilisés ;
- aucune couleur directe inutile ;
- aucune ombre locale arbitraire ;
- aucun `fetch` brut dupliqué ;
- les filtres fonctionnent ;
- la pagination fonctionne ;
- les overlays sont accessibles ;
- le thème sombre fonctionne ;
- les tests passent.

---

# 38. DEFINITION OF READY

Une feature frontend peut être lancée lorsque :

- son périmètre est défini ;
- les routes sont identifiées ;
- les user stories sont écrites ;
- les critères d’acceptation sont disponibles ;
- le contrat API est disponible ;
- les types sont connus ;
- les erreurs sont connues ;
- les permissions sont définies ;
- les mocks peuvent être créés ;
- la dépendance à une autre feature est connue.

---

# 39. DEFINITION OF DONE

Une feature frontend est terminée lorsque :

- le plan APEX est validé ;
- le scope est respecté ;
- les composants Shadcn sont utilisés ;
- les surfaces officielles sont utilisées ;
- les mocks fonctionnent ;
- tous les états sont gérés ;
- le responsive fonctionne ;
- le thème sombre fonctionne ;
- les tests passent ;
- le build passe ;
- le lint passe ;
- le typecheck passe ;
- les critères d’acceptation passent ;
- aucun problème critique d’accessibilité ;
- aucun constat critique APEX ;
- aucun changement backend ;
- aucune rupture de contrat.

---

# 40. LIVRABLES

Le projet frontend doit livrer :

- dépôt SvelteKit ;
- configuration Bun ;
- thème Shadcn-Svelte ;
- catalogue de composants ;
- Windowed Material System ;
- layouts ;
- composants patterns ;
- composants métier ;
- routes ;
- client API ;
- mocks ;
- fixtures ;
- tests ;
- documentation des composants ;
- documentation des features ;
- route design system ;
- sorties APEX ;
- rapport de recette frontend.

---

# 41. PHASAGE

## Phase 1 — Fondation

- initialisation ;
- thème ;
- Shadcn ;
- Windowed Material System ;
- design system.

## Phase 2 — Architecture

- layouts ;
- navigation ;
- guards ;
- client API ;
- mocks.

## Phase 3 — Systèmes réutilisables

- Data Tables ;
- formulaires ;
- overlays ;
- états ;
- feedback.

## Phase 4 — Site public

- accueil ;
- offres ;
- organisation ;
- authentification.

## Phase 5 — Candidat

- dashboard ;
- profil ;
- CV ;
- candidatures ;
- conventions ;
- stages.

## Phase 6 — Entreprise

- dashboard ;
- offres ;
- candidatures ;
- entretiens ;
- conventions ;
- stagiaires.

## Phase 7 — Établissement

- étudiants ;
- conventions ;
- stages ;
- rapports.

## Phase 8 — Administration

- utilisateurs ;
- organisations ;
- modération ;
- référentiels ;
- statistiques.

## Phase 9 — Intégration

- API réelle ;
- conformité contrat ;
- tests end-to-end.

## Phase 10 — Finalisation

- responsive ;
- accessibilité ;
- performances ;
- validation visuelle ;
- soutenance.

---

# 42. CRITÈRES DE VALIDATION FINALE

Le frontend PNGS-IE est validé si :

- les cinq contextes d’utilisation sont disponibles ;
- les espaces utilisent des layouts distincts ;
- Shadcn-Svelte pilote l’interface ;
- le catalogue officiel est exploité de manière pertinente ;
- le Windowed Material System est centralisé ;
- les couleurs restent gouvernées par le thème ;
- les fenêtres n’imitent pas un système d’exploitation ;
- les tableaux sont complets ;
- les formulaires sont uniformes ;
- tous les états sont gérés ;
- le frontend fonctionne avec des mocks ;
- l’intégration API ne nécessite pas une réécriture ;
- le mode clair fonctionne ;
- le mode sombre fonctionne ;
- le mobile fonctionne ;
- les tests passent ;
- chaque feature dispose d’un dossier APEX ;
- aucune feature frontend n’a compromis l’architecture backend.

---

# 43. DÉCISION FINALE

Le frontend PNGS-IE sera une application :

- SvelteKit ;
- TypeScript ;
- Bun ;
- Shadcn-Svelte driven ;
- contract-first ;
- mock-first ;
- responsive ;
- accessible ;
- structurée par rôles ;
- développée feature par feature avec APEX ;
- visuellement fondée sur un Windowed Material System inspiré de la profondeur des fenêtres macOS ;
- sans imitation littérale de macOS ;
- sans personnalisation excessive du thème ;
- sans dépendance directe au backend.
