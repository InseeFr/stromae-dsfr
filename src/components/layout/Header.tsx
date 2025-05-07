import { useState } from 'react'

import { headerFooterDisplayItem } from '@codegouvfr/react-dsfr/Display'
import { Header as DsfrHeader } from '@codegouvfr/react-dsfr/Header'
import { useSearch } from '@tanstack/react-router'

import { MODE_TYPE } from '@/constants/mode'
import { TELEMETRY_EVENT_EXIT_SOURCE } from '@/constants/telemetry'
import { useTelemetry } from '@/contexts/TelemetryContext'
import { useMode } from '@/hooks/useMode'
import {
  declareComponentKeys,
  useResolveLocalizedString,
  useTranslation,
} from '@/i18n'
import { collectPath } from '@/pages/collect/route'
import { useMetadataStore } from '@/stores/useMetadataStore'
import {
  computeContactSupportEvent,
  computeExitPortalEvent,
} from '@/utils/telemetry'

import { ExitModal } from '../orchestrator/customPages/ExitModal'

export function Header() {
  const { t } = useTranslation({ Header })
  // const { isUserLoggedIn, logout } = useOidc()
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
  const { isTelemetryDisabled, pushEvent } = useTelemetry()

  /**
   * There is an issue with this part of the code: the search type is not well narrowed with isCollectRoute. I'm waiting for a better solution.
   */
  const isCollectRoute = mode === MODE_TYPE.COLLECT
  const search = useSearch({ strict: false })
  const [open, setOpen] = useState(false)

  const goToPortal = () => {
    if (isCollectRoute && !isTelemetryDisabled) {
      pushEvent(
        computeExitPortalEvent({
          source: TELEMETRY_EVENT_EXIT_SOURCE.PORTAL,
        }),
      )
    }
    window.location.href = import.meta.env.VITE_PORTAIL_URL
  }

  return (
    <>
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
          {
            iconId: 'fr-icon-external-link-line',
            buttonProps: {
              onClick: () => setOpen(true),
            },
            text: t('quick access portal'),
          },
        ]}
        serviceTagline={resolveLocalizedString(surveyUnitIdentifier)}
        serviceTitle={resolveLocalizedString(serviceTitle)}
        operatorLogo={{
          alt: resolveLocalizedStringDetailed(mainLogo.label).str,
          imgUrl: mainLogo.url,
          orientation: 'vertical',
        }}
      />
      <ExitModal navigatePortal={goToPortal} open={open} />
    </>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { i18n } = declareComponentKeys<
  | 'home link title'
  | 'quick access support'
  | 'quick access logout'
  | 'quick access portal'
>()({ Header })

export type I18n = typeof i18n
