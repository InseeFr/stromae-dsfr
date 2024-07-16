# Pagination

La pagination est définie dans le questionnaire. Aujourd'hui il existe 2 types de pagination, une pagination par **question** ou par **séquence**.

Suivant le type de pagination, Stromae ajoute des fonctionnalités annexe.

La pagination par séquence est plutôt à destination des enquêtes entreprise, par question pour les ménages.

Naturellement, en pagination par question, il y a qu'une question par page, et par séquence une seule séquence (et plusieurs question et/ou sous séquence) par page.

## Les fonctionnalité liées à la pagination

### Séquence :

En pagination par séquence, vous retrouverez :

1. Un étapier ou chaque étape correspond à une séquence, accompagné du titre de la séquence en cours, d'une description et d'une barre de progression quand il y a moins de 9 étape.
   ![](/img/etapier.png)
2. Les composants [**Séquence**](https://inseefr.github.io/Lunatic/docs/components/decorations/sequence) ne sont pas affichés
3. Un bouton pour étendre/réduire la présentation et laisser plus de place à l'affichage du questionnaire
   ![expand](/img/expand.png)

### Question :

En pagination par séquence, le titre de la séquence en cours est rappelé à chaque page (sauf la page qui affiche le composant [Séquence](https://inseefr.github.io/Lunatic-DSFR/storybook/?path=/docs/components-sequence--documentation)).

![](/img/title-seq-question.png)
