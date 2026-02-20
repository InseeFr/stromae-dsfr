import { Button } from '@codegouvfr/react-dsfr/Button'
import { Input } from '@codegouvfr/react-dsfr/Input'
import { useNavigate } from '@tanstack/react-router'
import { FormProvider, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Container } from '@/components/Container'
import { Grid } from '@/components/Grid'

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

  const { t } = useTranslation()

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
            <h1>{t('visualizePage.title')}</h1>
            <h2>{t('visualizePage.sourceFileTitle')}</h2>
            <Input
              nativeInputProps={{
                ...register('source', {
                  required: t('visualizePage.sourceFileError') as string,
                }),
              }}
              hintText={t('visualizePage.hintText')}
              label={t('visualizePage.sourceLabel')}
              state={errors.source ? 'error' : 'default'}
              stateRelatedMessage={errors.source?.message}
            />
            <h2>{t('visualizePage.metadataFileTitle')}</h2>
            <Input
              nativeInputProps={{ ...register('metadata') }}
              label={t('visualizePage.metadataLabel')}
              hintText={t('visualizePage.hintText')}
              state="default"
              stateRelatedMessage={t('visualizePage.stateRelatedMessage')}
            />
            <h2>{t('visualizePage.dataFileTitle')}</h2>
            <Input
              nativeInputProps={{ ...register('data') }}
              hintText={t('visualizePage.hintText')}
              label={t('visualizePage.dataLabel')}
              state="default"
              stateRelatedMessage={t('visualizePage.stateRelatedMessage')}
            />
            <SelectNomenclatures />
            <Button type="submit">{t('visualizePage.submitButton')}</Button>
          </form>
        </FormProvider>
      </Grid>
    </Container>
  )
}
