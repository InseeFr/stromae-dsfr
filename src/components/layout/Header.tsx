import { headerFooterDisplayItem } from '@codegouvfr/react-dsfr/Display'
import { Header as DsfrHeader } from '@codegouvfr/react-dsfr/Header'
import { useSearch } from '@tanstack/react-router'

import { MODE_TYPE } from '@/constants/mode'
import { TELEMETRY_EVENT_EXIT_SOURCE } from '@/constants/telemetry'
import { useTelemetry } from '@/contexts/TelemetryContext'
import { executePreLogoutActions } from '@/hooks/prelogout'
import { useMode } from '@/hooks/useMode'
import {
  declareComponentKeys,
  useResolveLocalizedString,
  useTranslation,
} from '@/i18n'
import { useOidc } from '@/oidc'
import { collectPath } from '@/pages/collect/route'
import { useMetadataStore } from '@/stores/useMetadataStore'
import { computeContactSupportEvent, computeExitEvent } from '@/utils/telemetry'

export function Header() {
  const { t } = useTranslation({ Header })
  const { isUserLoggedIn, logout } = useOidc()
  const { resolveLocalizedString, resolveLocalizedStringDetailed } =
    useResolveLocalizedString({
      labelWhenMismatchingLanguage: true,
    })
  const mode = useMode()

  const {
    label: serviceTitle,
    mainLogo,
    surveyUnitIdentifier,
  } = useMetadataStore()
  const { isTelemetryDisabled, pushEvent, triggerBatchTelemetryCallback } =
    useTelemetry()

  /**
   * There is an issue with this part of the code: the search type is not well narrowed with isCollectRoute. I'm waiting for a better solution.
   */
  const isCollectRoute = mode === MODE_TYPE.COLLECT
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
        // needs a href to prevent the default redirection to the homepage.
        // we assume it is a link pointing to the current url
        href: '#',
      }}
      quickAccessItems={[
        headerFooterDisplayItem,
        {
          iconId: 'fr-icon-customer-service-fill',
          linkProps: {
            href: collectPath
              ? `${import.meta.env.VITE_PORTAIL_URL}${search?.['pathAssistance'] ?? ''}`
              : '',
            disabled: isCollectRoute,
            onClick:
              isCollectRoute && !isTelemetryDisabled
                ? () => {
                    pushEvent(computeContactSupportEvent())
                  }
                : undefined,
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
                    if (!isTelemetryDisabled) {
                      await pushEvent(
                        computeExitEvent({
                          source: TELEMETRY_EVENT_EXIT_SOURCE.LOGOUT,
                        }),
                      )
                      if (triggerBatchTelemetryCallback) {
                        await triggerBatchTelemetryCallback()
                      }
                    }
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
  'home link title' | 'quick access support' | 'quick access logout'
>()({ Header })

export type I18n = typeof i18n
