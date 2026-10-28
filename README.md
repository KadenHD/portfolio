# Portfolio de Pierre Clément

Portfolio bilingue React et Vite : une page principale en français sur `/` et sa traduction anglaise sur `/en/`. Les zones d’intervention et la FAQ sont intégrées à cette page. Les mentions légales et la politique de confidentialité disposent de pages dédiées dans les deux langues. Les versions utilisent les mêmes composants et médias. Le site est publié sur GitHub Pages avec son domaine personnalisé.

## Développement

```sh
nvm use
npm ci
npm run dev
```

Node 24.21.0 est défini dans `.nvmrc`. Vite autorise l’hôte `devbox` ; la configuration de développement reste distincte de la production. Le serveur temporaire devbox est un processus de développement, pas le déploiement public.

| Commande               | Usage                                                                                  |
| ---------------------- | -------------------------------------------------------------------------------------- |
| `npm run lint`         | Vérification du frontend et des scripts                                                |
| `npm test`             | Parité FR/EN, références conservées, navigation et métadonnées                         |
| `npm run build`        | Génération des fichiers SEO et bundle dans `dist/`                                     |
| `npm run prerender`    | Régénération des visuels de marque, build puis six pages HTML FR/EN dans `static-pages/` |
| `npm run preview`      | Prévisualisation du bundle Vite, avec repli SPA                                        |
| `npm run preview:seo`  | Régénération et prévisualisation locale des pages prérendues et des images OG/Twitter |
| `npm run test:browser` | Recette des pages statiques déjà générées avec Chromium                                |
| `npm run brand`        | Régénération des icônes et previews FR/EN avec Chromium                                |
| `npm run social`       | Alias de `npm run brand`                                                               |

Chromium est installé par Puppeteer lors de `npm ci`. Sur Linux, ses bibliothèques système doivent être disponibles. `PUPPETEER_EXECUTABLE_PATH` permet d’utiliser un navigateur déjà installé. Les commandes qui ouvrent un navigateur s’exécutent dans un environnement de développement ou de CI de confiance.

Pour vérifier les liens directs comme sur GitHub Pages, servir `static-pages/` avec un serveur de fichiers, sans repli de toutes les URL vers `index.html`. Chaque route déclarée dans `src/i18n/routing.js` doit posséder son propre `index.html`. Le bundle `dist/` seul ne constitue pas la livraison bilingue prérendue.

`react-static-prerender` 1.3 aplatit les chemins imbriqués ; `scripts/finalize-static.mjs` rétablit les dossiers anglais attendus et retire les dossiers intermédiaires avant de contrôler les fichiers livrés. Utiliser la commande complète `npm run prerender`.

### Prévisualisation avec seo.devbox

Le serveur Vite de développement renvoie le modèle HTML français avant l’exécution de JavaScript, y compris sur `/en/`. Un analyseur sans navigateur ne voit donc pas la traduction appliquée ensuite. Les images sociales déclarées pointent normalement vers le domaine public et peuvent y répondre 404 avant leur publication.

Pour une recette locale, utiliser les pages prérendues :

```sh
npm run preview:seo
```

La commande régénère la livraison puis écoute sur `127.0.0.1:5175`. Sur devbox, ajouter `-- --host ADRESSE_IP_TAILSCALE` en remplaçant cette valeur par l’IPv4 Tailscale de la machine ; analyser ensuite `http://devbox:5175/` et `http://devbox:5175/en/` dans [seo.devbox](http://seo.devbox/). Le port est réglable avec `--port`. Si les pages viennent déjà d’être générées, `node scripts/preview-seo.mjs --host ADRESSE_IP_TAILSCALE` évite de reconstruire.

Ce serveur conserve les URL canoniques, les alternatives linguistiques et les fichiers de production. Il adapte uniquement les URL des images OG/Twitter dans le HTML envoyé pour les servir depuis la même origine locale. Le code client conserve son comportement de production ; le diagnostic SEO porte sur la réponse HTML initiale. Les pages inconnues restent en 404. Un en-tête `X-Robots-Tag: noindex, nofollow` protège cette prévisualisation de l’indexation : l’avertissement correspondant dans l’analyseur est attendu. Le serveur s’arrête avec `Ctrl+C` ; il ne remplace ni le serveur Vite ni le déploiement GitHub Pages.

Limite constatée dans seo.devbox le 20 octobre 2026 : son extraction compte également les éléments `title` des icônes SVG et signale alors plusieurs titres. Le document possède bien un seul `head > title` ; les titres SVG sont des libellés d’icônes. Ce faux positif relève de l’analyseur, dont le code n’est pas modifié par ce projet.

## Contenus et langues

- `src/i18n/fr.js` et `en.js` : textes de l’interface, services et résumés.
- `src/data/portfolio.js` : références françaises, identifiants stables, dates, technologies, liens et médias.
- `src/i18n/portfolio.en.js` : traduction des expériences, projets et témoignages ; les faits et ressources sont partagés.
- `src/data/socials.js` : liens et logos professionnels.
- `src/data/legal.js` : identité de l’éditeur et textes légaux français.
- `src/i18n/legal.en.js` : traduction complète des textes légaux.
- `src/i18n/routing.js` : langues et URL publiques.
- `src/data/serviceAreas.js` : zones desservies, références locales et questions/réponses FR/EN de la section de proximité.

Le sélecteur FR/EN met à jour l’URL, le contenu et les métadonnées sans recharger la page. Il conserve le document consulté, l’ancre, les paramètres de recherche et les champs saisis en mémoire sur le portfolio. Les boutons précédent/suivant du navigateur fonctionnent. Les liens restent utilisables sans JavaScript grâce aux six pages statiques. Aucun cookie de langue et aucune redirection automatique ne sont ajoutés.

| Contenu | Français | Anglais |
| --- | --- | --- |
| Portfolio | `/` | `/en/` |
| Mentions légales | `/mentions-legales/` | `/en/legal-notice/` |
| Confidentialité | `/confidentialite/` | `/en/privacy-policy/` |

Les pages légales utilisent le défilement normal, la navigation et le footer communs. Leurs liens de section ramènent au portfolio dans la langue courante. Le lien de confidentialité du formulaire ouvre un nouvel onglet pour préserver la saisie ; cette ouverture est annoncée aux lecteurs d’écran. Les anciens dialogues et leur gestion par fragments ont été retirés, sans redirection de compatibilité.

Les descriptions d’expériences et leurs passages en gras reprennent les versions HTML françaises et anglaises des CV du dépôt privé `personal-branding`, dans `cv/` (`CV_Pierre_Clement.html` et `CV_Pierre_Clement_EN.html`). Préserver les résultats chiffrés lors des harmonisations, notamment la formulation « 400% » sans la recalculer. Les expressions longues ont priorité sur leurs mots-clés courts pour conserver les mises en gras complètes.

À chaque modification, mettre à jour les deux langues puis exécuter `npm test`. Les tests vérifient notamment les quatre projets, leurs 54 tags, les cinq expériences, les attributions des témoignages et toutes les sections légales. Ne pas inventer de références, résultats ou qualifications. Le bouton CV propose le PDF français sur `/` et le PDF anglais sur `/en/` ; leurs URL sont définies dans les catalogues de langue.

Le badge du portrait affiche un libellé court sur une ligne (`hero.yearsShort`) et un libellé complet pour les lecteurs d’écran (`hero.experienceLabel`). Le nombre reste calculé à l’affichage : année courante moins 2020 moins 1. Les règles de placement et les états de survol de la signature sont décrits dans [DESIGN.md](DESIGN.md).

Les textes de plateformes, cartes FR/EN, supports LinkedIn et leurs scripts sont maintenus dans le dépôt privé voisin `../personal-branding`. Les sources HTML des CV et du README GitHub y sont également centralisées ; seuls le README public et les deux PDF sont synchronisés vers `KadenHD/KadenHD`. Voir [la séparation des dépôts](docs/branding-externalisation.md). Les icônes et previews OG/X propres au site restent générées ici par `npm run brand`.

Les quatre projets partagent une section et un format de carte communs, dans l’ordre ONTBO, Nightingale Project, LynxJS et DragN’Receive. `projects.summaries` fournit l’utilité et la contribution personnelle pour chacun dans les deux langues ; les descriptions complètes, liens et 54 technologies restent dans les données de portfolio. Le schéma conceptuel ONTBO est conservé dans sa carte. Les tests vérifient la présence des quatre résumés et la recette navigateur contrôle leur présentation sous un titre commun, avec la contribution de Pierre sur chaque carte.

## Référencement et déploiement

`src/lib/seo.js` centralise le domaine, les titres, descriptions, aperçus sociaux et données structurées. `scripts/generate-site.mjs` actualise le bloc SEO de `index.html`, `public/sitemap.xml`, `public/robots.txt` et les deux manifestes. Ne pas modifier leurs valeurs générées à la main. L’icône source est `public/favicon.svg` et la composition de partage se trouve dans `scripts/social-card-template.mjs`. `npm run brand` exporte les PNG de favicon, l’ICO multirésolution, les icônes Apple/Android et les deux previews 1200 × 630. `npm run prerender` les régénère automatiquement avant le build. Versionner les exports obtenus avec leurs sources. `public/preview.png` reste une copie à jour de la preview française pour les anciennes références. Les URL des icônes et des images Open Graph portent une version pour renouveler les ressources mises en cache lors d’un changement d’identité.

Chaque page possède son titre, sa description, une URL canonique distincte et des alternatives réciproques `fr`, `en` et `x-default` vers le même document traduit. Le sitemap unique comprend six URL. Les données structurées distinguent la personne, son entreprise, le site et la page ; les services avec zones desservies sont décrits sur les deux pages principales. Paris est identifié comme une domiciliation administrative dans une `Organization`, sans inventer un établissement `LocalBusiness` ou `ProfessionalService`. Les services locaux couvrent l’Oise, Compiègne, Beauvais, les Hauts-de-France et l’Île-de-France ; un service à distance conserve la portée internationale. La page `404.html` est bilingue et exclue de l’indexation. Le sitemap n’utilise pas de date de modification artificiellement actualisée à chaque build.

Le workflow `.github/workflows/static.yml` vérifie le code et les contenus, génère les six pages, puis publie uniquement `static-pages/` après un push sur `dev`. Le domaine reste défini par `public/CNAME`. Une modification locale n’est visible publiquement qu’après déploiement. Après publication autorisée, contrôler les six URL ci-dessus, les aperçus de partage et le traitement du sitemap dans la propriété de domaine Search Console existante. La procédure et les textes préparés pour Google Business Profile sont documentés dans [docs/seo-local.md](docs/seo-local.md).

Référence : [versions linguistiques dans Google Search](https://developers.google.com/search/docs/specialty/international/localized-versions).

## Formulaire et recette

Les trois variables de `.env.example` sont des identifiants publics du frontend EmailJS. Le workflow les lit depuis les secrets GitHub correspondants. Ne jamais placer de clé privée dans une variable `VITE_*`. Sans configuration complète, le formulaire prépare un brouillon dans la messagerie du visiteur.

EmailJS n’est chargé qu’au moment de l’envoi. Les données ne sont pas conservées dans le stockage persistant du navigateur. Un envoi réussi efface les champs ; une erreur les préserve et propose un envoi par email.

La recette navigateur couvre les six pages sans JavaScript, tous leurs liens et fragments internes, et les largeurs 1440, 1024, 901, 900, 768, 701, 390 et 320 px. Elle vérifie aussi la présence de toutes les réponses de la FAQ et son utilisation au clavier. Elle contrôle la navigation mobile, le changement de langue, le brouillon, l’historique et le rechargement des pages légales. Les documents légaux sont vérifiés intégralement, avec une taille de texte de 16 px et des liens au survol orange. La recette vérifie aussi le texte complet des expériences, leurs passages en gras, les puces orange, l’absence de troncature et les liens de CV propres à chaque langue. Les requêtes EmailJS sont interceptées : aucun message réel n’est envoyé. Avec un formulaire configuré, la recette simule succès et échec ; sinon, elle vérifie le brouillon email. `PORTFOLIO_SCREENSHOTS=/tmp/portfolio-screens npm run test:browser` enregistre des captures hors du dépôt.

## Confidentialité et fichiers publics

PostHog a été retiré à la demande de Pierre. Ne pas réintroduire d’outil de suivi sans nouvelle demande. `src/lib/clearLegacyAnalytics.js` retire les anciens identifiants analytiques localement, sans contacter l’ancien prestataire ni effacer les préférences sans rapport.

Polices, illustrations, captures et icônes sont servies avec le site. Calendly et les réseaux sont de simples liens externes. Les licences sont dans `public/licenses/` et `public/fonts/OFL.txt`.

Tout fichier placé dans `public/` est déployé. Les fichiers de provenance des images et les portraits de travail sont conservés dans `assets/provenance/` et `assets/portraits/`, exclus de Git et du build. Les registres opérationnels privés de `docs/` et les fichiers `.env*` sont également exclus du versionnement, à l’exception du modèle `.env.example`. `robots.txt` ne protège pas des secrets.

Les composants, le hook mobile et les logos inutilisés de l’ancienne version ont été retirés du code actif, ainsi que Framer Motion, les SDK PostHog et l’ancien skill d’intégration PostHog. Les anciens portraits, fonds, illustrations et captures retirées sont archivés localement dans `.archive/`, hors versionnement et déploiement. Le rapport historique PostHog y est également conservé. L’illustration ONTBO active reste dans `assets/plates/` ; sa source originale et sa provenance sont rangées dans `assets/provenance/plates/`. Les métadonnées de génération sont retirées du PNG distribué, sans changer les données d’image ou de couleur ; un test vérifie que cet export ne contient pas de métadonnées textuelles ou EXIF.

Les exports nécessaires aux navigateurs, les captures de Nightingale, LynxJS et DragN’Receive, le schéma ONTBO, les portraits de témoignages, les deux previews sociales, leur ancienne URL `preview.png` et les licences sont conservés. Le nettoyage des anciens identifiants analytiques reste actif pour les visiteurs des versions précédentes. Tailwind reste utilisé pour la base CSS ; les anciens tokens de thème sans consommateur ont été retirés.

Les textes légaux reflètent les informations validées par Pierre. La suppression des demandes sans suite 12 mois après le dernier échange doit aussi être appliquée dans Gmail et les comptes de prestataires ; le site statique ne peut pas l’effectuer dans ces comptes. Contrats, comptabilité et litiges demandent une conservation distincte. Le retrait d’un SDK ne supprime pas les données historiques du compte du prestataire.

Les mentions légales FR/EN incluent les coordonnées de CM2C fournies par Pierre le 26 octobre 2026 : 49 rue de Ponthieu, 75008 Paris ; téléphone +33 1 89 47 00 14 ; email litiges@cm2c.net ; [déclaration d’un litige](https://www.cm2c.net/declarer-un-litige.php). Le recours gratuit est présenté après une démarche préalable auprès du professionnel n’ayant pas donné satisfaction. La mention doit aussi être reprise dans les CGV/conditions de service et bons de commande utilisés pour les clients consommateurs ; ces documents contractuels ne sont pas générés par le portfolio. Conserver la convention de médiation et ses dates d’effet avec les documents de l’entreprise.
