---
name: Pierre Clément — Portfolio
description: Un dossier éditorial clair pour un ingénieur logiciel indépendant.
colors:
  ink: "#091638"
  paper: "#fff"
  action: "#c83c0a"
  action-hover: "#a92e05"
  signal: "#f44b0b"
  muted: "#516079"
  line: "#d8dce4"
  soft: "#f4f6f9"
  field: "#f6f7f9"
  field-border: "#c4ccd8"
  placeholder: "#65718a"
  control-border: "#aeb8c8"
  control-hover: "#e4e8ee"
  selection: "#ffe1d3"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(54px, 5.4vw, 82px)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(30px, 3.1vw, 46px)"
    fontWeight: 800
    lineHeight: 1.13
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "26px"
    fontWeight: 800
    lineHeight: 1.13
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 700
  button:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    fontWeight: 700
  text-link:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    fontWeight: 650
rounded:
  field: "4px"
  button: "6px"
  project: "12px"
  portrait: "16px"
  circle: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  gutter: "20px"
  lg: "24px"
  xl: "28px"
  xxl: "32px"
  wide: "40px"
  spacious: "48px"
  section-mobile: "48px"
  section: "clamp(48px, 5vw, 80px)"
components:
  button-primary:
    backgroundColor: "{colors.action}"
    textColor: "{colors.paper}"
    typography: "{typography.button}"
    rounded: "{rounded.button}"
    padding: "14px 24px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
  text-link:
    textColor: "{colors.ink}"
    typography: "{typography.text-link}"
  text-link-hover:
    textColor: "{colors.action}"
  field:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "14px 16px"
  navigation-link:
    textColor: "{colors.ink}"
    height: "44px"
  project-row:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.project}"
    padding: "24px"
  project-tag:
    textColor: "{colors.muted}"
  carousel-control:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.circle}"
    size: "48px"
  carousel-control-hover:
    backgroundColor: "{colors.control-hover}"
  legal-document:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    maxWidth: "74ch"
    paddingBlock: "{spacing.section}"
---

# Design System: Pierre Clément

## Overview

**Creative North Star: "Le dossier éditorial"**

Un dossier professionnel net, personnel et vérifiable. La direction choisie par Pierre associe une typographie affirmée, de grandes surfaces blanches et une organisation lisible par séparateurs fins. La clarté porte la qualité d’ingénierie et l’attention au sur-mesure : les contenus et les contributions restent faciles à parcourir.

L’encre marine donne la structure ; l’orange signale les actions et quelques accents de lecture. Les images servent les personnes et les réalisations présentées. Leur présence ne remplace ni les titres, ni les descriptions, ni les liens accessibles.

**Key Characteristics:**
- Manrope unique, titres denses et texte courant aéré.
- Surfaces planes, espaces blancs et filets fins.
- Orange distinct pour l’action et la ponctuation expressive.
- Liens explicites et états de focus visibles.
- Images contextualisées et identité personnelle fidèle.

### Déclinaisons de l’identité

Tous les supports reprennent l’identité du portfolio : Manrope, blanc, marine, orange et portrait fidèle à la source. Les fichiers, textes de plateformes et scripts des cartes de visite et supports LinkedIn sont centralisés dans le dépôt privé voisin `personal-branding`. Les consignes détaillées y sont dans `AGENTS.md`, `DESIGN.md` et `BRANDING.md` ; la séparation est décrite dans [docs/branding-externalisation.md](docs/branding-externalisation.md).

Les corrections remplacent les mêmes fichiers, sans variantes numérotées. Ne pas régénérer le visage de Pierre lors d’une composition. Les halos orange des supports LinkedIn restent une déclinaison de l’identité ; ne pas réintroduire l’ancienne palette violette. Les icônes, previews OG/X et images réellement utilisées par le site restent dans ce dépôt et conservent leurs scripts de génération.

La légende publique du schéma ONTBO est « Illustration conceptuelle » / “Conceptual illustration”. Les textes publics ne portent plus de mention de génération ou de retouche par IA ; les registres techniques de provenance sont conservés. Garder l’explication du caractère conceptuel du schéma dans les mentions légales.

## Colors

La palette réunit le blanc du dossier, une encre marine profonde et un orange franc dont les deux intensités ont des usages distincts. Les valeurs du frontmatter sont normatives ; les noms ci-dessous décrivent leur emploi.

### Primary

- **Orange action** (`action`) : boutons pleins, liens prioritaires, focus et marqueurs d’état courant. Sa variante `action-hover` fonce les boutons au survol.
- **Orange signal** (`signal`) : mots mis en avant dans le grand titre et ponctuation des titres et de la signature. Il conserve une intensité plus lumineuse que l’orange des boutons.

### Neutral

- **Encre marine** (`ink`) : titres, navigation, texte principal et traits des icônes.
- **Papier blanc** (`paper`) : fond de page et texte des boutons principaux.
- **Ardoise lisible** (`muted`) : descriptions, dates, mentions et légendes.
- **Filet froid** (`line`) : séparateurs de sections et de lignes de contenu.
- **Papier grisé** (`soft`) : fond des témoignages, supports d’images et messages de formulaire par défaut.
- **Champ clair** (`field`, `field-border`, `placeholder`) : surface, contour et texte indicatif des champs.
- **Contrôle discret** (`control-border`, `control-hover`) : bordure puis surface de survol des commandes circulaires.
- **Sélection pêche** (`selection`) : sélection du texte sur fond clair, avec texte en encre marine.

**The Action and Signal Rule.** Employer l’orange action pour un bouton et son texte blanc ; réserver l’orange signal aux accents typographiques observés. Ne pas intervertir ces deux rôles.

## Typography

**Display Font:** Manrope, avec sans-serif en secours.
**Body Font:** Manrope, avec sans-serif en secours.

Manrope est auto-hébergée dans `public/fonts/manrope-variable.ttf`, déclarée sur la plage de graisses 200–800 avec `font-display: swap`. Le fichier provient de la distribution officielle Google Fonts ; sa licence OFL accompagne la police dans `public/fonts/OFL.txt`.

**Character:** Une grotesque sans empattements ferme et simple. Les titres utilisent une graisse forte et une approche serrée ; les descriptions privilégient une hauteur de ligne généreuse. Les labels restent en casse naturelle, hormis les petites lignes de profession sous le portrait.

### Hierarchy

- **Display** : titre principal, selon le token fluide. À partir de 1440 px, la règle finale de la feuille fixe sa taille à 74 px. Sous 1100 px, la taille suit `clamp(46px, 5.5vw, 64px)` ; sous 700 px, `clamp(42px, 10.8vw, 68px)`.
- **Headline** : titres de sections selon le token fluide ; base mobile de 32 px, avec variantes de section présentes dans le CSS.
- **Title** : base des sous-titres ; les noms de projets utilisent 28 px sur bureau et 26 px sur mobile, les employeurs 24 px puis 23 px.
- **Body** : les descriptions de projets utilisent la taille du token ; la présentation d’accueil monte à 17 px avec une hauteur de ligne de 1.6. Les paragraphes structurants limitent leur largeur selon leur rôle, entre 40 et 58 caractères environ ; le texte de formation atteint 70ch.
- **Label** : libellés de formulaire ; les métadonnées de projets et dates emploient des variantes plus petites. Les dates et compteurs utilisent des chiffres tabulaires.
- **Button / Text link** : distinction de graisse entre action pleine et lien souligné, sans changement de famille.

**The One Family Rule.** Conserver Manrope pour les titres, paragraphes, commandes et métadonnées ; créer la hiérarchie par taille, graisse, espacement et contraste.

## Layout

Le conteneur commun mesure `min(1216px, calc(100% - 80px))`, centré. Sous 700 px, il conserve 20 px de marge de chaque côté. La page prend en charge une largeur minimale de 320 px. L’espacement des grandes sections suit un seul token `section` : `clamp(48px, 5vw, 80px)`, soit 48 px sur mobile et 72 px à 1440 px.

Les compositions de bureau alignent des colonnes sur une grille éditoriale : accueil asymétrique, quatre lignes de projets en 5:6, dates et expérience en 1:2.6, contact en 1:1.15. Les séparateurs horizontaux cadrent les changements de sujet. Ce sont les compositions actuelles ; conserver leur logique d’alignement sans imposer ces rapports à toute nouvelle surface.

Les seuils observés sont 1100 px pour le compactage intermédiaire, 700 px pour le passage mobile, et 1440 px pour les ajustements de grand écran. Sur mobile, les colonnes principales s’empilent, les liens restent visibles, le bouton principal de l’accueil s’étend, et la navigation s’ouvre dans un panneau sous l’en-tête. Les paires de champs deviennent une colonne. Ce document définit les règles de composition ; `PRODUCT.md` porte le positionnement et les contraintes de contenu.

## Elevation & Depth

Les sections de lecture et les lignes de projets restent planes, sans ombre. Les changements de fond et les séparateurs fins établissent la profondeur. L’illustration isométrique d’ONTBO reprend une notice d’assemblage : trait technique noir, couches en vue éclatée, gris clairs et éléments orange. Elle constitue une image de contenu conceptuelle, pas un style à appliquer aux commandes ou aux conteneurs. Les légendes restent du texte HTML lisible.

### Shadow Vocabulary

- **Navigation mobile ouverte** (`0 14px 24px #09163812`) : détacher le panneau temporaire du contenu qu’il recouvre.

**The Flat Reading Rule.** Garder les contenus de lecture plats ; les ombres existantes signalent les surfaces temporaires superposées.

## Shapes

La forme dominante reste rectiligne. Les quatre cartes de réalisations ont un contour de 1 px en encre marine, orange au survol ou au focus interne, et un arrondi de 12 px. Les boutons possèdent un arrondi modéré et les champs un arrondi plus discret, selon les tokens. Le cercle sert les commandes de témoignage et les avatars. Les bordures structurelles mesurent 1 px. Les icônes sont des tracés simples cohérents avec Lucide, à taille contenue.

## Components

### Buttons

Actions franches, compactes et lisibles. Le bouton principal utilise les tokens `button-primary`, une hauteur minimale de 52 px et un écart de 26 px entre texte et flèche. Le survol fonce sa surface ; l’appui le déplace de 1 px vers le bas. Les transitions de fond et de transformation durent 0.18 s avec `ease-out`. L’état désactivé conserve le bouton avec une opacité de 0.65 et un curseur d’attente. Le bouton d’accueil mobile mesure au moins 56 px de haut.

### Text links

Liens explicites, soulignés avec un décalage de 5 px et une épaisseur de 1 px. Leur hauteur minimale commune est de 44 px, avec 20 px entre texte et icône. Le survol et le focus clavier adoptent l’orange action, y compris pour les emails, téléphones et URL de projets. Tous les liens du contenu des mentions légales et de la politique de confidentialité suivent cette règle, dans les deux langues. Les liens des réalisations restent visibles au repos ; ils ne dépendent pas du survol d’une image.

### Inputs / Fields

Champs clairs bordés, avec labels visibles au-dessus et texte indicatif secondaire. Hauteur minimale de 52 px pour les champs simples ; zone de message de 160 px minimum, redimensionnable verticalement. Le focus suit la règle globale : contour orange action de 3 px, décalé de 5 px. Les messages d’envoi sont des blocs distincts ; l’erreur ajoute un fond pêche pâle et un contour chaud, la réussite un fond vert pâle et un contour vert grisé. Leur texte et leur rôle sémantique portent aussi l’état.

### Navigation

Signature textuelle forte et navigation sobre, sur une ligne de séparation. L’en-tête garde une hauteur minimale de 76 px sur ordinateur, tablette et mobile pour conserver le même espace vertical autour des liens ; ne pas réintroduire de hauteur réduite à 1440 px. Les liens utilisent 14 px et des zones de 44 px minimum ; leur survol adopte l’orange action. Sur mobile, le bouton « Menu » devient « Fermer », le panneau se déploie sous l’en-tête, et Échap ferme le menu en rendant le focus au bouton. Aucun marqueur de section active n’est défini dans cette version.

Dans la navbar et le footer, la signature « Pierre Clément. » garde son point orange signal. Seules les initiales P et C passent du marine à l’orange signal au survol ou au focus clavier, avec une transition de couleur de 0,18 s. Le reste du nom conserve sa couleur ; la réduction des animations supprime la transition.

À 700 px et moins, le footer est centré : signature et offre empilées, réseaux et liens Localisation / FAQ centrés, puis copyright et liens légaux / retour en haut. Les liens peuvent revenir à la ligne en gardant des cibles de 44 px. Le contenu des pages légales reste aligné à gauche. Au-dessus de 700 px, conserver les alignements de bureau.

### Portrait et badges du hero

Le portrait conserve son ratio 4:5, avec des coins arrondis de 16 px sur ordinateur et mobile. L’arrondi s’applique à la photo pour préserver les contours de focus des badges superposés. Le badge glass d’expérience est compact, en bas à gauche : « +5 années » en français et « +5 years » en anglais en 2026, avec uniquement le nombre en orange action. Sa largeur suit le contenu, sans étirement ni retour à la ligne ; sa hauteur minimale de 44 px correspond aux boutons sociaux. Le texte mesure 13 px, en graisse 700. Un texte masqué visuellement donne le libellé complet aux lecteurs d’écran, avec le nombre calculé par année courante moins 2020 moins 1.

Les trois boutons sociaux restent à droite et mesurent 44 × 44 px. Lorsque la colonne du portrait est trop étroite, le groupe de liens passe à la ligne suivante, aligné à droite ; le texte du badge ne se coupe jamais. La pastille Disponible / Available reste en haut à droite. La bannière LinkedIn garde son libellé d’expérience développé et ses tailles propres au support.

À 375 px et moins, les badges ont des marges latérales de 12 px et un espacement minimal de 6 px pour conserver « +5 années » et les trois réseaux sur une ligne jusqu’à 320 px.

Le même token `section` pilote les espaces avant et après le hero, après le bloc régie / forfait / parcours, entre les réalisations et le parcours, autour des avis et de la localisation/FAQ, puis autour du contact et avant le footer. Les séparateurs ou changements de fond peuvent avoir une marge de chaque côté, chacune issue du même token. Le bloc régie / forfait / parcours conserve ses espacements internes de 26 px. Les valeurs mobiles spécifiques de 64 px et les anciennes marges d’introduction de 44 px sont supprimées.

Les liens d’ancre du menu et du footer alignent le début du titre à 24 px du haut de la fenêtre, en compensant l’espacement interne supérieur de la section avec `scroll-margin-top`. Le token local `--section-top-space` pilote à la fois le padding et cette compensation, y compris sur mobile. L’en-tête des réalisations est aligné par le haut pour que la longueur du paragraphe voisin ne décale pas son titre. Les ancres FAQ et expériences détaillées, placées au début de leur contenu, gardent la marge globale de 24 px. Au bas de la page, le navigateur peut s’arrêter avant cet alignement lorsqu’il n’y a plus de contenu à faire défiler.

Dans le bloc régie / forfait / parcours, chaque icône est centrée verticalement sur la première ligne du titre. Son décalage dépend de la hauteur de ligne du titre et de sa propre taille (28 px pour les offres, 26 px pour le parcours), y compris quand le titre revient à la ligne sur mobile.

### Project rows and tags

Les quatre réalisations sont réunies sous un seul titre : « Le sur-mesure, en pratique. » / “Custom software, in practice.” ONTBO, Nightingale Project, LynxJS et DragN’Receive utilisent la même carte horizontale, image à gauche et texte à droite. Sur mobile, l’image précède le texte. ONTBO est le premier exemple de contribution de Pierre, avec la même hiérarchie que les autres réalisations.

Chaque réalisation est structurée par une image, un titre, une courte finalité, un paragraphe introduit par « Ma contribution : » / “My contribution:” et des liens visibles, dans un contour de 1 px et un espacement intérieur de 24 px (18 px sur mobile). Les contextes de recherche, contribution technique et prototype étudiant sont explicites dans les textes. Les liens disponibles sont regroupés une seule fois sous la présentation, avec une cible de 44 px minimum. Les libellés indiquent la nature de la destination : client Python du SaaS ONTBO, page Facebook du Nightingale Project et modèle DeepSkin utilisé, fil Reddit de Pierre pour LynxJS. Un dépôt client ou un modèle tiers ne doit pas être présenté comme le code source complet du produit.

L’image garde un ratio de 16:10, sans commande superposée ni effet de zoom au survol. Le schéma conceptuel ONTBO est contenu entièrement dans ce cadre sur fond blanc, avec sa légende HTML « Illustration conceptuelle » / “Conceptual illustration”. Les trois repères HTML « Échanges », « Mémoire & contexte », « Agents IA » / “Exchanges”, “Memory & context”, “AI agents” figurent au-dessus du schéma, à gauche, au centre et à droite, avec une taille fluide de 11 à 12 px. Le texte alternatif porte la même information pour les lecteurs d’écran. Toutes les phrases de finalité utilisent l’encre marine, y compris « vraie » / “Real” pour ONTBO. Les domaines sont des mots discrets séparés par des barres obliques, sans pastilles de fond. Toutes les technologies existantes sont conservées. Le complément utilise un élément `details` natif et une flèche qui pivote à l’ouverture.

### Testimonial controls

Deux boutons circulaires bordés encadrent un compteur tabulaire. Le fond reste transparent au repos puis devient gris clair au survol. Les citations s’affichent dans une section grisée, avec guillemet orange et portrait d’auteur circulaire.

### Legal pages

Les mentions légales et la confidentialité disposent de pages FR/EN dédiées, avec la navbar et le footer communs. Colonne centrée de 74ch maximum, texte aligné à gauche et défilement normal de la page. Le H1 mesure de 32 à 52 px, avec une ponctuation orange et un filet inférieur. Les sous-titres H2 mesurent de 20 à 24 px ; les paragraphes restent à 16 px avec un interligne de 1.8. La date de mise à jour est plus discrète, à 14 px. Les sections sont séparées de 32 px. Les liens restent soulignés et deviennent orange au survol et au focus ; le SIREN et le SIRET restent insécables. Un lien « Retour au portfolio » précède le titre et revient en fin de document, accompagné de l’accès à l’autre document légal. Les deux commandes restent sur une ligne lorsque l’espace le permet, puis s’empilent naturellement. Le retour en haut reste dans le footer. Aucun ancien dialogue ou traitement d’ancre légale n’est conservé.

Toutes les interactions utilisent le contour de focus global. Le défilement doux, les transitions et les animations sont supprimés lorsque `prefers-reduced-motion: reduce` est actif.

## Do's and Don'ts

### Do:

- **Do** conserver les surfaces blanches, les filets fins et la hiérarchie Manrope.
- **Do** distinguer orange action et orange signal selon leur rôle.
- **Do** laisser les titres, légendes et liens en HTML lisible et accessible.
- **Do** maintenir les liens visibles au repos et le focus clavier perceptible.
- **Do** contextualiser les illustrations conceptuelles et utiliser des portraits fidèles aux personnes présentées.

### Don't:

- **Don't** transformer les lignes éditoriales en une collection de cartes arrondies et ombrées.
- **Don't** remplacer une photo professionnelle manquante par un visage inventé.
- **Don't** cacher les accès aux réalisations derrière un survol.
- **Don't** appliquer le rendu 3D d’une illustration aux boutons ou à l’ensemble de l’interface.
- **Don't** imposer une animation aux personnes qui demandent une réduction du mouvement.


## Icône et aperçus de partage

Le monogramme `PC` utilise des lettres marine sur fond blanc, avec un point orange centré à l’intérieur du C. Sa source est un SVG autonome composé de tracés, sans dépendance à une police. Le favicon conserve ses formes aux petites tailles ; l’icône Apple utilise un fond carré pour laisser le système appliquer son propre masque.

Les previews françaises et anglaises mesurent 1200 × 630. Elles conservent le fond blanc du site, une typographie marine à gauche et le portrait professionnel 4:5 à droite. L’orange reste un accent. Les grands aplats marine ont été écartés par Pierre car ils rompent la cohérence avec le site clair. Le nom signe la composition, le métier est le message principal et le sur-mesure reste explicite. Full-stack, DevOps, architecture, IA (AI en anglais) et R&D complètent le profil sans ajouter de chiffres ou de promesses. Les deux langues conservent exactement la même grille et le même portrait. Le grand titre occupe la largeur de la colonne gauche ; l’offre et les compétences forment un groupe rapproché sous le titre, sans grand espace vide entre eux.

Le gabarit se trouve dans `scripts/social-card-template.mjs`. Les exports sont générés par `npm run brand` et pendant le prérendu destiné à GitHub Pages.

Les pastilles animées de disponibilité et de parcours actif ont un cœur fixe de 7 px, de même taille que les pastilles normales du parcours, au centre d’un halo de 11 px. Seul le halo varie en taille et en opacité, avec un agrandissement limité à 1,25 pour garder une pulsation discrète ; le cœur reste opaque et immobile. La réduction des animations immobilise également le halo.

La proximité est présentée dans une section de la page principale après les témoignages, avant le contact. « Dans l’Oise et au-delà » conserve les surfaces blanches, les filets fins et la typographie du site. Le paragraphe sur les zones d’intervention se place sous le titre, dans la colonne de gauche, avant la présentation des publics accompagnés et les références locales. Les références renvoient directement aux expériences existantes. La FAQ occupe la colonne de droite ; son titre et celui de la localisation sont alignés par le haut. Le titre de localisation reste dans sa colonne, avec 24 px avant le paragraphe introductif. Sur mobile, le bloc de localisation complet précède la FAQ. Ses cinq questions utilisent des éléments `details`/`summary` natifs, avec flèche Lucide et premier élément ouvert. Deux colonnes sur ordinateur, une sous 700 px ; titres de FAQ à 24 px, questions à 15 px et réponses à 14 px. Le pied de page pointe vers `#service-areas` et `#faq`. Aucune page de prestation séparée, carte de bureau ou nouvelle implantation inventée.

Le menu principal propose Réalisations, Parcours, Avis, Localisation, FAQ et Contact, dans cet ordre, avec les libellés anglais correspondants (Service areas pour Localisation). Les liens Localisation et FAQ mènent à `#service-areas` et `#faq`, et ferment le menu replié. L’en-tête passe au menu replié à 900 px et moins pour garder les six entrées lisibles ; la mise en page du contenu conserve son seuil mobile à 700 px.
