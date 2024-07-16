# Contrôles

Les contrôles permettent de définir des règles de validation dans le questionnaire (sous forme d'expression VTL). Ils sont [spécifiés dans Pogues](https://inseefr.github.io/Bowie/pogues/guide/) ou ajoutés automatiquement et exécutés par Lunatic. Stromae DSFR s'occupe simplement de piloter leurs exécutions.

Chaque contrôle possède les caractéristiques suivantes :

- Criticité : Peut être définie comme information, avertissement ou erreur.
- Type de contrôle : Peut être de format ou de cohérence.
- Expression : Définit la condition d'affichage du contrôle.
- Message d'erreur : Message affiché en cas de non-validation du contrôle.

Un contrôle est considéré comme **bloquant** s'il s'agit d'un **contrôle de format** ou si sa **criticité est erreur**.

## L'exécution des contrôles

L'exécution des contrôles est très liée à la pagination. En effet, ils sont exécutés à chaque clic sur le bouton **continuer**. L'impact des contrôles sur la pagination est détaillé dans le graphique ci-dessous :

```mermaid
flowchart TD
  A[Appuyer sur le bouton Continuer] --> B[Vérification des erreurs]
  B --> C{Y a-t-il des erreurs ?}
  C -->|Non| D[Continuer à la page suivante]
  C -->|Oui| E{Erreur bloquante ?}
  E -->|Oui| F[Rester sur la page actuelle et afficher les erreurs]
  E -->|Non| G{Les erreurs actuelles sont-elles les mêmes que les erreurs actives ?}
  G -->|Oui| H[Effacer les erreurs et continuer à la page suivante]
  G -->|Non| I[Mettre à jour les erreurs affichées et rester sur la page]

  style D fill:#f9f,stroke:#333,stroke-width:4px
  style F fill:#f96,stroke:#333,stroke-width:4px
  style H fill:#f9f,stroke:#333,stroke-width:4px
  style I fill:#f96,stroke:#333,stroke-width:4px
```

## L'affichage

Sauf cas particulier (dans les tableaux, par exemple), les contrôles figurent désormais sous les champs de saisie. Les erreurs et avertissements sont affichés de la même façon.

Lorsque plusieurs contrôles ont été décrits, ils apparaissent avec une précédence (un contrôle doit être résolu avant que le suivant ne se déclenche).

![image](https://github.com/InseeFr/Stromae/assets/71011059/3626e379-7eaf-41e5-93be-e05730cad9e3)
![image](https://github.com/InseeFr/Stromae/assets/71011059/daa729f2-331e-41a7-9fef-a3a1650ce8f4)
![image](https://github.com/InseeFr/Stromae/assets/71011059/68dfa757-e997-430c-a45e-c8d50cf0d8b5)

Stromae DSFR se contente de piloter l’exécution des contrôles et de transmettre les erreurs aux composants affichés par Lunatic. La customisation de l’affichage des composants, et donc des contrôles, est gérée par Lunatic DSFR.
