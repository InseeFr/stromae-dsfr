import { fr } from '@codegouvfr/react-dsfr'
import Button from '@codegouvfr/react-dsfr/Button'
import Input from '@codegouvfr/react-dsfr/Input'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import type { FormInputs } from './VisualizeForm'

export function SelectNomenclatures() {
  const { t } = useTranslation()
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
      <h2>{t('collectPage.selectNomenclature.title')}</h2>
      <p>{t('collectPage.selectNomenclature.description')}</p>
      <Button type="button" priority="secondary" onClick={addNomenclature}>
        {t('collectPage.selectNomenclature.addButton')}
      </Button>
      <ul style={{ listStyle: 'none' }}>
        {fields.map((item, index) => {
          return (
            <li key={item.id} style={{ display: 'flex', flexDirection: 'row' }}>
              <Input
                nativeInputProps={{ ...register(`nomenclature.${index}.name`) }}
                label={t('collectPage.selectNomenclature.nameLabel')}
                className={fr.cx('fr-mr-4v')}
              />
              <Input
                nativeInputProps={{ ...register(`nomenclature.${index}.uri`) }}
                label={t('collectPage.selectNomenclature.uriLabel')}
              />
              <Button
                type="button"
                iconId={'fr-icon-close-line'}
                onClick={() => remove(index)}
                title={t('collectPage.selectNomenclature.deleteButton')}
                priority="tertiary no outline"
              />
            </li>
          )
        })}
      </ul>
    </>
  )
}
