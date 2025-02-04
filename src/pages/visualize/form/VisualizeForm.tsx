import { Button } from '@codegouvfr/react-dsfr/Button'
import { Input } from '@codegouvfr/react-dsfr/Input'
import { useNavigate } from '@tanstack/react-router'
import { FormProvider, useForm } from 'react-hook-form'

import { Container } from '@/components/Container'
import { Grid } from '@/components/Grid'
import { declareComponentKeys, useTranslation } from '@/i18n'

import { SelectNomenclatures } from './SelectNomenclatures'

export type FormInputs = {
  source: string
  metadata: string
  data: string
  nomenclature: { name: string; uri: string }[]
}

export function VisualizeForm() {
  const navigate = useNavigate()
  const methods = useForm<FormInputs>({
    defaultValues: {
      nomenclature: [{ name: '', uri: '' }],
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const { t } = useTranslation({ VisualizeForm })

  const onSubmit = handleSubmit((values) => {
    const { data, metadata, nomenclature, source } = values
    navigate({
      search: {
        source,
        data,
        metadata,
        nomenclature: nomenclature.reduce(
          (acc, { name, uri }) => ({ ...acc, [name]: uri }),
          {},
        ),
      } as any,
    })
  })

  return (
    <Container>
      <Grid>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <h1>{t('form title')}</h1>
            <h2>{t('source file title')}</h2>
            <Input
              nativeInputProps={{
                ...register('source', {
                  required: t('source file error'),
                }),
              }}
              hintText={t('hint text')}
              label={t('source label')}
              state={errors.source ? 'error' : 'default'}
              stateRelatedMessage={errors.source?.message}
            />
            <h2>{t('metadata file title')}</h2>
            <Input
              nativeInputProps={{ ...register('metadata') }}
              label={t('metadata label')}
              hintText={t('hint text')}
              state="default"
              stateRelatedMessage={t('state related message')}
            />
            <h2>{t('data file title')}</h2>
            <Input
              nativeInputProps={{ ...register('data') }}
              hintText={t('hint text')}
              label={t('data label')}
              state="default"
              stateRelatedMessage={t('state related message')}
            />
            <SelectNomenclatures />
            <Button type="submit">{t('submit button')}</Button>
          </form>
        </FormProvider>
      </Grid>
    </Container>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { i18n } = declareComponentKeys<
  | 'form title'
  | 'source file title'
  | 'metadata file title'
  | 'data file title'
  | 'source file error'
  | 'source label'
  | 'metadata label'
  | 'data label'
  | 'hint text'
  | 'state related message'
  | 'submit button'
>()({ VisualizeForm })

export type I18n = typeof i18n
