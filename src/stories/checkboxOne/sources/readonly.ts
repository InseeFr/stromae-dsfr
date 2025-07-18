import type { LunaticSource } from '@inseefr/lunatic'

export const source: LunaticSource = {
  cleaning: {},
  variables: [
    {
      variableType: 'COLLECTED',
      values: { COLLECTED: null },
      name: 'CHECKBOXBO',
    },
  ],
  components: [
    {
      componentType: 'CheckboxOne',
      response: { name: 'CHECKBOXBO' },
      options: [
        { label: { type: 'VTL|MD', value: '"J’accepte"' }, value: '1' },
        { label: { type: 'VTL|MD', value: '"Je refuse"' }, value: '2' },
      ],
      conditionFilter: { type: 'VTL', value: 'true' },
      conditionReadOnly: { type: 'VTL', value: 'true' },
      id: 'ltfrftp8',
      page: '1',
      label: { type: 'VTL|MD', value: '"Checkbox One -> Radio"' },
      isMandatory: false,
    },
  ],
  pagination: 'question',
  resizing: {},
  label: { type: 'VTL|MD', value: 'Test-Dylan' },
  lunaticModelVersion: '2.5.0',
  modele: 'TESTDYLAN',
  enoCoreVersion: '2.7.1',
  generatingDate: '06-03-2024 12:11:55',
  id: 'lsvuvtbg',
  maxPage: '1',
}
