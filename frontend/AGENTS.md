# Frontend DOX

## Purpose

Le dossier `frontend/` possède l'application SvelteKit/Vite, les routes d'interface, l'état UI, les composants partagés et l'accès à l'API.

## Ownership

Capacités actuelles à indexer à partir du code réel :

- layout global SvelteKit : à localiser ;
- routes publiques : à localiser ;
- routes authentifiées : à localiser si présentes ;
- client API : à localiser ;
- composants réellement partagés : à localiser ;
- autres capacités UI : à ajouter ici lors de leur découverte ou création.

Pour chaque capacité durable, utiliser ce format compact :

```
### domaine.capacite
- Route/source: chemin
- Entry anchors: composant, load function, action ou helper
- Contract: comportement utilisateur durable
- API dependency: endpoint ou client concerné
- Verification: commande ou test ciblé existant
```

Ne pas conserver les marqueurs `à localiser` après le premier indexage réel.

## Local Contracts

- Utiliser les conventions de routage SvelteKit.
- Utiliser Vite via la configuration SvelteKit existante.
- Garder la logique locale dans la route ou le composant tant qu'elle n'est pas réellement partagée.
- Extraire un composant ou helper lorsque plusieurs zones le consomment ou lorsque son contexte devient autonome.
- Ne pas créer de dossiers `services`, `repositories`, `view-models` ou `controllers` sans nécessité démontrée.
- Ne pas dupliquer les types de l'API lorsque le client typé existant peut les fournir.
- Ne jamais exposer de secret serveur dans du code envoyé au navigateur.
- Distinguer explicitement le code serveur SvelteKit du code navigateur.
- Toute modification de route, comportement utilisateur durable ou contrat API doit être reflétée dans la carte ci-dessus.
- Les détails visuels ou refactorings internes peuvent laisser ce document inchangé après contrôle.

## Work Guidance

Avant de lire du code :

1. identifier la route ou capacité dans `Ownership` ;
2. rechercher le composant, `load`, action ou client API indiqué ;
3. lire les dépendances directes et les composants réellement affectés ;
4. lire le layout global uniquement si le changement est transversal ;
5. lire les tests ou scénarios associés.

Éviter de parcourir toutes les routes SvelteKit lorsqu'une seule capacité est ciblée.

## Verification

Adapter aux scripts réellement présents. Ordre recommandé :

```bash
bun run check
bun test
bun run build
```

Exécuter d'abord la vérification ciblée, puis le build lorsque le routage, le rendu serveur ou le contrat de compilation change.

## Child DOX Index

Aucun enfant n'est imposé.

Créer un enfant uniquement pour une frontière durable possédant ses propres règles, contrats ou vérifications.
