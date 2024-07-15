---
sidebar_position: 1
---

# Introduction

Bienvenue sur la documentation de **Stromae DSFR**.

**Stromae DSFR** est une application web développée en TypeScript avec le framework React. Son but est de faciliter la passation des questionnaires web pour les différentes enquêtes de l'INSEE et de certains services statistiques ministériels.

Cette application est utilisée pour les enquêtes destinées aux ménages ainsi qu'aux entreprises.

Elle s'inscrit dans une galaxie d'applications issue du programme **Métallica**, père fondateur de la nouvelle filière d'enquêtes de l'INSEE. Cette filière est découpée en quatre produits, Stromae DSFR relève du produit de Conception d'Enquête, musicalement appelé [Bowie](https://github.com/inseeFr/bowie).

Au sein de la filière, l'affichage des questionnaires repose essentiellement sur la librairie **[Lunatic](https://inseefr.github.io/Lunatic/docs/)**, qui s'occupe de rendre des composants React permettant l'affichage des questionnaires conçus sur l'outil [Pogues](https://github.com/inseeFr/pogues) et générés aux formats [Lunatic-Model](https://github.com/InseeFr/Lunatic-Model) via [Eno](https://github.com/inseeFr/eno). Seul Lunatic porte la connaissance du model des questionnaire.

Stromae DSFR est ce que l'on qualifie en interne d'**orchestrateur**, au même titre que [Drama Queen](https://github.com/InseeFr/Drama-Queen) (utilisé par les enquêteurs pour effectuer la passation de questionnaires). En bref, ce sont des applications web qui communiquent avec diverses API pour afficher les questionnaires et collecter les données. Elles gèrent tout ce qui entoure les questionnaires, comme l'authentification, les appels API, la sauvegarde des données, etc.

L'application d'origine, simplement nommée [Stromae](https://github.com/InseeFr/Stromae), a été complètement refondue en adoptant le [système de design de l'État français](https://www.systeme-de-design.gouv.fr/).

:::warning
En cours de construction
:::
