---
sidebar_position: 2
---

# Collecte

La collecte des données est le contexte le plus important de l'application. C'est dans ce contexte que l'application est utilisée principalement, permettant d'assurer la collecte web des enquêtes auprès des ménages et des entreprises de l'Insee et de ses partenaires.

Ce contexte est disponible sur la route suivante : `/questionnaire/$questionnaireId/unite-enquetee/$interrogationId`

## Communication avec l'API

Les données nécessaires à la collecte sont directement récupérées depuis l'API [Queen-Back-Office](https://github.com/inseeFr/queen-back-office).

Pour ce faire, les endpoints suivants sont utilisés avec la méthode GET :

- Pour les questionnaires : `/api/questionnaire/${questionnaireId}/data`
- Pour les données : `/api/survey-unit/${interrogationId}`
- Pour les métadonnées : `/api/survey-unit/${interrogationId}/metadata`
- Pour chaque nomenclature : `/api/nomenclature/${id}`

Pour la persistance, nous utilisons la méthode PATCH sur l'endpoint suivant : `/api/survey-unit/${interrogationId}`.

Les données persistées incluent les données collectées dans le questionnaire ainsi que des états contenant la `page` sur laquelle l'utilisateur se trouve, accompagnées de la date (un timestamp) et d'un état de la donnée, qui est "INIT" la plupart du temps sauf une fois que le questionnaire a été validé, où il passe à "VALIDATED".

À chaque changement de page, les nouvelles données accompagnées des états associés sont persistées.

## Gestion des erreurs

Au chargement du questionnaire, si la communication avec l'API pour récupérer les données rencontre une erreur, l'utilisateur est bloqué sur une page d'erreur expliquant la situation et l'invitant à réessayer plus tard ou à contacter l'assistance.

Ensuite, si une erreur survient lors de la persistance, un message s'affiche à l'utilisateur qui peut toutefois continuer sa saisie. Les données ayant été envoyées lors des requêtes en erreur seront renvoyées ultérieurement (au prochain changement de page).
