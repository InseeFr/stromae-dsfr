### 1.4.7

#### Modifications

- lorsqu'un champ texte/nombre/suggester est en lecture seule, désormais le champ est transformé en un simple texte pour mieux distinguer la lecture seule

#### Correction de bugs

- sur la page d'un rond-point, les contrôles des questions de la boucle associée étaient déclenchés à tord. Corrigé par Lunatic 3.6.7
- sur la page d'un rond-point, les contrôles de niveau itération étaient déclenchés à tord sur les itérations filtrées. Corrigé par Lunatic 3.6.7
- lorsque la première itération d'une boucle est filtrée, à l'arrivée sur cette boucle le questionnaire crashait. Corrigé par Lunatic 3.6.8 (bug présent depuis Lunatic 3.6.5, depuis stromae-dsfr 1.4.6)

### 1.4.6

#### QoL

- en mode de visualisation, le téléchargement des données récupère désormais aussi les variables calculées
- amélioration des espaces entre les champs de réponse, notamment pour les questions de type liens 2 à 2
- ajout d'un autofocus sur le champ de précision lors de la sélection d'une modalité contenant une précision
- amélioration des performances des questionnaires. Ajouté par Lunatic 3.6.5

#### Build

- migration de yarn à pnpm

#### Montée de version Lunatic

Montée de version Lunatic 3.6.5

### 1.4.5

#### QoL

- amélioration des performances des questionnaires. Ajouté par Lunatic 3.6.3

#### Montée de version Lunatic

Montée de version Lunatic 3.6.3

### 1.4.4

#### Modifications

- le bouton de déconnexion est changé en sortie de questionnaire. Il ne déconnecte plus, et renvoie désormais sur `${VITE_PORTAIL_URL}/${VITE_EXIT_PATH}`, variables fournies en variable d'environnement
- la déconnexion par inactivité renvoie désormais sur `${VITE_PORTAIL_URL}/${VITE_LOGOUT_PATH}` variables fournies en variable d'environnement

#### Correction de bugs

- le clic sur le bouton d'accueil du footer renvoyait sur une 404 (page d'accueil inexistante). Désormais le bouton renvoie en haut de la page courante

#### Montée de version Lunatic

Montée de version Lunatic 3.6.2

### 1.4.3

#### Correction de bugs

- le clic sur le bouton d'accueil du header renvoyait sur une 404 (page d'accueil inexistante). Désormais le bouton renvoie en haut de la page courante
- le composant Suggester ne gérait pas correctement la lecture seule

#### Montée de version Lunatic

Montée de version Lunatic 3.6.1

### 1.4.2

#### Modifications

- lorsque plusieurs contrôles sont déclenchés pour un composant, on affiche désormais le plus critique

#### Build

- réinternalisation de la librairie Lunatic-DSFR (composants, storybook)

#### Montée de version Lunatic

Montée de version Lunatic 3.5.8

### 1.4.1

#### Modifications

- bouton d'accès au support : renommage et changement d'icone
- les questions de type date utilisent désormais un datepicker. Ajouté par Lunatic-DSFR 2.5.0

#### Correction de bugs

- pour les questions de type nombre, les valeurs possibles ne prenaient pas toujours bien en compte le minimum et maximum autorisé. Corrigé par Lunatic-DSFR 2.5.1

#### Montée de version Lunatic

Montée de version Lunatic 3.5.3
Montée de version Lunatic-DSFR 2.5.1

### 1.4.0

#### QoL

- amélioration notable des performances des questionnaires. Ajouté par Lunatic 3.5.0

#### Montée de version Lunatic

Montée de version Lunatic 3.5.0

### 1.3.9

#### Modifications

- en pagination séquence, l'affichage du questionnarie est désormais en mode étendu, en gardant la possibilité de le réduire

#### Correction de bugs

- dans l'affichage d'une séquence en pagination séquence, les longues infobulles dépassaient de la page, empêchant de lire leur contenu

#### Montée de version Lunatic

Montée de version Lunatic 3.4.21
Montée de version Lunatic-DSFR 2.4.9

### 1.3.8

#### Modifications

- dans un champ nombre, l'unité n'était pas affichée lorsqu'une valeur est renseignée. Ajouté par Lunatic-DSFR 2.4.8

#### Montée de version Lunatic

Montée de version Lunatic 3.4.20
Montée de version Lunatic-DSFR 2.4.8

### 1.3.7

#### QoL

- à la déconnexion, retrait du bandeau affichant à tord que les données n'ont pas pu être sauvegardées

### 1.3.6

#### Nouvelles fonctionnalités

- lors de la déconnexion par inactivité, ajout d'une redirection vers une url paramétrable (`pathAutoLogout` récupérée en query param) lorsque la variable d'environnement `VITE_AUTO_LOGOUT_REDIRECTION` vaut "true"

#### Modifications

- amélioration de l'affichage du champ nombre lorsqu'il est tronqué (principalement pour les tableaux). Ajouté par Lunatic-DSFR 2.4.6

#### Montée de version Lunatic

Montée de version Lunatic 3.4.17
Montée de version Lunatic-DSFR 2.4.7

### 1.3.5

#### Modifications

- augmentation de la taille du composant Suggester dans les tableaux

### 1.3.4

#### QoL

- ajout d'une modale de confirmation lorsque l'utilisateur quitte la page avec des modifications non enregistrées

#### Nouvelles fonctionnalités

- ajout de la description du composant rond-point. Ajouté par Lunatic 3.4.11 et Lunatic-DSFR 2.4.5

#### Montée de version Lunatic

Montée de version Lunatic 3.4.11
Montée de version Lunatic-DSFR 2.4.5

### 1.3.3

#### QoL

- ajout des variables d'environnemment `VITE_TELEMETRY_MAX_DELAY` et `VITE_TELEMETRY_MAX_LENGTH` permettant de paramétrer le méchanisme de batch du tracking des paradonnées
- on n'affiche plus la rubrique "Qui doit répondre" quand elle est vide

### 1.3.2

#### Montée de version Lunatic

Montée de version Lunatic 3.4.10
Montée de version Lunatic-DSFR 2.4.4

### 1.3.1

#### QoL

- suppression de variables non utilisées dans les données téléchargées en mode visualisation

### 1.3.0

#### Nouvelles fonctionnalités

- ajout du tracking des paradonnées de connexion, saisie d'un input, changement de page dans le questionnaire, contact au support
- en mode collecte, les liens internes de bas-de-page sont ouverts dans un nouvel onglet pour éviter aux utilisateurs de perdre l'état actuel de leur questionnaire

#### Montée de version Lunatic

Montée de version Lunatic 3.4.7
Montée de version Lunatic-DSFR 2.4.2

### 1.2.4

#### Correction de bugs

- réduction de la taille du payload envoyé à l'API en enlevant des variables inutilisées
- on déclenche à nouveau les contrôles si une valeur a changé

### 1.2.3

#### Correction de bugs

- en mode collecte, retourner sur la page de confirmation d'un questionnaire déjà validé ne re-déclenche plus son envoi
- en mode collecte, retourner sur la page d'un questionnaire déjà validé n'affiche plus la modale demandant si l'utilisateur veut retourner sur la dernière page remplie
- en mode collecte, sur la page de fin, on affiche la bonne date à laquelle les réponses ont été envoyé
- en mode collecte, sur la page de fin, on n'affiche plus la date à laquelle les réponses ont été envoyé quand l'extraction a commencé et a modifié ladite date

### 1.2.2

#### Correction de bugs

- les contrôles n'étaient pas déclenchés dans les boucles paginées. Corrigé par Lunatic 3.4.4
- les contrôles n'étaient pas déclénchés sur la dernière page du questionnaire

#### Modifications

- dans le footer, le lien plus.transformation.gouv.fr a été remplacé par service-public.fr
- à l'ouverture du questionnaire en mode de visualisation, l'affichage des erreurs de format est amélioré

#### Montée de version Lunatic

Montée de version Lunatic 3.4.4

### 1.2.1

#### Correction de bugs

- les contrôles n'étaient pas déclenchés dans les boucles non paginées. Corrigé par Lunatic 3.4.3

#### Montée de version Lunatic

Montée de version Lunatic 3.4.3  
Montée de version Lunatic-DSFR 2.4.1

### 1.2.0

#### Nouvelles fonctionnalités

- sur la page d'accueil du questionnaire, ajout du contenu 'Qui doit répondre à ce questionnaire' personnalisé

### 1.1.1

...
