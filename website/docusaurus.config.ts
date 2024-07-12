import type * as Preset from '@docusaurus/preset-classic'
import type { Config } from '@docusaurus/types'
import { themes as prismThemes } from 'prism-react-renderer'

const config: Config = {
  title: 'Stromae',
  tagline: `Orchestrateur web de la filière d'enquête de l'Insee`,
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://inseefr.github.io/',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/stromae-dsfr',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Inseefr', // Usually your GitHub org/user name.
  projectName: 'stromae-dsfr', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/InseeFr/stromae-dsfr/tree/main/website',
        },
        blog: false,
        theme: {
          customCss: ['./src/css/custom.css', './src/css/main.css'],
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Stromae',
      logo: {
        alt: 'My Site Logo',
        src: 'assets/logo/logo-insee.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          href: 'https://github.com/Inseefr/stromae-dsfr',
          label: 'Github',
          position: 'right',
        },
      ],
    },
    footer: {
      logo: {
        src: 'assets/logo/Logo_Insee.svg',
      },
      links: [
        {
          label: 'Code source',
          href: 'https://github.com/InseeFr/stromae-dsfr',
        },
        {
          label: 'Issues',
          href: 'https://github.com/InseeFr/Stromae-dsfr/issues',
        },
      ],
      copyright: `Sauf mention contraire, tous les contenus de ce site sont sous <a href="https://github.com/InseeFrLab/stromae-dsfr/blob/main/LICENSE">licence MIT</a>`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
}

export default config
