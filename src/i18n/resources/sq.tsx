import Badge from '@codegouvfr/react-dsfr/Badge'
import type { Translations } from 'i18n/types'

export const translations: Translations<'sq'> = {
  Footer: {
    'footer operator logo alt': 'Insee, mat për të kuptuar',
    'footer content description':
      'Matni për të kuptuar: përgjigjuni për një të ardhme të informuar.',
    license: (
      <>
        Ky sajt përdor aplikacionet e Insee 'Stromae' dhe 'Lunatic', të cilat
        janë nën{' '}
        <a
          title="licencë MIT - dritare e re"
          href="https://github.com/InseeFrLab/stromae-dsfr/blob/main/LICENSE"
          target="_blank"
        >
          licencë MIT
        </a>
        , bazuar në sistemin e dizajnit të Shtetit të disponueshëm nën{' '}
        <a
          href="https://github.com/etalab/licence-ouverte/blob/master/LO.md"
          title="licencë etalab-2.0 - dritare e re"
          target="_blank"
        >
          licencë etalab-2.0
        </a>
        .
      </>
    ),
  },
  Header: {
    'home link title':
      'Faqja kryesore - Emri i entitetit (ministria, sekretariati i shtetit, qeveria)',
    'quick access support': 'Kontakto asistencën',
    'quick access logout': 'Dil',
    'service tag line': 'Aplikacioni i mbledhjes në internet',
    'service title': (
      <>
        Sektori i anketës{' '}
        <Badge as="span" noIcon severity="success">
          Beta
        </Badge>
      </>
    ),
    'operator logo alt': 'Insee, mat për të kuptuar',
  },
  ErrorComponent: {
    'error button redirect to': ({ redirectTo }) => {
      switch (redirectTo) {
        case 'portal':
          return 'Kthehu në portal'
        case 'visualizeForm':
          return 'Kthehu te formulari i vizualizimit'
        case 'home':
        default:
          return 'Kthehu në faqen kryesore'
      }
    },
  },
  WelcomePage: {
    title: 'Mirë se vini në pyetësorin e anketës tuaj',
    paragraph:
      'Kjo anketë na lejon të mbledhim më shumë informacione mbi fushën përkatëse',
    'title who answer': 'Kush duhet ta përgjigjet këtë pyetësor?',
  },
  WelcomeModal: {
    title: 'Mirë se vini',
    'button first page': 'Kthehu në faqen e parë',
    'button go back': 'Vazhdo aty ku kam mbetur',
    content:
      'Ju tashmë keni filluar të plotësoni pyetësorin. Dëshironi të vazhdoni aty ku keni mbetur apo të ktheheni në faqen e parë?',
  },
  EndPage: {
    title: 'Ju falënderojmë për bashkëpunimin tuaj në këtë anketë.',
    paragraph: ({ formatedDate }) =>
      `Përgjigjet tuaja janë dërguar më ${formatedDate}.`,
  },
  ValidationPage: {
    title: 'Ju keni arritur në fund të pyetësorit',
    paragraph:
      'Pasi të dërgoni, nuk do të mund të modifikoni më përgjigjet tuaja dhe mund të shkarkoni një njoftim për pranimin.',
  },
  ValidationModal: {
    title: 'Dëshironi të dërgoni përgjigjet tuaja',
    'button cancel': 'Anulo',
    'button validate': 'Dërgo përgjigjet e mia',
    content:
      'Jeni gati të dërgoni përgjigjet tuaja në pyetësor. Pasi të dërgoni, nuk do të mund të modifikoni më përgjigjet tuaja.',
  },
  SequenceHeader: {
    'stepper state': ({ currentStep, stepCount }) =>
      `Hapi ${currentStep} nga ${stepCount}`,
  },
  SurveyContainer: {
    'button continue label': ({ currentPage }) => {
      switch (currentPage) {
        case 'welcomePage':
          return 'Fillo'
        case 'lunaticPage':
          return 'Vazhdo'
        case 'endPage':
          return 'Shkarko njoftimin për pranimin'
        case 'validationPage':
          return 'Dërgo përgjigjet e mia'
      }
    },
    'button continue title': ({ currentPage }) => {
      switch (currentPage) {
        case 'endPage':
          return 'Shkarkoni konfirmimin e pranimit'
        default:
          return 'Kaloni në hapin tjetër'
      }
    },
    'button download': 'Shkarko të dhënat',
    'button expand': 'Zgjero pamjen',
    'button previous title': 'Kthehu në hapin e mëparshëm',
    'button previous label': 'I mëparshmi',
  },
  AccessibilityPage: {
    'accessibility title': 'Aksesueshmëria',
  },
  LegalsPage: {
    'legals title': 'Përmendjet Ligjore',
    'service title': 'Prezantimi i Shërbimit',
    'service content': (
      <>
        Shërbimi i përgjigjeve online është i destinuar për familjet dhe
        bizneset që janë të anketuara si pjesë e një ankete statistikore
        publike. Këta përdorues mund t'i fusin pyetësorët e tyre drejtpërdrejt
        në internet.
        <br />
        Për të hyrë në shërbimin e përgjigjeve online, përdoruesi duhet të
        identifikohet duke dhënë kodin e tij të hyrjes dhe fjalëkalimin të
        listuara në letrën që i është dërguar.
        <br />
        Përdoruesi i shërbimit mund të ndërpresë plotësimin e pyetësorit pa
        humbur informacionin që ka futur. Përgjigjet ruhen automatikisht me çdo
        ndryshim faqeje. Pasi pyetësori të përfundojë, përdoruesi e dorëzon
        pyetësorin duke klikuar butonin "Dërgo përgjigjet e mia".
      </>
    ),
    'survey legals terms title': 'Kuadri Ligjor i Anketës',
    'survey legals terms content':
      'Është i listuar në portalin promovues të kësaj ankete.',
    'cookies title': 'Menaxhimi i Cookies',
    'cookies content':
      'Ky portal nuk përdor asnjë cookie që kërkon pëlqimin e përdoruesve. Prandaj, ju nuk keni nevojë të pranoni përdorimin e tyre përpara se të vazhdoni navigimin tuaj.',
    'session title': 'Seanca',
    'session content': (
      <>
        Sapo përdoruesi të jetë identifikuar, një seancë vendoset me serverin.{' '}
        <br />
        <br />
        Nëse përdoruesi qëndron pasiv për më shumë se 15 minuta në shërbimin e
        përgjigjeve të pyetësorit, seanca ndërpritet. Insee konsideron se pas
        kësaj periudhe, përdoruesi ka lënë faqen pa mbyllur seancën, duke
        paraqitur një rrezik të konfidencialitetit të informacionit të futur.
        Përdoruesi mund të hyjë përsëri në pyetësor duke u identifikuar.
      </>
    ),
    'copyright title': 'Të Drejtat e Autorit',
    'copyright content':
      'Çdo riprodhim për qëllime të tjera përveç atyre strikt private të markave dhe logove të shfaqura në këtë faqe është rreptësisht i ndaluar.',
    'editor information title': 'Informacioni i Botuesit',
    'editor information content': (
      <>
        Instituti Kombëtar i Statistikave dhe Studimeve Ekonomike CS 70058{' '}
        <br />
        <br />
        88 Rruga Verdier
        <br />
        <br />
        92541 MONTROUGE CEDEX FRANCE
        <br />
        <br />
        Tel.: 01 87 69 50 00
      </>
    ),
    'design production title': 'Dizajn dhe zhvillim',
    'design production content':
      'Dylan DECRULLE nga Shërbimi Kombëtar i Zhvillimit Informatik të Lille',
    'personal data title': 'Të Dhënat Personale',
    'personal data content': (
      <>
        <a href="https://www.insee.fr/fr/information/3719162">
          Të Dhënat Personale
        </a>
      </>
    ),
  },
  NavigationAssistancePage: {
    'navigation assistance title': 'Ndihmë për navigimin',
    'navigation assistance content': (
      <>
        <p>
          Butonat "I mëparshmi" dhe "Vazhdo" ju lejojnë të navigoni nëpër
          pyetësor.
        </p>
        <p>
          Përgjigjet tuaja ruhen sa herë që ndryshoni faqen por nuk janë të
          transmetuara. Përderisa nuk e keni transmetuar, mund të ktheheni në
          pyetësor në çdo kohë për ta plotësuar ose përfunduar atë.
        </p>
        <p>
          Butoni "Dërgo përgjigjet e mia", i disponueshëm në fund të pyetësorit,
          ju lejon të transmetoni pyetësorin tuaj të plotësuar në shërbimet tona
          dhe të shkarkoni njoftimin për pranimin.
        </p>
      </>
    ),
  },
  SecurityPage: {
    'security title': 'Siguria',
  },
  SiteMapPage: {
    'sitemap title': 'Harta e sajtit',
  },
  VisualizeForm: {
    'form title': 'Parashikimi i anketës.',
    'source file title': 'Dosja burimore e anketës.',
    'metadata file title': 'Dosja e metadhenave të anketës.',
    'data file title': 'Dosja e të dhënave të anketës.',
    'source file error':
      'Ju duhet të siguroni të paktën një URI të dosjes burimore',
    'source label': 'URI Burimore.',
    'metadata label': 'URI e metadhenave',
    'data label': 'URI e të dhënave.',
    'hint text': 'një URL e vlefshme',
    'state related message': 'Teksti i vlefshmërisë / shpjegimi i gabimit',
    'submit button': 'Parashiko pyetësorin',
  },
  SelectNomenclatures: {
    'nomenclatures title': 'Referencat e sugjerimeve.',
    'nomenclatures description': `
      Shtoni referenca të reja sugjerimesh. Për t'u përdorur, ato
      duhet të shfaqen gjithashtu në seksionin e sugjeruesve të dosjes burimore.
    `,
    'add nomenclature button': 'Shto një referencë të re',
    'name label': 'Emri',
    'uri label': 'Uri',
    'delete button title': 'Fshi',
  },
  errorNormalizer: {
    'notFound.title': 'Faqja nuk u gjet',
    'notFound.subtitle':
      'Faqja që po kërkoni nuk mund të gjendet. Kërkojmë falje për shqetësimin.',
    'notFound.paragraph':
      "Nëse keni shtypur adresën e internetit në shfletues, ju lutem kontrolloni që është e saktë. Faqja mund të mos jetë më e disponueshme. Në këtë rast, për të vazhduar vizitën tuaj mund të ktheheni në faqen kryesore. Përndryshe, na kontaktoni që të mund t'ju ndihmojmë.",
    'connectionError.title': 'Gabim në lidhje',
    'connectionError.subtitle': 'Ndodhi një gabim gjatë lidhjes me serverin.',
    'connectionError.paragraph':
      'Ju lutem kontrolloni lidhjen tuaj të internetit dhe provoni përsëri. Nëse problemi vazhdon, ju lutem kontaktoni ofruesin tuaj të shërbimit të internetit ose administratorin e faqes për ndihmë.',
    'resourceNotFound.title': 'Burimi nuk u gjet',
    'resourceNotFound.subtitle':
      'Burimi që po kërkoni nuk mund të gjendet në server.',
    'resourceNotFound.paragraph':
      'Ju lutem kontrolloni URL-në që keni futur ose kontaktoni administratorin e faqes për ndihmë.',
    'unauthorized.title': 'E paautorizuar',
    'unauthorized.subtitle': 'Nuk keni leje për të hyrë në këtë burim.',
    'unauthorized.paragraph':
      'Ju lutem hyni me kredencialet e duhura ose kontaktoni administratorin e faqes për ndihmë.',
    'forbidden.title': 'Qasja e ndaluar',
    'forbidden.subtitle': 'Nuk keni leje për të hyrë në këtë burim.',
    'forbidden.paragraph':
      'Ju lutem kontaktoni administratorin e faqes për ndihmë.',
    'badRequest.title': 'Kërkesë e gabuar',
    'badRequest.subtitle':
      'Kërkesa që keni dërguar është e gabuar ose e formatuar gabim.',
    'badRequest.paragraph':
      'Ju lutem kontrolloni të dhënat që keni dërguar dhe provoni përsëri.',
    'serverError.title': 'Gabim i brendshëm i serverit',
    'serverError.subtitle':
      'Ndodhi një gabim në anën e serverit. Ju lutem provoni më vonë.',
    'serverError.paragraph':
      'Nëse problemi vazhdon, ju lutem kontaktoni administratorin e faqes për ndihmë.',
    'unhandledError.title': 'Gabim i pa trajtuar',
    'unhandledError.subtitle': 'Ndodhi një gabim gjatë kërkesës.',
    'unhandledError.paragraph':
      'Ju lutem provoni më vonë ose kontaktoni administratorin e faqes për ndihmë.',
    'unknownError.title': 'Gabim i panjohur',
    'unknownError.subtitle': 'Ndodhi një gabim i papritur.',
    'unknownError.paragraph':
      'Ju lutem provoni më vonë ose kontaktoni administratorin e faqes për ndihmë.',
  },
}
