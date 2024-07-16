---
sidebar_position: 1
---

# Les page dans le questionnaire

L'application Stromae affiche les questionnaires générés par Pogues. Toutefois, du contenu spécifique à Stromae est inséré au début et à la fin du questionnaire saisi. La navigation entre les pages est détaillée [ci-après](../navigation.md).

## Page d'accueil

Cette page présente un aperçu de l'application et permet à l'utilisateur de démarrer un nouveau questionnaire ou de reprendre un questionnaire en cours.

![Page d'accueil](/img/welcomePage.png)

Le texte "Cette enquête [...] sur le domaine concerné" est personnalisable via les métadonnées. Des personnalisations supplémentaires peuvent être ajoutées.

De plus, à l'arrivée sur le questionnaire, si des données sont récupérées, une modal s'affiche et propose de retourner à l'endroit où l'on a quitté le questionnaire ou de revenir à la première page.

![Modal d'accueil](/img/welcomeModal.png)

## Le formulaire

L'affichage du questionnaire est effectué grâce à la librairie Lunatic et à [Lunatic-DSFR](https://github.com/InseeFr/Lunatic-dsfr), qui personnalise l'ensemble des composants rendus par Lunatic au système de design de l'État. L'utilisateur peut naviguer à travers les questions et saisir ses réponses.

## Page de validation

Après avoir rempli le questionnaire, l'utilisateur est dirigé vers une page de validation où il peut confirmer ou non la validation des données saisies.

![Page de validation](/img/validationPage.png)

S'il confirme en cliquant sur **Envoyer mes réponses**, une modal de confirmation s'ouvre pour définitivement valider le questionnaire.

![Modal de validation](/img/validationModal.png)

## Page de fin

Une fois le questionnaire validé, l'utilisateur est redirigé vers une page de fin qui confirme la date de soumission du questionnaire et propose le téléchargement d'un accusé de réception.

![Page de fin](/img/endPage.png)
