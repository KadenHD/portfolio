# Référencement local - suivi au 26 octobre 2026

## Positionnement retenu

Pierre Clément, ingénieur logiciel indépendant : conseil IT et développement sur mesure, en régie comme au forfait. Priorité à l’Oise, notamment Compiègne et Beauvais, puis aux Hauts-de-France et à l’Île-de-France. Le travail à distance reste ouvert à l’international. Les prestations restent accessibles aux entreprises, indépendants, associations et particuliers.

Paris est une domiciliation administrative. Aucun bureau à Compiègne ou Beauvais, aucune adresse opérationnelle, aucun horaire d’accueil et aucune coordonnée géographique ne sont inventés. La commune de travail réelle et les modalités de rencontre restent à confirmer avant de créer une fiche Google Business Profile.

## Mesures dans le dépôt

- Une seule page de présentation par langue : `/` et `/en/`. Les pages de prestations testées localement ont été retirées à la demande de Pierre avant toute publication ; il n’y a pas de migration publique de ces URL à organiser.
- Titre et description SEO de l’accueil centrés sur l’Oise ; Compiègne, Beauvais, Hauts-de-France, Île-de-France et travail à distance visibles dans le texte et le contact.
- Section `#service-areas` avant le contact : zones desservies, formats d’intervention et liens directs vers les expériences UTeam et ONTBO à Compiègne, ainsi que Weldom à Breuil-le-Sec. Aucun résultat ou client local inventé.
- FAQ `#faq` avec cinq questions sur les rencontres, la régie/le forfait, les types de projets, les particuliers et les missions à distance/internationales. Réponses intégralement présentes dans le HTML prérendu, interaction native au clavier et liens d’accès depuis le pied de page.
- La FAQ sert à informer les visiteurs. Aucun balisage `FAQPage` ou résultat enrichi promis : Google a cessé d’afficher les résultats enrichis FAQ à partir du 7 mai 2026, selon son journal officiel.
- Suppression du composant de page de prestation, des textes longs correspondants, des styles, des routes, du fil d’Ariane et du traitement des chemins imbriqués devenus inutiles.
- Données structurées conservées : `Person`, `Organization` avec adresse de domiciliation identifiée, `Service` avec zones desservies explicites, service à distance international, `WebSite` et `WebPage`. Aucun bureau `LocalBusiness` ou `ProfessionalService` inventé, aucune note ni étoile ajoutée.
- Titres et descriptions, URL canoniques, alternatives FR/EN/x-default, Open Graph et Twitter adaptés à chaque langue. Sitemap ramené aux deux URL principales ; `robots.txt`, prérendu et CI alignés.
- Aucun outil de suivi ajouté. Search Console existe pour le domaine ; aucune nouvelle balise de vérification n’est requise pour ces changements dans la même propriété.

## URL publiques à contrôler

| Contenu | Français | Anglais |
| --- | --- | --- |
| Portfolio | `/` | `/en/` |
| Proximité | `/#service-areas` | `/en/#service-areas` |
| FAQ | `/#faq` | `/en/#faq` |

Les ancres ne sont pas des pages distinctes à soumettre dans le sitemap. Le contrôle public du 26 octobre 2026 confirme des réponses HTTP 200 pour `/` en français, `/en/` en anglais, `robots.txt` et `sitemap.xml`. Le sitemap public contient les deux URL principales et `robots.txt` le déclare. Ce contrôle d’accessibilité ne démontre pas que Google a indexé les deux pages.

## Google Search Console : propriété de domaine déjà existante

Après chaque déploiement :

1. Ouvrir la propriété de domaine `pierre-clement-oise.fr`.
2. Dans Sitemaps, vérifier le traitement de `https://pierre-clement-oise.fr/sitemap.xml`. Si cette adresse n’est pas encore soumise, la soumettre. Si elle existe déjà, contrôler sa prochaine lecture et ses erreurs éventuelles.
3. Inspecter les deux URL principales ci-dessus, tester leur version en ligne et vérifier qu’elles peuvent être indexées. Demander l’indexation des pages nouvelles ou substantiellement mises à jour si l’outil le permet ; une demande ne garantit ni l’indexation ni une position.
4. Contrôler ensuite l’indexation et l’URL canonique retenue par Google. Les alternatives linguistiques doivent relier les deux pages principales en français et en anglais.
5. Exporter un état initial des performances, puis comparer des périodes de même durée, par exemple les 28 derniers jours aux 28 précédents. Distinguer les recherches sur le nom de celles portant sur les prestations. Éviter de tirer une conclusion de faibles volumes ou d’une seule recherche manuelle.

Requêtes à surveiller (cibles proposées, volumes et positions actuels non mesurés) :

- développeur freelance Compiègne ; développeur logiciel Compiègne ; logiciel sur mesure Compiègne ;
- développeur freelance Beauvais ; développeur logiciel Beauvais ; logiciel sur mesure Beauvais ;
- développement logiciel Oise ; application métier Oise ; automatisation Oise ;
- ingénieur logiciel freelance Hauts-de-France ;
- ingénieur logiciel freelance Île-de-France ; développeur full-stack freelance Île-de-France ; conseil DevOps Île-de-France.

Filtre de requête possible dans GSC : `(?i)(oise|compi[eè]gne|beauvais|hauts[- ]de[- ]france|[iî]le[- ]de[- ]france)`.

Pour chaque période, noter impressions, clics, CTR, position moyenne, requêtes et pages concernées. La position moyenne est un indicateur agrégé, pas une position fixe pour tous les internautes. Les prises de contact et missions obtenues peuvent être suivies manuellement, sans ajouter de traceur au site. Aucun chiffre de performance n’a été inventé et aucun accès à la propriété GSC n’était disponible pendant ce travail.

## Google Business Profile : fiche non créée

À faire depuis le compte de Pierre, après confirmation de l’implantation réelle et de l’éligibilité :

1. Vérifier l’absence de fiche existante pour éviter un doublon.
2. Utiliser le nom réel de l’activité, sans ajouter des villes ou mots-clés au nom pour le référencement. Choisir la catégorie disponible qui décrit réellement l’activité de développement logiciel ; ses libellés exacts sont à vérifier dans l’interface.
3. Fournir à Google l’implantation réelle et suivre sa procédure de validation. Ne pas utiliser la domiciliation parisienne comme un bureau recevant des clients.
4. Si Pierre se déplace chez les clients et ne reçoit pas à son adresse, choisir une activité de zone desservie et masquer l’adresse publique selon les règles de Google. Une activité exclusivement en ligne n’est pas éligible. Les zones de la fiche doivent correspondre aux déplacements réellement assurés ; elles ne représentent pas toute la portée du travail à distance.
5. Renseigner le site, le téléphone et les services réels : développement logiciel sur mesure, applications métier, développement web et mobile, API, automatisation, conseil IT, full-stack, architecture, DevOps, IA et R&D.
6. Publier une photo professionnelle fidèle et des visuels de projets autorisés, sans les présenter comme des locaux physiques.
7. Inviter les clients ayant réellement bénéficié d’une prestation à laisser un avis honnête, sans contrepartie et sans filtrer les sollicitations selon la satisfaction. Les témoignages de collègues sur le portfolio ne doivent pas être transformés automatiquement en avis clients Google.

Texte de présentation préparé (à utiliser une fois l’éligibilité confirmée) :

> Ingénieur logiciel indépendant, j’accompagne les entreprises, indépendants, associations et particuliers dans leurs projets de développement sur mesure : applications métier, web et mobile, API, automatisation, intégrations d’IA et prototypage R&D. J’interviens en régie ou au forfait, de la compréhension du besoin à la mise en production, avec une attention portée à la qualité, à la maintenabilité et aux pratiques de développement full-stack et DevOps. Mes zones d’intervention comprennent l’Oise, notamment Compiègne et Beauvais, les Hauts-de-France et l’Île-de-France. Les modalités de rencontre sont convenues selon la mission. La collaboration à distance est également possible.

La création, la validation de la fiche et la collecte d’avis ne peuvent pas être réalisées par une modification du code du site. Aucune fiche ni aucun avis n’a été publié pendant ce travail.

## Cohérence des profils et références locales

Description courte à reprendre sur les profils professionnels que Pierre souhaite mettre à jour :

> Ingénieur logiciel indépendant - Conseil IT et développement sur mesure : full-stack, DevOps, architecture, IA et R&D. Oise : Compiègne, Beauvais ; Hauts-de-France et Île-de-France. En régie ou au forfait, et à distance.

Les liens d’identité du site incluent LinkedIn, GitHub, Pappers, Malt et la présentation UTeam déjà référencée dans le portfolio. Les profils externes n’ont pas été modifiés. Vérifier leurs coordonnées et leur zone d’intervention, en séparant domiciliation et implantation réelle lorsque la plateforme le permet. Les liens de partenaires locaux doivent correspondre à de vraies relations : par exemple, proposer une mise à jour de la présentation existante à UTeam, sans inventer de nouvelle collaboration ni acheter des liens.

## Validation locale

La consolidation est vérifiée avec les commandes du dépôt : lint, tests, build, prérendu FR/EN et recette navigateur. Les contrôles couvrent les métadonnées, les zones desservies, le sitemap à deux URL, les liens internes, la présence complète des cinq réponses et l’ouverture/fermeture de la FAQ au clavier. Le contrôle responsive porte sur les largeurs 1440/1024/768/701/390/320 px. Les captures de cette recette restent hors du dépôt dans `/tmp/portfolio-local-faq-checks/`.

Ces contrôles locaux ne constituent ni une validation de l’indexation par Google, ni une mesure de classement. Les commandes de recette ne publient pas le site ; le workflow GitHub Pages est déclenché séparément par un push sur `dev`.

## Sources

- [Versions linguistiques des pages - Google Search Central](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Règles relatives aux pages satellites - Google Search Central](https://developers.google.com/search/docs/essentials/spam-policies#doorway-abuse)
- [Service - Schema.org](https://schema.org/Service)
- [Consignes de représentation d’un établissement - Google](https://support.google.com/business/answer/3038177?hl=fr)
- [Éligibilité à une fiche d’établissement - Google](https://support.google.com/business/answer/13763036?hl=fr)
- [Classement local - Google](https://support.google.com/business/answer/7091?hl=fr)
- [Utiliser Search Console - Google Search Central](https://developers.google.com/search/docs/monitor-debug/search-console-start)
- [Filtres avancés et expressions régulières dans Search Console](https://support.google.com/webmasters/answer/17011165?hl=fr)
- [Règles sur les avis et les faux engagements - Google](https://support.google.com/business/answer/7400114?hl=fr)

- [Fin des résultats enrichis FAQ - journal Google Search Central](https://developers.google.com/search/updates#may-2026)
