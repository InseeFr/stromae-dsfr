import { fr } from '@codegouvfr/react-dsfr'
import { Footer as DSFRFooter } from '@codegouvfr/react-dsfr/Footer'
import { useTranslation } from 'react-i18next'

import { MODE_TYPE } from '@/constants/mode'
import { useMode } from '@/hooks/useMode'
import { resolveLocalizedString } from '@/libs/i18n/utils'
import type { Logo } from '@/models/metadata'
import { useMetadataStore } from '@/stores/useMetadataStore'

const transformLogo = (logo: Logo) => ({
  alt: resolveLocalizedString(logo.label),
  imgUrl: logo.url,
})

//TODO : alt logo
export function Footer() {
  const { t } = useTranslation()
  const { mainLogo, secondariesLogo } = useMetadataStore()

  const mode = useMode()
  const isCollect = mode === MODE_TYPE.COLLECT

  const partnersLogos = secondariesLogo
    ? {
        main: transformLogo(secondariesLogo[0]),
        sub: secondariesLogo.slice(1).map((logo) => transformLogo(logo)),
      }
    : undefined

  function openLinkInNewTab(e: any) {
    e.preventDefault()
    window.open(e.nativeEvent.target.href, '_blank')
  }

  return (
    <DSFRFooter
      accessibility="partially compliant"
      license={t('footer.license')}
      homeLinkProps={{
        search: true,
        title: t('header.homeLinkTitle'),
        // needs a href to prevent the default redirection to the homepage.
        // we assume it is a link pointing to the current url
        href: '#',
      }}
      websiteMapLinkProps={{
        to: '/plan-du-site',
        onClick: isCollect ? openLinkInNewTab : undefined,
      }}
      accessibilityLinkProps={{
        to: '/accessibilite',
        onClick: isCollect ? openLinkInNewTab : undefined,
      }}
      termsLinkProps={{
        to: '/mentions-legales',
        onClick: isCollect ? openLinkInNewTab : undefined,
      }}
      operatorLogo={{
        alt: resolveLocalizedString(mainLogo.label),
        imgUrl: mainLogo.url,
        orientation: 'horizontal',
      }}
      partnersLogos={partnersLogos}
      domains={[
        'cnis.fr',
        'ec.europa.eu/eurostat',
        'insee.fr',
        'service-public.fr',
      ]}
      bottomItems={[
        {
          text: t('footer.securityPage.title'),
          linkProps: {
            to: '/securite',
            onClick: isCollect ? openLinkInNewTab : undefined,
          },
        },
        {
          text: t('footer.navigationAssistance.title'),
          linkProps: {
            to: '/aide-a-la-navigation',
            onClick: isCollect ? openLinkInNewTab : undefined,
          },
        },
        <span key={'app-versions'} className={fr.cx('fr-footer__bottom-link')}>
          Stromae : {import.meta.env.APP_VERSION} | Lunatic :{' '}
          {import.meta.env.LUNATIC_VERSION.replace('^', '')}
        </span>,
      ]}
    />
  )
}
