import type { LunaticSource } from '@inseefr/lunatic'

export const source: LunaticSource = {
  maxPage: '1',
  components: [
    {
      id: 'radio',
      componentType: 'Radio',
      isMandatory: false,
      page: '1',
      label: { value: '"Label for a Radio component"', type: 'VTL|MD' },
      description: {
        value: '"Description of a Radio component"',
        type: 'VTL|MD',
      },
      conditionFilter: { value: 'true', type: 'VTL' },
      options: [
        {
          value: '1',
          description: { value: '"Description oui"', type: 'VTL|MD' },
          label: { value: '"oui"', type: 'VTL|MD' },
        },
        {
          value: '2',
          description: { value: '"Description non"', type: 'VTL|MD' },
          label: { value: '"non"', type: 'VTL|MD' },
        },
        {
          value: '3',
          label: { value: 'Autre', type: 'TXT' },
          detail: {
            label: { value: '"Préciser : "', type: 'VTL' },
            response: { name: 'Q2_DETAIL' },
          },
        },
      ],
      response: { name: 'Q2' },
    },
    { id: 'end', componentType: 'Sequence', page: '2' },
  ],
  variables: [
    { variableType: 'COLLECTED', name: 'Q2', values: { COLLECTED: null } },

    {
      variableType: 'COLLECTED',
      name: 'Q2_DETAIL',
      values: { COLLECTED: null },
    },
  ],
}
