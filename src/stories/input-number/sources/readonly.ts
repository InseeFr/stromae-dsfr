import type { LunaticData, LunaticSource } from '@inseefr/lunatic'

export const source: LunaticSource = {
  cleaning: {},
  components: [
    {
      id: 'kze792d8',
      componentType: 'InputNumber',
      isMandatory: false,
      page: '1',
      min: 0,
      max: 10,
      decimals: 2,
      label: { value: '"Your favourite number"', type: 'VTL|MD' },
      description: {
        value: '"A number between 0 and 10 with 2 decimals maximum."',
        type: 'VTL|MD',
      },
      conditionFilter: { value: 'true', type: 'VTL' },
      conditionReadOnly: { value: 'true', type: 'VTL' },
      response: { name: 'NB' },
    },
    {
      id: 'seq',
      componentType: 'Sequence',
      label: { value: '"Bye!"', type: 'VTL|MD' },
      conditionFilter: { value: 'true', type: 'VTL' },
      page: '2',
    },
  ],
  variables: [
    { variableType: 'COLLECTED', name: 'NB', values: { COLLECTED: null } },
  ],
  pagination: 'question',
  resizing: {},
  label: { type: 'VTL|MD', value: 'Test-Dylan' },
  lunaticModelVersion: '2.5.0',
  modele: 'TESTDYLAN',
  enoCoreVersion: '2.7.1',
  generatingDate: '06-03-2024 12:46:44',
  id: 'lsvuvtbg',
  maxPage: '2',
}

export const data: LunaticData = {
  COLLECTED: { NB: { COLLECTED: 42 } },
}
