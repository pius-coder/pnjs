# PNGS‑IE — Pack de planification

Ce paquet contient :

- `CAHIER_IMPLEMENTATION_PNGS_IE.md` : cahier complet ;
- `APEX_BACKLOG_PNGS_IE.md` : séquence de tâches exécutable par flows.

## Utilisation avec APEX

Exemple :

```text
/apex -a -s Implémenter L0-C01 du cahier PNGS-IE
```

Puis :

```text
/apex -a -s Implémenter F00-B01
/apex -a -s Implémenter F00-F01
```

Les pistes backend (`B`) et frontend (`F`) peuvent avancer en parallèle lorsque la tâche contrat (`C`) est terminée.

## Principe

Le backlog n’organise pas le projet par endpoints isolés. Chaque groupe livre un flow métier démontrable.
