import { useMemo } from 'react'

import { headerFooterDisplayItem } from '@codegouvfr/react-dsfr/Display'
import { Header as DsfrHeader } from '@codegouvfr/react-dsfr/Header'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { useSearch } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import { MODE_TYPE } from '@/constants/mode'
import { TELEMETRY_EVENT_EXIT_SOURCE } from '@/constants/telemetry'
import { useTelemetry } from '@/contexts/TelemetryContext'
import { executePreLogoutActions } from '@/hooks/prelogout'
import { useMode } from '@/hooks/useMode'
import { resolveLocalizedString } from '@/libs/i18n/utils'
import { useOidc } from '@/oidc'
import { collectPath } from '@/pages/collect/route'
import { useMetadataStore } from '@/stores/useMetadataStore'
import { computeContactSupportEvent, computeExitEvent } from '@/utils/telemetry'
import { createSafeUrl, decodeUrlSafeBase64 } from '@/utils/url'

import { ExitModal } from '../orchestrator/customPages/ExitModal'

export function Header() {
  const { t } = useTranslation()
  const { isUserLoggedIn } = useOidc()
  const mode = useMode()

  const { label: serviceTitle, mainLogo } = useMetadataStore()
  const { isTelemetryEnabled, pushEvent, triggerBatchTelemetryCallback } =
    useTelemetry()

  /**
   * There is an issue with this part of the code: the search type is not well narrowed with isCollectRoute. I'm waiting for a better solution.
   */
  const isCollectRoute = mode === MODE_TYPE.COLLECT

  const search = useSearch({ strict: false })

  const surveyUnitCompositeName = decodeUrlSafeBase64(
    search?.surveyUnitCompositeName,
  )
  const pathAssistance = decodeUrlSafeBase64(search?.pathAssistance)

  const assistanceHref = createSafeUrl(
    import.meta.env.VITE_PORTAIL_URL,
    pathAssistance,
  )

  const exitModal = useMemo(
    () =>
      createModal({
        id: 'exitModal',
        isOpenedByDefault: false,
      }),
    [],
  )

  const goToPortal = async () => {
    await executePreLogoutActions()
    if (isTelemetryEnabled) {
      await pushEvent(
        computeExitEvent({
          source: TELEMETRY_EVENT_EXIT_SOURCE.LOGOUT,
        }),
      )
      if (triggerBatchTelemetryCallback) {
        await triggerBatchTelemetryCallback()
      }
    }
    window.location.href = createSafeUrl(
      import.meta.env.VITE_PORTAIL_URL,
      import.meta.env.VITE_EXIT_PATH,
    )
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
          title: t('header.homeLinkTitle'),
          // needs a href to prevent the default redirection to the homepage.
          // we assume it is a link pointing to the current url
          href: '#',
        }}
        quickAccessItems={[
          headerFooterDisplayItem || {},
          {
            iconId: 'fr-icon-customer-service-fill',
            linkProps: {
              href: collectPath ? assistanceHref : '',
              disabled: isCollectRoute,
              onClick:
                isCollectRoute && isTelemetryEnabled
                  ? () => {
                      pushEvent(computeContactSupportEvent())
                    }
                  : undefined,
            },
            text: t('header.quickAccessSupport'),
          },
          ...(!isUserLoggedIn
            ? []
            : [
                {
                  iconId: 'ri-account-box-line',
                  buttonProps: {
                    onClick: exitModal?.open,
                    disabled: !isCollectRoute,
                  },
                  text: t('header.quickAccessPortal'),
                } as const,
              ]),
        ]}
        serviceTagline={surveyUnitCompositeName}
        serviceTitle={resolveLocalizedString(serviceTitle)}
        operatorLogo={{
          alt: resolveLocalizedString(mainLogo.label),
          imgUrl: mainLogo.url,
          orientation: 'horizontal',
        }}
      />
      <ExitModal modal={exitModal} navigatePortal={goToPortal} />
    </>
  )
}
