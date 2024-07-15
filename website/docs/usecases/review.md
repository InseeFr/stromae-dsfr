---
sidebar_position: 3
---

# Relecture

La relecture permet à un gestionnaire d'enquête ou un gestionnaire en charge de l'assistance de parcourir le questionnaire d'un répondant.

Son fonctionnement est très similaire à celui du contexte de collecte, à la seule différence qu'aucune action de l'utilisateur dans ce mode n'est persistée en base de données.

Il est possible, pendant la navigation dans le questionnaire, de modifier les réponses (afin de vérifier par exemple le comportement du questionnaire en direct avec un enquêté), mais les données ne sont pas sauvegardées.

Ce contexte est disponible sur la route suivante : `/review/questionnaire/$questionnaireId/unite-enquetee/$surveyUnitId`
