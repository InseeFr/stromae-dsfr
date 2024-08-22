# La personnalisation avec les métadonnées

Il est possible de personnaliser l'affichage grâce à des métadonnées.

Ces métadonnées sont récupérées directement auprès de l'API dans les modes d'usage de [collecte](../../usecases/collect.md) et de [relecture](../../usecases/review.md) ou fournis par l'utilisateur pendant la [conception](../../usecases/visualize.md).

Les métadonnées fournies doivent respecter ce type :

```ts
type Logo = {
  label: string
  url: string
}

type Metadata = {
  context: 'household' | 'business'
  label: string
  logos?: { main: Logo; secondaries?: Logo[] }
  objectives: string
  personalization?: {
    name: string
    value: string
  }[]
}
```

- Le **context** sert à savoir si l'enquête concerne une entreprise ou un ménage. Il n'est pas utilisé aujourd'hui.
- Le **label** de l'enquête (_label_) sert à personnaliser l'[entête](./display.mdx#entête).
- Les logos servent à personnaliser l'[entête](./display.mdx#entête) et le [pied de page](./display.mdx##pied-de-page)
  - le logo principal (_main_) est utilisé dans les deux élements
  - les logos secondaires (_secondaries_) servent uniquement au [pied de page](./display.mdx#pied-de-page)
- L'objectif court de l'enquête (_objectives_) sert à personnaliser la [page d'accueil](./survey.md#page-daccueil).
- La personalization sert à fournir les variables `whoAnswers1`, `whoAnswers2` `whoAnswers3`. Ceci est temporaire, l'api doit prochainement renvoyer des métadonnées sous le format décris [ici](https://github.com/InseeFr/stromae-dsfr/issues/81#issuecomment-2216825059). Le code est prêt à recevoir ce nouveau format.