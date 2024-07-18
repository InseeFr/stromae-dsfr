import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { declareComponentKeys, useTranslation } from 'i18n'
import { memo } from 'react'
import { Grid } from 'shared/components/Grid'

export const SecurityPage = memo(function SecurityPage() {
  const { t } = useTranslation({ SecurityPage })
  return (
    <Grid>
      <Breadcrumb
        currentPageLabel={t('security title')}
        homeLinkProps={{}}
        segments={[]}
      />
      <h2>{t('security title')}</h2>
    </Grid>
  )
})

const { i18n } = declareComponentKeys<'security title'>()('SecurityPage')

export type I18n = typeof i18n
