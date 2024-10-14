import { declareComponentKeys, useTranslation } from '@/i18n'
import { Grid } from '@/shared/components/Grid'
import { Breadcrumb } from '@codegouvfr/react-dsfr/Breadcrumb'
import { memo, type ReactNode } from 'react'

export const LegalsPage = memo(function LegalsPage() {
  const { t } = useTranslation({ LegalsPage })
  return (
    <Grid>
      <Breadcrumb
        currentPageLabel={t('legals title')}
        homeLinkProps={{}}
        segments={[]}
      />
      <h2>{t('legals title')}</h2>
      <section>
        <h3>{t('service title')}</h3>
        <p>{t('service content')}</p>

        <h3>{t('survey legals terms title')}</h3>
        <p>{t('survey legals terms content')}</p>

        <h3>{t('cookies title')}</h3>
        <p>{t('cookies content')}</p>

        <h3>{t('session title')}</h3>
        <p>{t('session content')}</p>

        <h3>{t('copyright title')}</h3>
        <p>{t('copyright content')}</p>

        <h3>{t('editor information title')}</h3>
        <p>{t('editor information content')}</p>

        <h3>{t('design production title')}</h3>
        <p>{t('design production content')}</p>

        <h3>{t('personal data title')}</h3>
        <p>{t('personal data content')}</p>
      </section>
    </Grid>
  )
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { i18n } = declareComponentKeys<
  | 'legals title'
  | 'service title'
  | { K: 'service content'; R: ReactNode }
  | 'survey legals terms title'
  | 'survey legals terms content'
  | 'cookies title'
  | 'cookies content'
  | 'session title'
  | { K: 'session content'; R: ReactNode }
  | 'copyright title'
  | 'copyright content'
  | 'editor information title'
  | { K: 'editor information content'; R: ReactNode }
  | 'design production title'
  | 'design production content'
  | 'personal data title'
  | { K: 'personal data content'; R: ReactNode }
>()({ LegalsPage })

export type I18n = typeof i18n
