import { PAGE_TYPE } from '@/constants/page'
import type { Translations } from '@/i18n/types'

export const translations: Translations<'en'> = {
  Footer: {
    license: (
      <>
        This site uses Insee's 'Stromae' and 'Lunatic' applications, which are
        under{' '}
        <a
          title="MIT license - new window"
          href="https://github.com/InseeFrLab/stromae-dsfr/blob/main/LICENSE"
          target="_blank"
        >
          MIT license
        </a>
        , based on the State's design system available under{' '}
        <a
          href="https://github.com/etalab/licence-ouverte/blob/master/LO.md"
          title="etalab-2.0 license - new window"
          target="_blank"
        >
          etalab-2.0 license
        </a>
        .
      </>
    ),
  },
  Header: {
    'home link title':
      'Home - Name of the entity (ministry, state secretariat, government)',
    'quick access support': 'Need help?',
    'quick access logout': 'Log out',
    'quick access portal': 'Back to the portal',
  },
  AutoLogoutCountdown: {
    'paragraph still there': 'Are you still there?',
    'paragraph logged out in': ({ secondsLeft }) =>
      `You will be logged out in ${secondsLeft}`,
  },
  ErrorComponent: {
    'error button redirect to': ({ redirectTo }) => {
      switch (redirectTo) {
        case 'portal':
          return 'Return to portal'
        case 'visualizeForm':
          return 'Return to the visualization form'
        case 'home':
        default:
          return 'Return to the homepage'
      }
    },
  },
  WelcomePage: {
    title: 'Welcome to your survey questionnaire',
    paragraph:
      'This survey allows us to gather more information on the relevant field',
    'document title': 'Questionnaire homepage',
  },
  WelcomeModal: {
    title: 'Welcome',
    'button first page': 'Return to the first page',
    'button go back': 'Resume where I left off',
    content:
      'You have already started filling out the questionnaire. Would you like to resume where you left off or return to the first page?',
  },
  EndPage: {
    title: 'Thank you for your participation in this survey.',
    paragraph: ({ formattedDate }) =>
      formattedDate
        ? `Your responses were sent on ${formattedDate}.`
        : 'Your responses were sent.',
    'document title': 'End of questionnaire',
  },
  ValidationPage: {
    title: 'You have reached the end of the questionnaire',
    paragraph:
      'Once submitted, you will not be able to modify your responses, and you can download a receipt.',
    'document title': 'Sending the questionnaire',
  },
  ValidationModal: {
    title: 'Do you want to submit your responses',
    'button cancel': 'Cancel',
    'button validate': 'Submit my responses',
    content:
      'You are about to submit your responses to the questionnaire. After submission, you will not be able to modify your responses.',
  },
  ExitModal: {
    title: 'Do you want to leave the questionnaire?',
    'button cancel': 'Cancel',
    'button validate': 'I understand',
    content:
      'If you leave the questionnaire, your responses will be saved. You can return to the questionnaire at any time to complete or finalize it.',
  },
  SequenceHeader: {
    'stepper state': ({ currentStep, stepCount }) =>
      `Step ${currentStep} of ${stepCount}`,
  },
  SurveyContainer: {
    'button continue label': ({ currentPage }) => {
      switch (currentPage) {
        case PAGE_TYPE.WELCOME:
          return 'Start'
        case PAGE_TYPE.LUNATIC:
          return 'Continue'
        case PAGE_TYPE.END:
          return 'Download the receipt'
        case PAGE_TYPE.VALIDATION:
          return 'Submit my responses'
      }
    },
    'button continue title': ({ currentPage }) => {
      if (currentPage === PAGE_TYPE.END)
        return 'Download the acknowledgment of receipt'
      return 'Proceed to the next step'
    },
    'button download data': 'Download data',
    'button download articulation': 'Download articulation table',
    'button expand': 'Expand view',
    'button previous title': 'Return to the previous step',
    'button previous label': 'Previous',
  },
  VTLDevTools: {
    'fab button': 'Console VTL',
    'clean error': 'Clear Errors',
    'table title': 'VTL Runtime Error List',
    'table header expression': 'Expression',
    'table header bindings': 'Bindings',
    'table header message': 'Error Message',
    'table header page': 'Page',
  },
  AccessibilityPage: {
    'accessibility title': 'Accessibility',
    'declaration content': ({ fullUrl }) => (
      <>
        <p>
          Insee is committed to making its websites, intranet, extranet, and its
          software accessible (and its mobile applications and digital urban
          furniture) in accordance with Article 47 of Law No. 2005-102 of
          February 11, 2005.
        </p>
        <p>To this end, it implements the following strategy and actions:</p>
        <ul>
          <li>Multi-year accessibility plan 2022-2024;</li>
          <li>Action plans for 2023, 2024.</li>
        </ul>
        <p>These documents are available upon request.</p>
        <p>
          This accessibility statement applies to{' '}
          <a href={fullUrl}>{fullUrl}</a>.
        </p>
      </>
    ),
    'conformity status title': 'Conformity Status',
    'conformity status description': (
      <p>
        The Insee online survey response site is not compliant with the general
        accessibility improvement reference (RGAA), version 4 due to a lack of
        an ongoing compliance audit.
      </p>
    ),
    'test results title': 'Test Results',
    'test results content': (
      <p>
        This statement will be updated as soon as the results of the compliance
        audit are known.
      </p>
    ),
    'non accessible content title': 'Non-Accessible Content',
    'non accessible content content': <p>Not applicable.</p>,
    'disproportionate burden title': 'Exemptions for Disproportionate Burden',
    'disproportionate burden content': <p>Not applicable.</p>,
    'non submitted content title':
      'Content Not Subject to Accessibility Obligation',
    'non submitted content content': <p>Not applicable.</p>,
    'establishment title': 'Establishment of this Accessibility Statement',
    'establishment content': (
      <p>
        This statement was established on July 9, 2024, by the Insee Digital
        Accessibility Network (Rani).
      </p>
    ),
    'technologies used title': 'Technologies Used for the Site Development',
    'technologies used content': (
      <ul>
        <li>HTML5</li>
        <li>CSS</li>
        <li>Javascript</li>
        <li>React</li>
      </ul>
    ),
    'test environment title': 'Test Environment',
    'test environment content': <p>Not applicable.</p>,
    'evaluation tools title': 'Accessibility Evaluation Tools',
    'evaluation tools content': <p>Not applicable.</p>,
    'evaluated pages title':
      'Pages of the Site That Have Been Verified for Conformity',
    'evaluated pages content': <p>Not applicable.</p>,
    'feedback contact title': 'Feedback and Contact',
    'feedback contact content': (
      <p>
        If you are unable to access content or a service, you can contact
        support to be directed to an accessible alternative or to obtain the
        content in another form.
      </p>
    ),
    'recourse title': 'Recourse',
    'recourse content': (
      <>
        <p>
          If you notice an accessibility defect preventing you from accessing
          content or a functionality of the site, you can report it and if you
          do not receive a response, you are entitled to send your complaints or
          a request to the Defender of Rights.
        </p>
        <ul>
          <li>
            <a
              href="https://formulaire.defenseurdesdroits.fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              Write a message to the Defender of Rights (via the contact form)
            </a>
          </li>
          <li>
            <a
              href="https://www.defenseurdesdroits.fr/carte-des-delegues"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact the Defender of Rights delegate in your region
            </a>
          </li>
          <li>
            Send a letter by mail (free, no stamp required) to the following
            address:<div>Défenseur des droits</div>
            <div>Libre réponse 71120</div>
            <div>75342 Paris CEDEX 07</div>
          </li>
          <li>Contact the Defender of Rights by phone: 09 69 39 00 00.</li>
        </ul>
      </>
    ),
  },
  LegalsPage: {
    'legals title': 'Legal Mentions',
    'service title': 'Service Presentation',
    'service content': (
      <>
        The online response service is intended for households and businesses
        that are surveyed as part of a public statistics survey. These users can
        enter their questionnaires directly online via the Internet.
        <br />
        To access the online response service, the user must identify themselves
        by providing their access code and password found in the letter sent to
        them.
        <br />
        The user of the service can interrupt the completion of the
        questionnaire without losing the information they have entered. The
        responses are saved automatically with each page change. Once the
        questionnaire is completed, the user submits the questionnaire by
        clicking the "Send my responses" button.
      </>
    ),
    'survey legals terms title': 'Legal Terms of the Survey',
    'survey legals terms content':
      'It is listed on the promotion portal of this survey.',
    'cookies title': 'Cookie Management',
    'cookies content':
      'This portal does not use any cookies requiring user consent. Therefore, you do not need to accept their use before continuing your navigation.',
    'session title': 'Session',
    'session content': (
      <>
        As soon as the user is identified, a session is established with the
        server. <br />
        <br />
        If the user remains inactive for more than 15 minutes in the
        questionnaire response service, the session is interrupted. Insee
        considers that after this period, the user has likely left the site
        without closing the session, posing a confidentiality risk for the
        entered information. The user can access the questionnaire again by
        identifying themselves.
      </>
    ),
    'copyright title': 'Copyright',
    'copyright content':
      'Any reproduction for purposes other than strictly private of the brands and logos displayed on this site is strictly prohibited.',
    'editor information title': 'Publisher Information',
    'editor information content': (
      <>
        National Institute of Statistics and Economic Studies CS 70058 <br />
        <br />
        88 Verdier Avenue
        <br />
        <br />
        92541 MONTROUGE CEDEX FRANCE
        <br />
        <br />
        Tel.: 01 87 69 50 00
      </>
    ),
    'design production title': 'Design and development',
    'design production content':
      'Dylan DECRULLE from the National Service of Computer Development of Lille',
    'personal data title': 'Personal Data',
    'personal data content': (
      <>
        <a href="https://www.insee.fr/fr/information/3719162">Personal Data</a>
      </>
    ),
  },
  NavigationAssistancePage: {
    'navigation assistance title': 'Navigation assistance',
    'navigation assistance content': (
      <>
        <p>
          The "Previous" and "Continue" buttons allow you to navigate through
          the questionnaire.
        </p>
        <p>
          Your responses are saved each time you change the page but are not
          transmitted. As long as you have not submitted it, you can return to
          the questionnaire at any time to complete or finalize it.
        </p>
        <p>
          The "Submit my responses" button, accessible at the end of the
          questionnaire, allows you to send your completed questionnaire to our
          services and download your receipt.
        </p>
      </>
    ),
  },
  SecurityPage: {
    'security title': 'Security',
    'security content': ({ fullUrl }) => (
      <p>
        The site <a href={fullUrl}>{fullUrl}</a> has been subject to an approval
        decision issued by the approval authority on behalf of the qualified
        authority for information system security.
      </p>
    ),
  },
  SiteMapPage: {
    'sitemap title': 'Site map',
  },
  VisualizeForm: {
    'form title': 'Survey preview.',
    'source file title': 'Survey source file.',
    'metadata file title': 'Survey metadata file.',
    'data file title': 'Survey data file.',
    'source file error': 'You must provide at least one source file URI',
    'source label': 'Source URI.',
    'metadata label': 'Metadata URI',
    'data label': 'Data URI.',
    'hint text': 'a valid url',
    'state related message': 'Validation / error explanation text',
    'submit button': 'Preview the questionnaire',
  },
  SelectNomenclatures: {
    'nomenclatures title': 'Suggestion references.',
    'nomenclatures description': `
      Add new suggestion references. To be used, they
      must also appear in the suggesters section of the source file.
    `,
    'add nomenclature button': 'Add a new reference',
    'name label': 'Name',
    'uri label': 'Uri',
    'delete button title': 'Delete',
  },
  errorNormalizer: {
    'notFound.title': 'Page not found',
    'notFound.subtitle':
      'The page you are looking for cannot be found. We apologize for the inconvenience.',
    'notFound.paragraph':
      'If you typed the web address in the browser, please check that it is correct. The page may no longer be available. In this case, to continue your visit, you can return to the homepage. Otherwise, contact us so we can help you.',
    'connectionError.title': 'Connection error',
    'connectionError.subtitle':
      'An error occurred while connecting to the server.',
    'connectionError.paragraph':
      'Please check your Internet connection and try again. If the problem persists, please contact your Internet service provider or the site administrator for assistance.',
    'resourceNotFound.title': 'Resource not found',
    'resourceNotFound.subtitle':
      'The resource you are looking for cannot be found on the server.',
    'resourceNotFound.paragraph':
      'Please check the URL you entered or contact the site administrator for assistance.',
    'unauthorized.title': 'Unauthorized',
    'unauthorized.subtitle':
      'You do not have permission to access this resource.',
    'unauthorized.paragraph':
      'Please log in with the appropriate credentials or contact the site administrator for assistance.',
    'forbidden.title': 'Access denied',
    'forbidden.subtitle': 'You are not authorized to access this resource.',
    'forbidden.paragraph':
      'Please contact the site administrator for assistance.',
    'badRequest.title': 'Bad request',
    'badRequest.subtitle': 'The request you sent is incorrect or malformed.',
    'badRequest.paragraph': 'Please check the data you sent and try again.',
    'serverError.title': 'Internal server error',
    'serverError.subtitle':
      'An error occurred on the server side. Please try again later.',
    'serverError.paragraph':
      'If the problem persists, please contact the site administrator for assistance.',
    'unhandledError.title': 'Unhandled error',
    'unhandledError.subtitle': 'An error occurred during the request.',
    'unhandledError.paragraph':
      'Please try again later or contact the site administrator for assistance.',
    'unknownError.title': 'Unknown error',
    'unknownError.subtitle': 'An unexpected error occurred.',
    'unknownError.paragraph':
      'Please try again later or contact the site administrator for assistance.',
    'validationError.title': 'Validation Error',
    'validationError.subtitle': ({ name }) => `${name}'s file is not valid.`,
  },
}
