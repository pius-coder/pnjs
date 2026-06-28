# Backend DOX

## Purpose

Le dossier `backend/` possède le serveur Bun/Elysia, les contrats HTTP, les règles métier serveur, la persistance et les migrations SQLite/MySQL.

## Ownership

Capacités actuelles à indexer à partir du code réel :

- bootstrap Elysia : à localiser ;
- configuration d'environnement : à localiser ;
- connexion SQLite/MySQL : à localiser ;
- migrations : à localiser ;
- authentification et autorisation : à localiser si présentes ;
- autres capacités métier : à ajouter ici lors de leur découverte ou création.

Pour chaque capacité durable, utiliser ce format compact :

```
### domaine.capacite
- Source: chemin
- Entry anchors: symbole, route ou région
- Contract: comportement durable
- Storage: tables ou ressources importantes, si pertinent
- Depends on: dépendances durables directes
- Verification: commande ou test ciblé existant
```

Ne pas conserver les marqueurs `à localiser` après le premier indexage réel.

## Local Contracts

- Utiliser Bun comme runtime et gestionnaire de paquets.
- Utiliser Elysia pour les routes et contrats HTTP.
- Garder SQLite et MySQL compatibles uniquement lorsque le projet l'exige réellement.
- Le SQL commun doit rester dans le sous-ensemble compatible ; isoler les différences de dialecte.
- Les migrations représentent le même changement logique dans chaque dialecte supporté.
- Une route valide l'entrée, applique les règles et retourne un contrat explicite.
- Les erreurs exposées au client ne doivent pas divulguer de stack, secret ou détail SQL.
- Ne pas créer une couche ou un fichier uniquement pour imiter NestJS.
- Garder ensemble les éléments qui sont habituellement lus et modifiés ensemble.
- Séparer les zones qui changent indépendamment ou qui imposent trop de contexte non pertinent.
- Utiliser des symboles stables et, si nécessaire, des régions sémantiques légères pour rendre les zones localisables.
- Ne jamais prendre un numéro de ligne comme identifiant durable.
- Toute nouvelle capacité ou modification de contrat doit être reflétée dans la carte ci-dessus.
- Les détails purement internes peuvent laisser ce document inchangé après contrôle.

## Work Guidance

Avant de lire du code :

1. identifier la capacité dans `Ownership` ;
2. rechercher ses ancres ;
3. lire les corps des symboles ciblés et leurs dépendances directes ;
4. lire l'enregistrement Elysia seulement si le routage ou l'inférence de type change ;
5. lire la couche SQL pertinente seulement si la persistance change ;
6. lire les tests associés.

Lire un fichier complet seulement si :

- il est petit ;
- son bootstrap global change ;
- les imports/exports sont restructurés ;
- aucune ancre stable ne permet d'isoler la modification ;
- la relation entre plusieurs zones reste ambiguë après lecture ciblée.

## Verification

Adapter aux scripts réellement présents. Ordre recommandé :

```bash
bun run check
bun test
```

Pour une capacité localisée, exécuter d'abord son test ciblé, puis les vérifications plus larges nécessaires.

Les migrations doivent être testées sur chaque dialecte réellement pris en charge avant livraison.

## Child DOX Index

Aucun enfant n'est imposé.

Créer un `AGENTS.md` enfant seulement lorsqu'un sous-dossier devient une frontière durable avec ses propres responsabilités, contrats ou vérifications. Mettre alors cet index à jour.
