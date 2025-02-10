---
sidebar_position: 5
---

# Documentation technique

L'application Stromae-dsfr est une SPA développée avec le Framework [React](https://react.dev/) grâce à l'outil [Vite](https://vitejs.dev/).

## Pour commencer :

```
git clone https://github.com/InseeFr/stromae-dsfr
cd stromae-dsfr

# Installer les dépendances
yarn

# pour démarrer l'application localement
yarn dev
```

## Gestion de l'authentification
La gestion de l'authentification est gérée par la librairie [oidc-spa](https://www.oidc-spa.dev/). 
La configuration de l'authentification se fait au sein du fichier `src/oidc.tsx`, et utilise les variables d'environnement suivantes :
- `VITE_OIDC_CLIENT_ID`
- `VITE_OIDC_AUTHORITY`
- `VITE_OIDC_ISSUER`

### Cas particulier de la déconnexion par inactivité
Lorsque l'utilisateur est inactif pendant un certain temps, il est automatiquement déconnecté.
Par défaut, l'utilisateur est redirigé vers la page d'authentification. Si l'on souhaite rediriger l'utilisateur vers une autre page, il est possible de le faire en modifiant la variable `VITE_AUTO_LOGOUT_REDIRECTION` à "true" dans le fichier `.env`. La page de redirection est alors déterminée par le paramètre d'URL 'pathAutoLogout' de la page en cours.