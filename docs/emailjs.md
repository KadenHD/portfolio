# Modèle EmailJS du portfolio

`emailjs.html`, sur `main`, est le modèle de notification reçu par Pierre. Il sert aux demandes envoyées depuis les pages françaises et anglaises ; la notification reste en français et le message du visiteur reste dans sa langue d’origine.

Le site et son workflow de déploiement restent sur `dev`. Modifier ce fichier ne met pas à jour le modèle hébergé dans EmailJS et ne déclenche pas le déploiement du site.

## Installation dans EmailJS

Dans **Email Templates**, ouvrir le modèle correspondant au `VITE_EMAILJS_TEMPLATE_ID` utilisé par le site.

1. Dans l’éditeur HTML du contenu, remplacer l’ancien modèle par le contenu de `emailjs.html`.
2. Configurer les champs ci-dessous, puis enregistrer.
3. Utiliser **Test It** avec des coordonnées fictives et un message sur plusieurs lignes. Cette étape envoie un véritable email au destinataire configuré.
4. Après vérification du rendu et de l’adresse de réponse, tester une soumission du formulaire publié.

| Champ EmailJS | Valeur |
| --- | --- |
| Subject | `[Portfolio] Nouveau message de {{name}}` |
| To Email | `pierre.clement.oise@gmail.com` (valeur fixe) |
| From Name | `Portfolio - Pierre Clément` |
| From Email | Conserver l’adresse authentifiée du service connecté, ou « Use Default Email Address » si proposé |
| Reply To | `{{email}}` |

Ne pas mettre l’adresse du visiteur dans **From Email**, ni utiliser une variable fournie par le navigateur comme destinataire. **Reply To** permet de répondre directement au visiteur depuis Gmail ; le bouton orange est un second accès par lien `mailto:`.

## Variables du formulaire

Le formulaire actuel (`dev:src/sections/Contact.jsx`) transmet exactement :

| Variable | Contenu |
| --- | --- |
| `{{name}}` | Nom saisi par le visiteur |
| `{{email}}` | Adresse de réponse du visiteur |
| `{{message}}` | Besoin exprimé, avec ses retours à la ligne |

Le champ `{{time}}` de l’ancien modèle est retiré : il n’est pas envoyé par le formulaire. La date de réception est fournie par la messagerie.

Conserver les **doubles accolades** : EmailJS échappe les valeurs par défaut. Ne pas remplacer le message par `{{{message}}}`, qui injecterait du HTML non échappé. Ne pas ajouter de collecte d’IP, d’informations de navigateur ou de pièce jointe à ce modèle.

## Direction visuelle et compatibilité

- Fond clair `#f4f6f9`, contenu blanc, texte marine `#091638`, texte secondaire `#516079`.
- Orange signal `#f44b0b` pour les points de la signature et du titre ; orange action `#c83c0a` pour les liens et le bouton.
- Manrope avec repli Arial/sans-serif : aucune police distante n’est chargée. La plupart des messageries utiliseront leur police de repli.
- Composition en tableaux, styles en ligne, largeur fluide limitée à 600 px. Les arrondis sont décoratifs : le contenu reste lisible si un client mail les ignore.
- Le message est affiché en texte, avec conservation des retours à la ligne et coupure des adresses et mots longs. Aucun portrait, pixel de suivi, script ni image distante.

Vérifier le rendu final dans Gmail sur ordinateur et mobile : un aperçu navigateur ne reproduit pas les transformations d’un client mail. Les emails reçus dans Gmail restent soumis à la procédure de conservation du portfolio ; ce modèle ne supprime pas automatiquement les demandes après 12 mois.

Documentation officielle : [variables et échappement EmailJS](https://www.emailjs.com/docs/user-guide/dynamic-variables-templates/).
