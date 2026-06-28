# DOX framework

- DOX is highly performant AGENTS.md hierarchy installed here
- Agent must follow DOX instructions across any edits

## Ownership

- `backend/` possède l'API, les règles serveur, la persistance et les migrations.
- `frontend/` possède l'interface SvelteKit, les routes UI et l'intégration avec l'API.
- `.opencode/skills/workflow-apex/` possède le workflow APEX.
- `.opencode/plugins/` possède les plugins opencode (auto-découverts).
- `.opencode/commands/apex.md` expose la commande `/apex`.
- `contract.ts` possède les types partagés (rôles, statuts, formats API) — aucune dépendance Svelte/Elysia.
- Git possède l'historique ; les `AGENTS.md` ne doivent contenir aucun journal de changements.

## Core Contract

- AGENTS.md files are binding work contracts for their subtrees
- Work products, source materials, instructions, records, assets, and durable docs must stay understandable from the nearest applicable AGENTS.md plus every parent AGENTS.md above it

## Read Before Editing

1. Read the root AGENTS.md
2. Identify every file or folder you expect to touch
3. Walk from the repository root to each target path
4. Read every AGENTS.md found along each route
5. If a parent AGENTS.md lists a child AGENTS.md whose scope contains the path, read that child and continue from there
6. Use the nearest AGENTS.md as the local contract and parent docs for repo-wide rules
7. If docs conflict, the closer doc controls local work details, but no child doc may weaken DOX

Do not rely on memory. Re-read the applicable DOX chain in the current session before editing.

## Local Contracts

- Lire ce fichier avant toute analyse ou modification.
- Identifier tous les chemins probablement touchés.
- Pour chaque chemin, lire chaque AGENTS.md applicable depuis la racine jusqu'au propriétaire le plus proche.
- Utiliser DOX pour localiser les capacités, fichiers, ancres et vérifications.
- Vérifier chaque pointeur DOX dans le code avant de le considérer comme vrai.
- Le code prévaut en cas de divergence ; la divergence DOX doit être corrigée au closeout.
- Ne pas lire un fichier entier par défaut.
- Localiser d'abord les symboles, routes, régions ou tests pertinents, puis lire les plages nécessaires.
- Élargir progressivement le contexte seulement lorsqu'une dépendance reste inconnue.
- Organiser les modifications par capacité ou surface sémantique, pas par couches artificielles.
- Chaque passage APEX se termine par une réconciliation DOX fondée sur le diff Git réel.
- DOX doit être modifié uniquement lorsque l'état durable, les responsabilités, chemins, contrats, workflows ou vérifications changent.
- Supprimer immédiatement les références obsolètes ; ne jamais expliquer leur historique.

## Update After Editing

Every meaningful change requires a DOX pass before the task is done.

Update the closest owning AGENTS.md when a change affects:

- purpose, scope, ownership, or responsibilities
- durable structure, contracts, workflows, or operating rules
- required inputs, outputs, permissions, constraints, side effects, or artifacts
- user preferences about behavior, communication, process, organization, or quality
- AGENTS.md creation, deletion, move, rename, or index contents

Update parent docs when parent-level structure, ownership, workflow, or child index changes. Update child docs when parent changes alter local rules. Remove stale or contradictory text immediately. Small edits that do not change behavior or contracts may leave docs unchanged, but the DOX pass still must happen.

## Hierarchy

- Root AGENTS.md is the DOX rail: project-wide instructions, global preferences, durable workflow rules, and the top-level Child DOX Index
- Child AGENTS.md files own domain-specific instructions and their own Child DOX Index
- Each parent explains what its direct children cover and what stays owned by the parent
- The closer a doc is to the work, the more specific and practical it must be

## Child Doc Shape

- Create a child AGENTS.md when a folder becomes a durable boundary with its own purpose, rules, responsibilities, workflow, materials, or quality standards
- Work Guidance must reflect the current standards of the project or user instructions; if there are no specific standards or instructions yet, leave it empty
- Verification must reflect an existing check; if no verification framework exists yet, leave it empty and update it when one exists

Default section order:
- Purpose
- Ownership
- Local Contracts
- Work Guidance
- Verification
- Child DOX Index

## Work Guidance

### Navigation

1. Lire le Child DOX Index ci-dessous.
2. Choisir le propriétaire probable.
3. Lire le document enfant.
4. Utiliser ses capacités et ancres pour rechercher le code.
5. Lire les surfaces minimales suffisantes.
6. Suivre les dépendances directes une étape à la fois.

### Modification surface

Une surface de modification comprend au minimum :
- la capacité ciblée ;
- le ou les symboles d'entrée ;
- les contrats consommés ;
- les fonctions directement appelées ;
- les imports et exports touchés ;
- les tests affectés ;
- les documents DOX propriétaires.

### Documentation

Documenter uniquement :
- les responsabilités durables ;
- les capacités actuelles ;
- les chemins propriétaires ;
- les ancres stables ;
- les contrats et contraintes ;
- les vérifications existantes.

Ne pas documenter :
- les numéros de ligne ;
- chaque helper privé ;
- chaque test individuel ;
- les détails évidents du code ;
- les anciennes architectures ;
- la chronologie des changements.

## Style

- Keep docs concise, current, and operational
- Document stable contracts, not diary entries
- Put broad rules in parent docs and concrete details in child docs
- Prefer direct bullets with explicit names
- Do not duplicate rules across many files unless each scope needs a local version
- Delete stale notes instead of explaining history
- Trim obvious statements, repeated rules, misplaced detail, and warnings for risks that no longer exist

## Closeout

1. Re-check changed paths against the DOX chain
2. Update nearest owning docs and any affected parents or children
3. Refresh every affected Child DOX Index
4. Remove stale or contradictory text
5. Run existing verification when relevant
6. Report any docs intentionally left unchanged and why

## User Preferences

When the user requests a durable behavior change, record it here or in the relevant child AGENTS.md

## APEX Workflow

This project uses the APEX skill (`.opencode/skills/workflow-apex/`) for structured implementation. APEX follows DOX as its primary navigation contract — read this AGENTS.md chain before `/apex` commands.

## Child DOX Index

- `backend/AGENTS.md` — API Bun/Elysia, persistance SQLite/MySQL, migrations, auth et règles serveur.
- `frontend/AGENTS.md` — SvelteKit/Vite, routes UI, composants partagés et client API.
- `pngs-ie-implementation/` — Cahier des charges PNGS‑IE, backlog APEX et spécifications fonctionnelles. Lire avant toute implémentation de flow.
