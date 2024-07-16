---
sidebar_position: 2
---

# Navigation

La navigation des pages est linéaire, a l'intérieur du questionnaire il existe toutefois un cas particulier le rond-point.

Ce diagramme explique la navigation entre les différentes pages de l'orchestrateur :

```mermaid
flowchart TD
    Start[Lancement de l'application] -->|Pas de données| PageAccueil
    Start -->|Questionnaire validé| PageFin
    Start -->|Questionnaire rempli mais non validé| ModalAccueil

    PageAccueil -->|Suivant| PageQuestionnaire
    PageQuestionnaire -.->|Précédent| PageAccueil
    PageQuestionnaire -->|Suivant| PageValidation
    PageValidation -.->|Précédent| PageQuestionnaire
    PageValidation -->|Suivant| ModalConfirmation
    ModalConfirmation -.->|Précédent| PageValidation
    ModalConfirmation -->|Confirmer| PageFin
    PageFin --> End[Fin]

    ModalAccueil -->|Aller à la premiere page| PageAccueil
    ModalAccueil -->|Reprendre là où j'en étais| PageQuestionnaire
    ModalAccueil -->|Reprendre là où j'en étais| PageValidation

    classDef page fill:#bd93f9,stroke:#bd93f9,stroke-width:2px;
    classDef modal fill:#6272a4,stroke:#6272a4,stroke-width:2px;

    class PageAccueil,PageQuestionnaire,PageValidation,PageFin page
    class ModalAccueil,ModalConfirmation modal
```

Pour en savoir plus sur la navigation dans le questionnaire, une [documentation lunatic est disponible](https://inseefr.github.io/Lunatic/docs/hook/navigation).

Le titre de chaque séquence est rappelé en haut du questionnaire.
