import type { LunaticData, LunaticSource } from '@inseefr/lunatic'

export const source: LunaticSource = {
  id: 'kzguw1v7',
  label: { type: 'VTL|MD', value: 'QNONREG - Controles Non Numériques VTL' },
  modele: 'QTESTCONTNONNUM',
  maxPage: '4',
  resizing: {},
  variables: [
    {
      name: 'TESTDATEA',
      values: { COLLECTED: null },
      variableType: 'COLLECTED',
    },
    { name: 'DUREE', values: { COLLECTED: null }, variableType: 'COLLECTED' },
    { name: 'FIN', values: { COLLECTED: null }, variableType: 'COLLECTED' },
    {
      name: 'FILTER_RESULT_TESTDATEA',
      expression: { type: 'VTL', value: 'true' },
      variableType: 'CALCULATED',
    },
    {
      name: 'FILTER_RESULT_DUREE',
      expression: { type: 'VTL', value: 'true' },
      variableType: 'CALCULATED',
    },
    {
      name: 'FILTER_RESULT_FIN',
      expression: { type: 'VTL', value: 'true' },
      variableType: 'CALCULATED',
    },
  ],
  components: [
    {
      id: 'kfxmfvwj',
      page: '1',
      label: {
        type: 'VTL|MD',
        value: '"I - " || "TEST SUR BOOLEEN CODE DATE ET TEXTE"',
      },
      componentType: 'Sequence',
      conditionFilter: { type: 'VTL', value: 'true' },
    },
    {
      id: 'question-kfxnfv4l',
      page: '2',
      label: {
        type: 'VTL|MD',
        value:
          '"1\\. " || "Controle sur date AAAA-MM-JJ (saisie entre 31/12/1990 et 31/12/2040)"',
      },
      components: [
        {
          id: 'kfxnfv4l',
          max: '2040-12-31',
          min: '1990-12-31',
          controls: [
            {
              id: 'kfxnfv4l-format-date-borne-inf-sup',
              type: 'simple',
              control: {
                type: 'VTL',
                value:
                  'not(not(isnull(TESTDATEA)) and (cast(TESTDATEA, date, "YYYY-MM-DD")<cast("1990-12-31", date, "YYYY-MM-DD") or cast(TESTDATEA, date, "YYYY-MM-DD")>cast("2040-12-31", date, "YYYY-MM-DD")))',
              },
              criticality: 'ERROR',
              errorMessage: {
                type: 'VTL|MD',
                value:
                  '"La date saisie doit être comprise entre 1990-12-31 et 2040-12-31."',
              },
              typeOfControl: 'FORMAT',
            },
            {
              id: 'kfxnfv4l-CI-0',
              type: 'simple',
              control: {
                type: 'VTL',
                value:
                  'not(cast(TESTDATEA,date,"YYYY-MM-DD") > cast(current_date(), date, "YYYY-MM-DD"))',
              },
              criticality: 'INFO',
              errorMessage: {
                type: 'VTL|MD',
                value: '"Date supérieure à date du jour"',
              },
              typeOfControl: 'CONSISTENCY',
            },
            {
              id: 'kfxnfv4l-CI-1',
              type: 'simple',
              control: {
                type: 'VTL',
                value:
                  'not(cast(cast(TESTDATEA, date, "YYYY-MM-DD"), string , "YYYY-MM-DD") <> TESTDATEA)',
              },
              criticality: 'WARN',
              errorMessage: { type: 'VTL|MD', value: '"aa"' },
              typeOfControl: 'CONSISTENCY',
            },
          ],
          response: { name: 'TESTDATEA' },
          isMandatory: false,
          dateFormat: 'YYYY-MM-DD',
          componentType: 'Datepicker',
        },
      ],
      declarations: [
        {
          id: 'kfxnywlg',
          label: {
            type: 'VTL|MD',
            value:
              'cast(cast(TESTDATEA, date, "YYYY-MM-DD"), string , "YYYY-MM-DD")  ',
          },
          position: 'AFTER_QUESTION_TEXT',
          declarationType: 'INSTRUCTION',
        },
      ],
      componentType: 'Question',
      conditionFilter: { type: 'VTL', value: 'true' },
    },
    {
      id: 'question-lwkb6v9e',
      page: '3',
      label: {
        type: 'VTL|MD',
        value: '"2\\. " || "Duree (en heures minutes) entre 0 et 7h30"',
      },
      components: [
        {
          id: 'lwkb6v9e',
          format: 'PTnHnM',
          controls: [
            {
              id: 'lwkb6v9e-CI-0',
              type: 'simple',
              control: {
                type: 'VTL',
                value:
                  'not(cast( replace( replace( replace(DUREE, "PT", ""), "M", ""), "H", "."), number) > 7.3)',
              },
              criticality: 'INFO',
              errorMessage: {
                type: 'VTL|MD',
                value: '"Durée supérieure à 7h30"',
              },
              typeOfControl: 'CONSISTENCY',
            },
          ],
          response: { name: 'DUREE' },
          isMandatory: false,
          componentType: 'Duration',
        },
      ],
      declarations: [
        {
          id: 'lwkbe3cp',
          label: {
            type: 'VTL|MD',
            value:
              '"Saisir une durée supérieure à 7h30. Durée saisie : " || cast(DUREE,string) ',
          },
          position: 'AFTER_QUESTION_TEXT',
          declarationType: 'HELP',
        },
      ],
      componentType: 'Question',
      conditionFilter: { type: 'VTL', value: 'true' },
    },
    {
      id: 'question-lwkbf6h8',
      page: '4',
      label: { type: 'VTL|MD', value: '"3\\. " || "FIN "' },
      components: [
        {
          id: 'lwkbf6h8',
          response: { name: 'FIN' },
          isMandatory: false,
          maxLength: 249,
          componentType: 'Input',
        },
      ],
      componentType: 'Question',
      conditionFilter: { type: 'VTL', value: 'true' },
    },
  ],
  pagination: 'question',
  enoCoreVersion: '3.24.0',
  generatingDate: '29-07-2024 12:03:48',
  lunaticModelVersion: '3.12.0',
}

export const data: LunaticData = {
  COLLECTED: { NAME: { COLLECTED: 'Bob Dylan' } },
}
