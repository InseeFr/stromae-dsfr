import { MODE_TYPE } from '@/constants/mode'
import {
  declareComponentKeys,
  useResolveLocalizedString,
  useTranslation,
} from '@/i18n'
import type { Logo } from '@/model/Metadata'
import { NavigationAssistancePage } from '@/pages/NavigationAssistance/NavigationAssistancePage'
import { SecurityPage } from '@/pages/Security/SecurityPage'
import { useMode } from '@/shared/hooks/useMode'
import { useMetadataStore } from '@/shared/metadataStore/useMetadataStore'
import { fr } from '@codegouvfr/react-dsfr'
import { Footer as DSFRFooter } from '@codegouvfr/react-dsfr/Footer'
import { Header } from './Header'

const transformLogo = (
  logo: Logo,
  resolveLocalizedString: ReturnType<
    typeof useResolveLocalizedString
  >['resolveLocalizedStringDetailed'],
) => ({
  alt: resolveLocalizedString(logo.label).str,
  imgUrl: logo.url,
})

export function Footer() {
  const { t } = useTranslation({
    Footer,
  })
  const { resolveLocalizedStringDetailed } = useResolveLocalizedString({
    labelWhenMismatchingLanguage: true,
  })
  const { t: t_Header } = useTranslation({ Header })
  const { t: t_NavigationAssistancePage } = useTranslation({
    NavigationAssistancePage,
  })

  const { t: t_SecurityPage } = useTranslation({
    SecurityPage,
  })

  const { mainLogo, secondariesLogo } = useMetadataStore()

  const mode = useMode()
  const isCollect = mode === MODE_TYPE.COLLECT

  const partnersLogos = secondariesLogo
    ? {
        main: transformLogo(secondariesLogo[0], resolveLocalizedStringDetailed),
        sub: secondariesLogo
          .slice(1)
          .map((logo) => transformLogo(logo, resolveLocalizedStringDetailed)),
      }
    : undefined

  function openLinkInNewTab(e: any) {
    e.preventDefault()
    window.open(e.nativeEvent.target.href, '_blank')
  }

  return (
    <DSFRFooter
      accessibility="non compliant"
      license={t('license')}
      homeLinkProps={{
        search: true,
        title: t_Header('home link title'),
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
        alt: resolveLocalizedStringDetailed(mainLogo.label).str,
        imgUrl: mainLogo.url,
        orientation: 'vertical',
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
          text: t_SecurityPage('security title'),
          linkProps: {
            to: '/securite',
            onClick: isCollect ? openLinkInNewTab : undefined,
          },
        },
        {
          text: t_NavigationAssistancePage('navigation assistance title'),
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { i18n } = declareComponentKeys<{ K: 'license'; R: JSX.Element }>()({
  Footer,
})

export type I18n = typeof i18n
