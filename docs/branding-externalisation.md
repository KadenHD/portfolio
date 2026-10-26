# Séparation du portfolio et du branding

La migration locale du 21 octobre 2026 sépare trois dépôts :

| Dépôt | Rôle |
| --- | --- |
| `portfolio` | Site React bilingue, SEO, images de contenu, favicon et aperçus OG/X du site |
| `personal-branding` (privé) | Textes de profils, cartes, supports LinkedIn, images sources, scripts de composition, HTML FR/EN des CV et source du README GitHub |
| `KadenHD/KadenHD` (public) | README du profil et deux CV PDF générés |

Les fichiers de l’ancien dossier de supports de marque et les scripts `linkedin-banner`, `linkedin-profile` et `business-card-portrait` ont été transférés dans `../personal-branding`. Leurs polices, photos sources et masques nécessaires ont été copiés dans le dépôt privé pour qu’il soit indépendant de ce checkout.

## Où modifier les contenus

Depuis la racine du portfolio, les chemins de travail sont :

- `../personal-branding/BRANDING.md` pour les textes réutilisables.
- `../personal-branding/AGENTS.md` et `DESIGN.md` pour les consignes de marque.
- `../personal-branding/github/README.md` pour le profil GitHub.
- `../personal-branding/cv/CV_Pierre_Clement.html` et `CV_Pierre_Clement_EN.html` pour les CV.

Les données et traductions du site restent dans `src/data/` et `src/i18n/`. Un changement de fond se reporte dans les deux langues du portfolio et dans les HTML des CV concernés. La synchronisation du profil ne modifie pas automatiquement ces données du site.

## Publication

Le workflow du dépôt privé génère les PDF et synchronise uniquement `README.md`, `CV_Pierre_Clement.pdf` et `CV_Pierre_Clement_EN.pdf` vers `KadenHD/KadenHD`. Les URL publiques utilisées par le site ne changent pas :

- FR : `https://raw.githubusercontent.com/KadenHD/KadenHD/main/CV_Pierre_Clement.pdf`
- EN : `https://raw.githubusercontent.com/KadenHD/KadenHD/main/CV_Pierre_Clement_EN.pdf`

L’automatisation du profil est définie dans le dépôt privé. Ses paramètres GitHub App et secrets Actions se configurent sur GitHub et ne sont pas copiés dans le portfolio. La procédure d’exploitation est dans `../personal-branding/docs/publication.md`. LinkedIn et Malt restent mis à jour manuellement.

Les scripts `brand-assets.mjs` et `social-card-template.mjs` restent dans le portfolio : `npm run brand` et le prérendu continuent à générer les ressources publiques du site sans accès au dépôt privé.
