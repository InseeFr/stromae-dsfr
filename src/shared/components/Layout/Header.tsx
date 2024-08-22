import { headerFooterDisplayItem } from '@codegouvfr/react-dsfr/Display'
import { Header as DsfrHeader } from '@codegouvfr/react-dsfr/Header'
import { useMatchRoute, useSearch } from '@tanstack/react-router'
import {
  declareComponentKeys,
  useResolveLocalizedString,
  useTranslation,
} from 'i18n'
import { useOidc } from 'oidc'
import { collectPath } from 'pages/Collect/route'
import { executePreLogoutActions } from 'shared/hooks/prelogout'
import { useMetadataStore } from 'shared/metadataStore/useMetadataStore'

export function Header() {
  const { t } = useTranslation({ Header })
  const { isUserLoggedIn, logout } = useOidc()
  const { resolveLocalizedString, resolveLocalizedStringDetailed } =
    useResolveLocalizedString({
      labelWhenMismatchingLanguage: true,
    })

  const {
    label: serviceTitle,
    mainLogo,
    surveyUnitIdentifier,
  } = useMetadataStore()

  /**
   * There is an issue with this part of the code: the search type is not well narrowed with isCollectRoute. I'm waiting for a better solution.
   */
  const matchRoute = useMatchRoute()
  const isCollectRoute = !!matchRoute({ to: collectPath })
  const search = useSearch({ strict: false })

  return (
    <DsfrHeader
      brandTop={
        <>
          République
          <br />
          Française
        </>
      }
      homeLinkProps={{
        search: true,
        title: t('home link title'),
      }}
      quickAccessItems={[
        headerFooterDisplayItem,
        {
          iconId: 'fr-icon-mail-fill',
          linkProps: {
            href: collectPath
              ? `${import.meta.env.VITE_PORTAIL_URL}${search?.['pathAssistance'] ?? ''}`
              : '',
            disabled: isCollectRoute,
          },
          text: t('quick access support'),
        },
        ...(!isUserLoggedIn
          ? []
          : [
              {
                iconId: 'ri-account-box-line',
                buttonProps: {
                  onClick: async () => {
                    await executePreLogoutActions()
                    logout({
                      redirectTo: 'specific url',
                      url: `${import.meta.env.VITE_PORTAIL_URL}${search?.['pathLogout'] ?? ''}`,
                    })
                  },
                  disabled: !isCollectRoute,
                },
                text: t('quick access logout'),
              } as const,
            ]),
      ]}
      serviceTagline={resolveLocalizedString(surveyUnitIdentifier)}
      serviceTitle={resolveLocalizedString(serviceTitle)}
      operatorLogo={{
        alt: resolveLocalizedStringDetailed(mainLogo.label).str,
        imgUrl: mainLogo.url,
        orientation: 'vertical',
      }}
    />
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { i18n } = declareComponentKeys<
  | 'home link title'
  | 'quick access support'
  | 'quick access logout'
  | { K: 'service title'; R: JSX.Element }
  | 'operator logo alt'
>()({ Header })

export type I18n = typeof i18n
