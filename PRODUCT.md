# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Prospects et interlocuteurs professionnels qui évaluent le parcours et les compétences de Pierre Clément pour une mission freelance. Aucun secteur, type de client ou format de mission prioritaire n’est arrêté : Pierre reste ouvert à tout type de mission.

## Product Purpose

Valoriser le parcours, les compétences et les réalisations de Pierre pour susciter des prises de contact et obtenir des missions en régie comme au forfait. Les deux formats doivent être représentés sans en privilégier un par défaut.

Le premier contact à mettre en avant est un échange sur le besoin par formulaire ou email. La présentation doit équilibrer réalisations concrètes et parcours professionnel.

Les réalisations servent de preuves des contributions de Pierre. ONTBO partage le même format et la même hiérarchie que Nightingale Project, LynxJS et DragN’Receive, sous un titre commun. Rendre immédiatement lisible le besoin du projet et le rôle personnel de Pierre.

Les missions à distance sont ouvertes à l’international. Ne pas limiter la zone d’intervention à la France dans les textes ou les métadonnées du site.

## Positioning

Pierre est ingénieur logiciel freelance en entreprise individuelle, spécialisé en conseil IT et développement. Son approche repose sur le sur-mesure : comprendre le besoin et adapter la solution au contexte du client. Le sur-mesure est un engagement à préserver dans les évolutions du portfolio.

Son socle couvre le développement full-stack, le DevOps, l’architecture logicielle, l’IA, la R&D, la qualité logicielle et l’automatisation. Son parcours comprend une formation Bac+5 en informatique et cinq années d’alternance, du BTS au diplôme d’ingénieur.

## Operating Context

Le portfolio est bilingue français/anglais. Le référencement local vise prioritairement l’Oise, notamment Compiègne et Beauvais, puis les Hauts-de-France et l’Île-de-France. Le travail à distance reste ouvert à l’international. Paris est une domiciliation administrative, pas une implantation opérationnelle à inventer. Les visiteurs peuvent consulter les zones d’intervention, la FAQ, le parcours, les projets et les témoignages, accéder au CV dans leur langue, puis prendre contact par formulaire, email ou Calendly. Entreprises, indépendants, associations et particuliers peuvent prendre contact.

Les zones d’intervention et une FAQ utile sont réunies dans une section de la page principale, disponible en français et en anglais. Aucune page de prestation séparée n’est souhaitée. Les références locales restent fondées sur les expériences documentées à Compiègne et Breuil-le-Sec. Ne pas inventer de références à Beauvais ou en Île-de-France ni une implantation dans une ville non confirmée. Search Console existe pour le domaine ; aucune fiche Google Business Profile n’a encore été créée. Le suivi et les actions externes sont documentés dans `docs/seo-local.md`.

Le développement local utilise la devbox ; sa configuration doit rester distincte de la production. Les services partagés ne doivent pas être modifiés sans accord explicite et les secrets ne doivent pas être versionnés ni affichés.

## Capabilities and Constraints

- Application React et Vite, avec Tailwind CSS et des animations en CSS natif.
- Sections actuelles : présentation, à propos, projets, expérience, témoignages, zones d’intervention et FAQ, puis contact.
- Formulaire de contact intégré à EmailJS, avec repli vers la messagerie lorsque le service n’est pas configuré. PostHog a été retiré à la demande de Pierre : aucune instrumentation analytique à réintroduire sans nouvelle demande explicite.
- Mentions légales et politique de confidentialité présentes dans le projet.
- Ne pas transformer l’ouverture aux missions en une spécialisation commerciale exclusive sans confirmation de Pierre.
- Les disponibilités, coordonnées, dates et modalités commerciales restent à vérifier avant toute nouvelle affirmation ou modification de contenu.

## Brand Commitments

Préserver l’identité professionnelle de Pierre Clément et son engagement pour des solutions sur mesure. Accorder de l’importance à la qualité, la maintenabilité, la simplicité, les performances et les bonnes pratiques d’ingénierie.

Dans les textes du site, utiliser le tiret simple `-` plutôt que les tirets typographiques longs, conformément à la préférence de Pierre.

Employer la première personne (« je » / « I ») lorsque Pierre parle de son travail ou de sa gestion du site, y compris dans les explications de confidentialité. Conserver son nom complet pour la signature, l’identification légale, le référencement et les textes alternatifs ; préserver la voix des auteurs des témoignages.

## Evidence on Hand

- `src/sections/Projects.jsx` : présentations et liens des projets ONTBO, Nightingale, LynxJS et DragN’Receive.
- `src/sections/Experience.jsx` : parcours professionnel existant et téléchargement du CV dans la langue choisie.
- `src/sections/Testimonials.jsx` : témoignages attribués et portraits associés.
- `src/sections/Hero.jsx` : présentation, portrait, disponibilité et liens professionnels.
- `src/sections/ServiceAreas.jsx` : zones d’intervention et FAQ bilingues de la page principale.
- `public/` : photographie de profil, visuels de projets et portraits utilisés par le site.

Ces éléments sont des contenus existants, pas une autorisation d’inventer des clients, résultats chiffrés, recommandations ou références supplémentaires. Préserver le sens des contributions et l’attribution des témoignages.

## Product Principles

1. Rendre le parcours et les compétences compréhensibles pour évaluer une collaboration.
2. Garder les missions en régie et au forfait également possibles.
3. Présenter le sur-mesure comme une réponse aux besoins réels du client.
4. Étayer le positionnement avec les réalisations et témoignages disponibles.
5. Faciliter une prise de contact adaptée au projet du visiteur.

## Langues et référencement

Le portfolio propose le même contenu en français à `/` et en anglais à `/en/`, avec un sélecteur FR/EN visible sur ordinateur et mobile. Les deux versions partagent les composants, les références, les médias et les liens. Le changement de langue conserve la section et le brouillon du formulaire sans cookie ni stockage persistant.

Les deux pages principales, en français et en anglais, sont prérendues pour GitHub Pages. Titres, descriptions, aperçus sociaux, données structurées et liens canoniques sont propres à chaque langue. Les alternatives `hreflang` et le sitemap relient les versions correspondantes. Ne pas ajouter de redirection automatique fondée sur la langue du navigateur.

Les mentions légales et la politique de confidentialité se lisent sur des pages dédiées : `/mentions-legales/` et `/confidentialite/`, traduites sur `/en/legal-notice/` et `/en/privacy-policy/`. Elles reprennent la navigation et le footer du portfolio. Les six pages sont prérendues et présentes dans un sitemap unique, avec des métadonnées propres à chaque document. Le sélecteur FR/EN conserve le document consulté. Le lien de confidentialité du formulaire ouvre un nouvel onglet pour préserver la saisie en mémoire. Les anciens dialogues et leur routage par fragments sont retirés sans compatibilité, à la demande de Pierre.

Le CV est disponible en français et en anglais ; chaque version du site propose le PDF dans sa langue. Les témoignages anglais sont signalés comme des traductions de la version française disponible, sans présenter une retraduction comme une citation originale.
