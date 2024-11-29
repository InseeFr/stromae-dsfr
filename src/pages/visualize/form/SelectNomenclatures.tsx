import { fr } from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'
import Input from '@codegouvfr/react-dsfr/Input'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { declareComponentKeys, useTranslation } from '@/i18n'

import type { FormInputs } from './VisualizeForm'

export function SelectNomenclatures() {
  const { t } = useTranslation({ SelectNomenclatures })
  const { register, control } = useFormContext<FormInputs>()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'nomenclature',
  })

  const addNomenclature = () => {
    append({ name: '', uri: '' })
  }

  return (
    <>
      <h2>{t('nomenclatures title')}</h2>
      <p>{t('nomenclatures description')}</p>
      <Button type="button" priority="secondary" onClick={addNomenclature}>
        {t('add nomenclature button')}
      </Button>
      <ul style={{ listStyle: 'none' }}>
        {fields.map((item, index) => {
          return (
            <li key={item.id} style={{ display: 'flex', flexDirection: 'row' }}>
              <Input
                nativeInputProps={{ ...register(`nomenclature.${index}.name`) }}
                label={t('name label')}
                className={fr.cx('fr-mr-4v')}
              />
              <Input
                nativeInputProps={{ ...register(`nomenclature.${index}.uri`) }}
                label={t('uri label')}
              />
              <Button
                type="button"
                iconId={'fr-icon-close-line'}
                onClick={() => remove(index)}
                title={t('delete button title')}
                priority="tertiary no outline"
              />
            </li>
          )
        })}
      </ul>
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { i18n } = declareComponentKeys<
  | 'nomenclatures title'
  | 'nomenclatures description'
  | 'add nomenclature button'
  | 'name label'
  | 'uri label'
  | 'delete button title'
>()({ SelectNomenclatures })

export type I18n = typeof i18n
