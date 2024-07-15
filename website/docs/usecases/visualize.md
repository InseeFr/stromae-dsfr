---
sidebar_position: 1
---

# Conception

Lors de la conception des questionnaires sur l'outil Pogues, les concepteurs peuvent prévisualiser le questionnaire tel qu'il apparaîtra pour les répondants. Cette prévisualisation se déroule directement dans Stromae DSFR.

Il est également possible de prévisualiser un questionnaire en remplissant un formulaire qui permet de fournir le modèle de questionnaire, des éventuelles données, métadonnées et nomenclatures nécessaires au fonctionnement des composants de suggestion sur liste.

## Formulaire de visualisation

Le formulaire de visualisation se trouve sur la route `/visualize` de l'application. Il permet de renseigner les informations suivantes :

- **L'URL d'un modèle de questionnaire** (obligatoire) : Permet de charger le modèle de questionnaire à prévisualiser.
- **L'URL de données pour simuler un questionnaire vierge ou pré-rempli** (facultatif) : Permet de charger des données externes ou déjà collectées pour simuler différentes situations.
- **L'URL des métadonnées du questionnaire** (facultatif) : Permet de fournir des informations supplémentaires sur le questionnaire.
- **Une liste de nomenclatures associées au questionnaire** (facultatif) : Permet d'améliorer la recherche sur liste grâce à des composants de suggestion.

## Visualisation du questionnaire

Tous les paramètres fournis sont inscrits dans l'URL, ce qui permet de partager cette URL pour réouvrir le questionnaire avec un contexte identique sans repasser par le remplissage du formulaire. La visualisation se trouve toujours sur la route `/visualize`, complétée des paramètres de requête (query params) suivants :

```
/visualize?source={url}&metadata={url}&data={url}&nomenclature={“id-nomenclature1”:{url-nomenclature1},“id-nomenclature2”:{url-nomenclature2}}
```

Par exemple, une URL complète pourrait ressembler à ceci (après formatage) :

```
http://localhost:5173/visualize?source=https%3A%2F%2Fexample.com%2Fquestionnaire&metadata=https%3A%2F%2Fexample.com%2Fmetadata&data=https%3A%2F%2Fexample.com%2Fdata&nomenclature=%7B%E2%80%9Cid-nomenclature1%E2%80%9D%3A%E2%80%9Chttps%3A%2F%2Fexample.com%2Fnomenclature1%E2%80%9D%2C%E2%80%9Cid-nomenclature2%E2%80%9D%3A%E2%80%9Chttps%3A%2F%2Fexample.com%2Fnomenclature2%E2%80%9D%7D
```

Cette fonctionnalité offre une grande flexibilité et facilite le partage et la collaboration entre les concepteurs de questionnaires.

## Fonctionnalités spécifiques à la visualisation

En mode visualisation, plusieurs fonctionnalités supplémentaires sont disponibles :

- **Téléchargement des données** : Un bouton permet de télécharger les données à tout moment pendant la navigation, facilitant ainsi l'exploration des données collectées.
- **Téléchargement automatique à la fin du questionnaire** : À la fin du questionnaire, les données sont automatiquement téléchargées.

Enfin, dans ce mode, l'API n'est jamais sollicitée. Aucune donnée ne sera envoyée à cette dernière, garantissant ainsi la confidentialité des informations visualisées.
