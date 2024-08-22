import Badge from '@codegouvfr/react-dsfr/Badge'
import type { Translations } from 'i18n/types'

export const translations: Translations<'fr'> = {
  Footer: {
    'footer operator logo alt': 'Insee, mesurer pour comprendre',
    license: (
      <>
        Ce site utilise les applications Insee 'Stromae' et 'Lunatic', qui sont
        sous{' '}
        <a
          title="licence MIT - nouvelle fenêtre"
          href="https://github.com/InseeFrLab/stromae-dsfr/blob/main/LICENSE"
          target="_blank"
        >
          licence MIT
        </a>
        , en s’appuyant sur le système de design de l'Etat disponible sous{' '}
        <a
          href="https://github.com/etalab/licence-ouverte/blob/master/LO.md"
          title="licence etalab-2.0 - nouvelle fenêtre"
          target="_blank"
        >
          licence etalab-2.0
        </a>
        .
      </>
    ),
  },
  Header: {
    'home link title': 'Application de collecte internet',
    'quick access support': "Contacter l'assistance",
    'quick access logout': 'Se déconnecter',
    'service title': (
      <>
        Filière d'enquête{' '}
        <Badge as="span" noIcon severity="success">
          Beta
        </Badge>
      </>
    ),
    'operator logo alt': 'Insee, mesurer pour comprendre',
  },
  AutoLogoutCountdown: {
    'paragraph still there': 'Êtes-vous toujours là?',
    'paragraph logged out in': ({ secondsLeft }) =>
      `Vous serez déconnecté dans ${secondsLeft} secondes`,
  },
  ErrorComponent: {
    'error button redirect to': ({ redirectTo }) => {
      switch (redirectTo) {
        case 'portal':
          return 'Retourner sur le portail'
        case 'visualizeForm':
          return 'Retourner au formulaire de visualisation'
        case 'home':
        default:
          return "Retourner à la page d'accueil"
      }
    },
  },
  WelcomePage: {
    title: 'Bienvenue sur le questionnaire de votre enquête',
    paragraph:
      "Cette enquête permet de connaître plus d'informations sur le domaine concerné",
    'document title': 'Accueil du questionnaire',
  },
  WelcomeModal: {
    title: 'Bienvenue',
    'button first page': 'Revenir à la première page',
    'button go back': "Reprendre là où j'en étais",
    content:
      'Vous avez déjà commencé à renseigner le questionnaire. Souhaitez-vous reprendre là où vous en étiez ou revenir à la première page ?',
  },
  EndPage: {
    title: 'Nous vous remercions pour votre collaboration à cette enquête.',
    paragraph: ({ formatedDate }) =>
      `Vos réponses ont été envoyées le ${formatedDate}.`,
    'document title': 'Fin du questionnaire',
  },
  ValidationPage: {
    title: 'Vous êtes arrivé à la fin du questionnaire',
    paragraph:
      'Après envoi, vous ne pourrez plus modifier vos réponses et vous pourrez télécharger un accusé de réception.',
    'document title': 'Envoi du questionnaire',
  },
  ValidationModal: {
    title: 'Voulez vous envoyer vos réponses',
    'button cancel': 'Annuler',
    'button validate': 'Envoyer mes réponses',
    content:
      "Vous êtes sur le point d'envoyer vos réponses au questionnaire. Après envoi, vous ne pourrez plus modifier vos réponses.",
  },
  SequenceHeader: {
    'stepper state': ({ currentStep, stepCount }) =>
      `Étape ${currentStep} sur ${stepCount}`,
  },
  SurveyContainer: {
    'button continue label': ({ currentPage }) => {
      switch (currentPage) {
        case 'welcomePage':
          return 'Commencer'
        case 'lunaticPage':
          return 'Continuer'
        case 'endPage':
          return "Télécharger l'accusé de réception"
        case 'validationPage':
          return 'Envoyer mes réponses'
      }
    },
    'button continue title': ({ currentPage }) => {
      switch (currentPage) {
        case 'endPage':
          return "Télécharger l'accusé de réception"
        default:
          return "Passer à l'étape suivante"
      }
    },
    'button download': 'Télécharger les données',

    'button expand': 'Étendre la vue',

    'button previous title': "Revenir à l'étape précédente",
    'button previous label': 'Précédent',
  },
  VTLDevTools: {
    'fab button': 'Console VTL',
    'clean error': 'Vider les erreurs',
    'table title': "Liste des erreurs d'exécution VTL",
    'table header expression': 'Expression',
    'table header bindings': 'Bindings',
    'table header message': "Message d'erreur",
    'table header page': 'Page',
  },
  AccessibilityPage: {
    'accessibility title': 'Accessibilité',
    'declaration content': ({ fullUrl }) => (
      <>
        <p>
          L'Insee s’engage à rendre ses sites internet, intranet, extranet et
          ses progiciels accessibles (et ses applications mobiles et mobilier
          urbain numérique) conformément à l’article 47 de la loi n°2005-102 du
          11 février 2005.
        </p>
        <p>
          À cette fin, elle met en œuvre la stratégie et les actions suivantes :
        </p>
        <ul>
          <li>Schéma pluriannuel de mise en accessibilité 2022-2024 ;</li>
          <li>Plans d’actions 2023, 2024.</li>
        </ul>
        <p>Ces documents sont communicables à la demande.</p>
        <p>
          Cette déclaration d’accessibilité s’applique à{' '}
          <a href={fullUrl}>{fullUrl}</a>.
        </p>
      </>
    ),
    'conformity status title': 'État de conformité',
    'conformity status description': (
      <p>
        Le site de réponse en ligne des enquêtes de l'Insee est non conforme
        avec le référentiel général d’amélioration de l’accessibilité (RGAA),
        version 4 en raison d'une absence d'audit de conformité en cours de
        réalisation.
      </p>
    ),
    'test results title': 'Résultats des tests',
    'test results content': (
      <p>
        La présente déclaration sera mise à jour dès que les résultats de
        l'audit de conformité seront connus.
      </p>
    ),
    'non accessible content title': 'Contenus non accessibles',
    'non accessible content content': <p>Sans objet.</p>,
    'disproportionate burden title': 'Dérogations pour charge disproportionnée',
    'disproportionate burden content': <p>Sans objet.</p>,
    'non submitted content title':
      'Contenus non soumis à l’obligation d’accessibilité',
    'non submitted content content': <p>Sans objet.</p>,
    'establishment title': 'Établissement de cette déclaration d’accessibilité',
    'establishment content': (
      <p>
        Cette déclaration a été établie le 9 juillet 2024 par le réseau
        accessibilité numérique de l'Insee (Rani).
      </p>
    ),
    'technologies used title':
      'Technologies utilisées pour la réalisation du site',
    'technologies used content': (
      <ul>
        <li>HTML5</li>
        <li>CSS</li>
        <li>Javascript</li>
        <li>React</li>
      </ul>
    ),
    'test environment title': 'Environnement de test',
    'test environment content': <p>Sans objet.</p>,
    'evaluation tools title': 'Outils pour évaluer l’accessibilité',
    'evaluation tools content': <p>Sans objet.</p>,
    'evaluated pages title':
      'Pages du site ayant fait l’objet de la vérification de conformité',
    'evaluated pages content': <p>Sans objet.</p>,
    'feedback contact title': 'Retour d’information et contact',
    'feedback contact content': (
      <p>
        Si vous n’arrivez pas à accéder à un contenu ou à un service, vous
        pouvez contacter l'assistance, pour être orienté vers une alternative
        accessible ou obtenir le contenu sous une autre forme.
      </p>
    ),
    'recourse title': 'Voies de recours',
    'recourse content': (
      <>
        <p>
          Si vous constatez un défaut d’accessibilité vous empêchant d’accéder à
          un contenu ou une fonctionnalité du site, que vous nous le signalez et
          que vous ne parvenez pas à obtenir une réponse de notre part, vous
          êtes en droit de faire parvenir vos doléances ou une demande de
          saisine au Défenseur des droits.
        </p>
        <ul>
          <li>
            <a
              href="https://formulaire.defenseurdesdroits.fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              Écrire un message au Défenseur des droits (via le formulaire de
              contact
            </a>
          </li>
          <li>
            <a
              href="https://www.defenseurdesdroits.fr/carte-des-delegues"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contacter le délégué du Défenseur des droits dans votre région
            </a>
          </li>
          <li>
            Envoyer un courrier par la poste (gratuit, ne pas mettre de timbre)
            à l'adresse suivante :<div>Défenseur des droits</div>
            <div>Libre réponse 71120</div>
            <div>75342 Paris CEDEX 07</div>
          </li>
          <li>
            Contacter le Défenseur des droits par téléphone : 09 69 39 00 00.
          </li>
        </ul>
      </>
    ),
  },
  LegalsPage: {
    'legals title': 'Mentions légales',
    'service title': 'Présentation du service',
    'service content': (
      <>
        Le service de réponse en ligne est destiné aux ménages et entreprises
        qui sont interrogées dans le cadre d'une enquête de la statistique
        publique. Ces usagers peuvent saisir leurs questionnaires directement en
        ligne par Internet.
        <br />
        Pour accéder au service de réponse en ligne, l'utilisateur doit
        s'identifier en fournissant son code d'accès et son mot de passe
        figurant sur le courrier qui lui a été adressé.
        <br />
        L'utilisateur du service peut interrompre la saisie du questionnaire
        sans perdre les informations qu'il a entrées. Les réponses sont
        sauvegardées automatiquement à chaque changement de page. Une fois la
        saisie du questionnaire terminée, l'utilisateur transmet le
        questionnaire en cliquant sur le bouton « Envoyer mes réponses ».
      </>
    ),
    'survey legals terms title': "Cadre juridique de l'enquête",
    'survey legals terms content':
      'Il figure sur le portail de promotion de cette enquête.',
    'cookies title': 'Gestion des cookies',
    'cookies content':
      'Ce portail n’utilise aucun cookie nécessitant un consentement des usagers. C’est pourquoi vous n’avez pas à accepter leur utilisation avant de poursuivre votre navigation.',
    'session title': 'Session',
    'session content': (
      <>
        Dès que l'utilisateur a été identifié, une session est établie avec le
        serveur. <br />
        <br />
        Si l'utilisateur reste plus de 15 minutes sans intervenir dans le
        service de réponse au questionnaire, la session est interrompue. L'Insee
        estime en effet qu'au-delà de cette durée, l'utilisateur a
        vraisemblablement quitté le site sans fermer la session et que cela
        présente un risque en termes de confidentialité des informations
        saisies. L'utilisateur peut accéder de nouveau au questionnaire en
        s'identifiant.
      </>
    ),
    'copyright title': 'Copyright',
    'copyright content':
      'Toute reproduction pour un usage autre que strictement privé des marques et logos affichés sur le présent site est rigoureusement interdite.',
    'editor information title': 'Informations éditeurs',
    'editor information content': (
      <>
        Institut National de la Statistique et des Études Économiques CS 70058{' '}
        <br />
        <br />
        88 avenue Verdier
        <br />
        <br />
        92541 MONTROUGE CEDEX FRANCE
        <br />
        <br />
        Tél. : 01 87 69 50 00
      </>
    ),
    'design production title': 'Conception et réalisation',
    'design production content':
      'Dylan DECRULLE du Service National de Développement Informatique de Lille',
    'personal data title': 'Données nominatives',
    'personal data content': (
      <>
        <a href="https://www.insee.fr/fr/information/3719162">
          Données à caractère personnel
        </a>
      </>
    ),
  },
  NavigationAssistancePage: {
    'navigation assistance title': 'Aide à la navigation',
    'navigation assistance content': (
      <>
        <p>
          Les boutons « Précédent » et « Continuer » vous permettent de naviguer
          dans le questionnaire.
        </p>
        <p>
          Vos réponses sont enregistrées à chaque fois que vous changez de page
          mais ne sont pas transmises. Tant que vous ne l'avez pas transmis,
          vous pouvez revenir sur le questionnaire à tout moment, pour le
          compléter ou le finaliser.
        </p>
        <p>
          Le bouton « Envoyer mes réponses », accessible à la fin du
          questionnaire, vous permet de transmettre votre questionnaire
          renseigné à nos services et de télécharger votre accusé de réception.
        </p>
      </>
    ),
  },
  SecurityPage: {
    'security title': 'Sécurité',
    'security content': ({ fullUrl }) => (
      <p>
        Le site <a href={fullUrl}>{fullUrl}</a> a fait l'objet d'une décision
        d'homologation prononcée par l'autorité d'homologation pour le compte de
        l'autorité qualifiée de la sécurité du système d'information.
      </p>
    ),
  },
  SiteMapPage: {
    'sitemap title': 'Plan du site',
  },
  VisualizeForm: {
    'form title': "Prévisualisation d'enquête.",
    'source file title': "Fichier source de l'enquête.",
    'metadata file title': "Fichier de métadonnées de l'enquête.",
    'data file title': "Fichier de données de l'enquête.",
    'source file error': 'Vous devez au moins fournir un URI de fichier source',
    'source label': 'Uri Source.',
    'metadata label': 'Uri metadata',
    'data label': 'Uri Data.',
    'hint text': 'une url valide',
    'state related message': "Text de validation / d'explication de l'erreur",
    'submit button': 'Visualiser le questionnaire',
  },
  SelectNomenclatures: {
    'nomenclatures title': 'Référentiels de suggestion.',
    'nomenclatures description': `
      Ajouter de nouveaux référentiels de suggestion. Pour être utilisés, ils
      devront aussi figurer dans la section suggesters du fichier source.
    `,
    'add nomenclature button': 'Ajouter un nouveau référentiel',
    'name label': 'Nom',
    'uri label': 'Uri',
    'delete button title': 'Supprimer',
  },
  errorNormalizer: {
    'notFound.title': 'Page non trouvée',
    'notFound.subtitle':
      'La page que vous cherchez est introuvable. Excusez-nous pour la gêne occasionnée.',
    'notFound.paragraph':
      'Si vous avez tapé l’adresse web dans le navigateur, vérifiez qu’elle est correcte. La page n’est peut-être plus disponible. Dans ce cas, pour continuer votre visite vous pouvez retourner sur la page d’accueil. Sinon contactez-nous pour que l’on puisse vous aider.',
    'connectionError.title': 'Erreur de connexion',
    'connectionError.subtitle':
      "Une erreur s'est produite lors de la connexion au serveur.",
    'connectionError.paragraph':
      "Veuillez vérifier votre connexion Internet et réessayer. Si le problème persiste, veuillez contacter votre fournisseur de services Internet ou l'administrateur du site pour obtenir de l'aide.",
    'resourceNotFound.title': 'Ressource non trouvée',
    'resourceNotFound.subtitle':
      'La ressource que vous cherchez est introuvable sur le serveur.',
    'resourceNotFound.paragraph':
      'Veuillez vérifier l’URL que vous avez saisie ou contactez l’assistance pour obtenir de l’aide.',
    'unauthorized.title': 'Non autorisé',
    'unauthorized.subtitle':
      'Vous n’avez pas l’autorisation d’accéder à cette ressource.',
    'unauthorized.paragraph':
      'Veuillez vous connecter avec les informations appropriées ou contacter l’assistance pour obtenir de l’aide.',
    'forbidden.title': 'Accès refusé',
    'forbidden.subtitle':
      'Vous n’êtes pas autorisé à accéder à cette ressource.',
    'forbidden.paragraph':
      'Veuillez contacter l’assistance pour obtenir de l’aide.',
    'badRequest.title': 'Requête incorrecte',
    'badRequest.subtitle':
      'La requête que vous avez envoyée est incorrecte ou malformée.',
    'badRequest.paragraph':
      'Veuillez vérifier les données que vous avez envoyées et réessayer.',
    'serverError.title': 'Erreur interne du serveur',
    'serverError.subtitle':
      'Une erreur est survenue du côté du serveur. Veuillez réessayer ultérieurement.',
    'serverError.paragraph':
      'Si le problème persiste, veuillez contacter l’assistance pour obtenir de l’aide.',
    'unhandledError.title': 'Erreur non gérée',
    'unhandledError.subtitle': "Une erreur s'est produite lors de la requête.",
    'unhandledError.paragraph':
      "Veuillez réessayer ultérieurement ou contacter l'administrateur du site pour obtenir de l'aide.",
    'unknownError.title': 'Erreur inconnue',
    'unknownError.subtitle': "Une erreur inattendue s'est produite.",
    'unknownError.paragraph':
      "Veuillez réessayer ultérieurement ou contacter l'administrateur du site pour obtenir de l'aide.",
  },
}
