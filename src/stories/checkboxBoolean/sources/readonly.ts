import type { LunaticSource } from '@inseefr/lunatic'

export const source: LunaticSource = {
  cleaning: {},
  variables: [
    {
      variableType: 'COLLECTED',
      values: { COLLECTED: null },
      name: 'CHECKBOXBoolean',
    },
  ],
  components: [
    {
      componentType: 'CheckboxBoolean',
      response: { name: 'CHECKBOXBoolean' },
      conditionFilter: { type: 'VTL', value: 'true' },
      conditionReadOnly: { type: 'VTL', value: 'true' },
      id: 'ltfrftp8',
      page: '1',
      label: { type: 'VTL|MD', value: '"Label du composant"' },
      description: { type: 'VTL|MD', value: '"Description"' },
      isMandatory: false,
    },
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
