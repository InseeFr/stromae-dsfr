import type { LunaticSource } from '@inseefr/lunatic'

export const source: LunaticSource = {
  cleaning: {},
  components: [
    {
      id: 'kxi788',
      componentType: 'Duration',
      isMandatory: false,
      format: 'PnYnM',
      page: '1',
      label: {
        value: '"➡ 1. " || "Duration (format: PnYnM) "',
        type: 'VTL|MD',
      },
      description: { value: '"Description"', type: 'VTL|MD' },
      conditionFilter: { value: 'true', type: 'VTL' },
      conditionReadOnly: { value: 'true', type: 'VTL' },
      response: { name: 'DUREE' },
    },
  ],
  variables: [
    { variableType: 'COLLECTED', name: 'DUREE', values: { COLLECTED: null } },
  ],
  pagination: 'question',
  resizing: {},
  label: { type: 'VTL|MD', value: 'Test-Dylan' },
  lunaticModelVersion: '2.5.0',
  modele: 'TESTDYLAN',
  enoCoreVersion: '2.7.1',
  generatingDate: '06-03-2024 12:46:44',
  id: 'lsvuvtbg',
  maxPage: '1',
}
