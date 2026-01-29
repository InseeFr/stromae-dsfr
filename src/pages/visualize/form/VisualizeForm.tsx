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
            <h1>{t('collectPage.visualize.title')}</h1>
            <h2>{t('collectPage.visualize.sourceFileTitle')}</h2>
            <Input
              nativeInputProps={{
                ...register('source', {
                  required: t(
                    'collectPage.visualize.sourceFileError',
                  ) as string,
                }),
              }}
              hintText={t('collectPage.visualize.hintText')}
              label={t('collectPage.visualize.sourceLabel')}
              state={errors.source ? 'error' : 'default'}
              stateRelatedMessage={errors.source?.message}
            />
            <h2>{t('collectPage.visualize.metadataFileTitle')}</h2>
            <Input
              nativeInputProps={{ ...register('metadata') }}
              label={t('collectPage.visualize.metadataLabel')}
              hintText={t('collectPage.visualize.hintText')}
              state="default"
              stateRelatedMessage={t(
                'collectPage.visualize.stateRelatedMessage',
              )}
            />
            <h2>{t('collectPage.visualize.dataFileTitle')}</h2>
            <Input
              nativeInputProps={{ ...register('data') }}
              hintText={t('collectPage.visualize.hintText')}
              label={t('collectPage.visualize.dataLabel')}
              state="default"
              stateRelatedMessage={t(
                'collectPage.visualize.stateRelatedMessage',
              )}
            />
            <SelectNomenclatures />
            <Button type="submit">
              {t('collectPage.visualize.submitButton')}
            </Button>
          </form>
        </FormProvider>
      </Grid>
    </Container>
  )
}
