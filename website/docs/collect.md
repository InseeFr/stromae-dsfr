---
sidebar_position: 2
---

# Mode de collecte (en cours)

Utilisé pour les collectes web des enquêtes auprès des ménages et des entreprises

## Récupération des ressources

- récupération de l'unité enquêtée depuis l'indexDB
- récupération du modèle de questionnaire depuis l'indexDB
- récupération de toutes les nomenclatures associées au modèle de questionnaire depuis l'indexDB

## Cas d'erreur

Au chargement du questionnaire, une page d'erreur explicite s'affiche dans les cas suivants :

- une des ressources récupérées ne respecte pas le format attendu
- l'unité enquêtée n'a pas pu être récupérée
- le modèle de questionnaire n'a pas pu être récupéré
- l'unité enquêtée `surveyUnitId` n'est pas associée au modèle de questionnaire `questionnaireId`

## Persistance

La persistance des données s'effectue à chaque changement de page du questionnaire, quel que soit le moyen de navigation.
