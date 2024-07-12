---
sidebar_position: 3
---

# Visualisation de questionnaire

La page de visualisation de questionnaire permet de visualiser n'importe quel questionnaire fourni par l'utilisateur, sans communication avec l'api.

## Formulaire de visualisation

Un formulaire propose de renseigner :

- l'url d'un modèle de questionnaire => obligatoire
- l'url de données pour simuler un questionnaire vierge ou pré-rempli (données externes, données collectées) => non obligatoire
- une liste de nomenclatures associées au questionnaire pour permettre la recherche sur liste => non obligatoire
  - format exemple : ["pays":"http://....", "communes":"http://...."] où pays et communes sont les identifiants des nomenclatures utilisées par les suggesters
- lecture seule : permet de visualiser le questionnaire en lecture plutôt qu'en écriture

## Visualisation du questionnaire

La validation du formulaire renvoie vers le mode de visualisation de l'orchestrateur de questionnaire, en tenant compte des paramètres fournis

L'ensemble des paramètres sont inscrits dans l'url, il est donc possible de la partager pour réouvrir le questionnaire avec un contexte identique sans repasser par le remplissage du formulaire.

## Cas d'erreur

A la validation du formulaire, l'application renvoie vers une page d'erreur si le questionnaire n'a pas pu être récupéré, ou qu'il ne respecte pas le format attendu.

Si les données de réponse n'ont pas pu être récupérées, ou qu'elles ne respectent pas le format attendu, on ouvre le questionnaire comme s'il n'y avait pas de données renseignées. Il en est de même pour chacune des nomenclatures renseignées.
