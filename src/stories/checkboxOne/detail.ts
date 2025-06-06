import type { LunaticSource } from '@inseefr/lunatic'

export const source: LunaticSource = {
  components: [
    {
      id: 'checkboxone',
      componentType: 'CheckboxOne',
      isMandatory: false,
      page: '3',
      label: { value: '"checkboxone ONE component"', type: 'VTL|MD' },
      description: { value: '"true or false"', type: 'VTL|MD' },
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
          label: { value: '"Autre"', type: 'VTL|MD' },
          detail: {
            label: { value: '"Préciser : "', type: 'VTL' },
            response: { name: 'Q3' },
          },
        },
      ],
      response: { name: 'Q2' },
    },
  ],
  variables: [
    { variableType: 'COLLECTED', name: 'Q2', values: { COLLECTED: null } },
    { variableType: 'COLLECTED', name: 'Q3', values: { COLLECTED: null } },
  ],
}
