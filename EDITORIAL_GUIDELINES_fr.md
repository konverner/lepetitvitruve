# Lignes directrices éditoriales — Le Petit Vitruve (v1)

## Portée

Le Petit Vitruve est conçu comme une ressource multilingue, le **français constituant la langue par défaut et principale pour la version 1**. Ce document définit les normes éditoriales, les conventions lexicographiques et les modèles structurels pour garantir la cohérence, la clarté et l'autorité de l'ensemble du contenu.


## Structure des entrées et sections

| Section | Objet | Obligatoire ? |
| :--- | :--- | :---: |
| **Titre (`#`)** | Terme officiel au singulier (sauf exception plurielle). | **Oui** |
| **Définition (`##`)** | Paragraphe 1 : Définition. Paragraphe 2 : Disambiguation et confusions. | **Oui** |
| **Caractéristiques (`##`)** | Caractéristiques visuelles, morphologie, matériaux, proportions et indices d'observation. | **Non** |
| **Rôle (`##`)** | Fonction structurelle, pratique ou impact esthétique (le cas échéant). | **Oui** |
| **Trivia (`##`)** | Évolution historique, étymologie ou faits notables. | **Non** |
| **Exemples (`##`)** | Exemples réels avec localisation géographique et format de lien strict. | **Oui** |


### Style lexicographique et règles de définition

Les entrées doivent respecter les conventions lexicographiques traditionnelles basées sur la méthode aristotélicienne : **genre prochain** + **différence spécifique**.

### Règles pour les définitions :
1. **Phrasé nominal direct :** Il est strictement interdit de débuter une définition par des tournures conversationnelles telles que *"C'est un..."* ou *"Il s'agit d'un..."*. Commencez directement par le groupe nominal principal au singulier sans article (ex. : *Demi-arche*, *Baie*, *Pilastre*).
2. **Structure de la section Définition :**
   * **Premier paragraphe :** Définition concise en 1 à 2 phrases (*genre prochain* + *différence spécifique*).
   * **Second paragraphe :** Précisions sur les confusions fréquentes et distinction avec les termes architecturaux proches.

Exemple :

> **Arc-boutant**
> 
> Demi-arche de maçonnerie extérieure à l'édifice, s'élançant d'un cul-de-lampe ou d'une pile pour venir étayer la poussée des voûtes au sommet d'un mur.
> 
> Il ne faut pas le confondre avec l'arc-doubleau, qui est un arc transversal de renfort situé à l'intérieur de la voûte, ni avec le contrefort, qui reste adhérent au mur sans arc de décharge suspendu.


### Règles pour la section "Role"

La section "Rôle" doit décrire les roles de l'élément architectural:

- Structurelle : Décrit la fonction de l'élément dans la stabilité et l'intégrité du bâtiment.
- Pratique : Décrit l'utilité fonctionnelle de l'élément pour les occupants ou l'usage du bâtiment.
- Esthétique : Décrit l'impact visuel ou stylistique (baroque, gothique, classique, etc.) de l'élément sur l'ensemble architectural.

Exemple :

- Structurelle : Les arcs-boutants permettent de transférer la poussée des voûtes vers les contreforts, assurant la stabilité des murs.
- Pratique : Ils libèrent l'espace intérieur en réduisant le besoin de murs porteurs massifs.
- Esthétique : Ils contribuent à l'aspect élancé et dramatique des cathédrales gothiques, accentuant la verticalité et la légèreté visuelle.

En texte on le decrit plus naturellement:


```markdown
## Rôle
Les arcs-boutants jouent un rôle crucial dans la stabilité des cathédrales gothiques. Structurellement, ils transfèrent la poussée des voûtes vers les contreforts, permettant ainsi de réduire l'épaisseur des murs.

Pratiquement, cela libère l'espace intérieur, offrant une plus grande liberté d'aménagement. 

Esthétiquement, ils accentuent la verticalité et la légèreté visuelle des édifices, contribuant à leur aspect élancé et dramatique.
```

## Normes de mise en forme

* **Style de texte :** Aucun texte en gras ou en italique dans le corps des paragraphes afin de préserver une mise en page épurée.
* **Listes à puces :** Les puces sont réservées **exclusivement** à la section `Exemples`.
* **Hyperliens externes:** Les liens externes sont autorisés uniquement dans la section `Exemples`.
* **Hyperliens internes :** Les liens internes au site sont autorisés pour les éléments correspondant aux autres entrées du dictionnaire.

### Format d'ancrage géographique pour les liens Google Maps :
Chaque exemple de localisation doit respecter strictement la hiérarchie suivante, **l'intégralité de la chaîne géographique servant de texte d'ancrage pour le lien** :

`{nom du bâtiment ou adresse}, {ville}, {province/région - optionnel}, {pays}`

#### Exemple de formatage de lien :
```markdown
- [La cathédrale Notre-Dame de Paris, Paris, France](https://maps.app.goo.gl/XXtemEUAfYzXwbgu5)

```

---

## Modèle d'entrée (Template)

Les contributeurs doivent copier et remplir le modèle Markdown suivant pour toute nouvelle entrée :

```markdown
# {Nom du terme}

## Définition
{Définition concise : genre prochain + différence spécifique.}

{Précisions sur les confusions fréquentes et distinction avec les termes proches.}

## Caractéristiques <!-- Optionnel -->
{Forme, matériaux, proportions, ornements et détails visibles à l'œil nu.}

## Rôle
{Fonctions structurelles, pratiques ou caractéristiques esthétiques de l'élément.}

## Exemples <!-- Optionnel -->

{Contexte général d'implantation : époques, courants architecturaux ou aires géographiques de prédilection.}

- [{Nom du bâtiment}, {Ville}, {Pays}](https://maps.app.goo.gl/...)
- [{Nom du bâtiment}, {Ville}, {Pays}](https://maps.app.goo.gl/...)
- {Nom du bâtiment}, {Ville}, {Pays}

```

```
