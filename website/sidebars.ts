import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docs: [
    "intro",
    "collect",
    "visualize",
    "review",
    {
      type: "category",
      label: "Orchestration de questionnaire",
      link: {
        description: "Fonctionnalités de l'orchestrateur",
        type: "generated-index",
      },
      collapsed: true,
      items: [
        "orchestrator/pagination",
        "orchestrator/navigation",
        "orchestrator/controls",
       /* "orchestrator/dataHandling", */
        {
          type: "category",
          label: "Composants",
          link: {
            type: "generated-index",
            description:
              "Les composants proposés par la filière (et qui peuvent être décrits grâce aux outils Pogues, Eno et Lunatic)",
          },
          collapsed: false,
          items: [
            {
              type: "category",
              label: "Le balisage",
              link: {
                description:
                  "Ces composants offrent des indications visuelles pour aider l'utilisateur à s'orienter dans le formulaire",
                type: "generated-index",
              },
              collapsed: true,
              items: [
                "orchestrator/components/decorations/sequence",
                "orchestrator/components/decorations/declaration",
              ],
            },
            {
              type: "category",
              label: "Les champs de saisie et leur affichage",
              link: {
                description:
                  "Cette partie décrit les différents composants proposés dans Stromae DSFR pour saisir des informations (et qui peuvent être décrits grâce aux outils Pogues, Eno et Lunatic)",
                type: "generated-index",
              },
              collapsed: true,
              items: [
                "orchestrator/components/fields/input",
                "orchestrator/components/fields/inputNumber",
                "orchestrator/components/fields/date",
                "orchestrator/components/fields/duration",
                "orchestrator/components/fields/dropdown",
                "orchestrator/components/fields/suggester",
                "orchestrator/components/fields/radio",
                "orchestrator/components/fields/checkboxGroup",
                "orchestrator/components/fields/table",
              ],
            },
            {
              type: "category",
              label: "Les agrégateurs",
              link: {
                description:
                  "Quelques composants permettant d'agréger des informations complexes (et qui peuvent être décrits grâce aux outils Pogues, Eno et Lunatic)",
                type: "generated-index",
              },
              collapsed: true,
              items: [
                "orchestrator/components/aggregators/pairwise",
                "orchestrator/components/aggregators/roundabout",
                "orchestrator/components/aggregators/rosterForLoop",
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars
