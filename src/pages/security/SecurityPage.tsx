import { Grid } from '@/components/Grid'
import { declareComponentKeys, useTranslation } from '@/i18n'
import Breadcrumb from '@codegouvfr/react-dsfr/Breadcrumb'
import { memo } from 'react'

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
      {t('security content', {
        fullUrl: `${window.location.protocol}//${window.location.hostname}`,
      })}
    </Grid>
  )
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { i18n } = declareComponentKeys<
  | 'security title'
  | { K: 'security content'; R: JSX.Element; P: { fullUrl: string } }
>()('SecurityPage')

export type I18n = typeof i18n
