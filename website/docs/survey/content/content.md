---
sidebar_position: 1
---

# Le contenu

Le contenu des pages de Stromae peut afficher soit un questionnaire, soit des messages d'erreur.

## Erreurs

En cas de problème, des messages d'erreur sont affichés pour guider l'utilisateur.

![error](/img/error.png)

Quand l'erreur ce produit dans un [contexte de collecte](../../usecases/collect.md), la redirection proposée et le portail, le formulaire de visualisation pour la [visualisation](../../usecases/visualize.md) et la page d'accueil dans les autres cas.

## Affichage des Questionnaires

L'application Stromae affiche les questionnaires générés par Pogues. Toutefois, du contenu propre à Stromae est inséré au début et à la fin du questionnaire saisi.

### 1. Page d'accueil

Cette page présente un aperçu de l'application et permet à l'utilisateur de démarrer un nouveau questionnaire ou de reprendre un questionnaire en cours.

### 2. Affichage du questionnaire

Cette page affiche le questionnaire saisie dans Pogues et rendu par la librairie Lunatic. L'utilisateur peut naviguer à travers les questions et saisir ses réponses.

### 3. Page de validation

Après avoir rempli le questionnaire, l'utilisateur est dirigé vers une page de validation où il peut confirmer la validation ou non des données saisie.

### 4. Page de fin

Une fois le questionnaire validé, l'utilisateur est redirigé vers une page de fin qui confirme la date de soumission du questionnaire et propose le téléchargement d'une preuve de dépôt.
