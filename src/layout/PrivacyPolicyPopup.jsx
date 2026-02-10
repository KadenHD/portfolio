import { forwardRef } from "react";
import {Popup} from "@/components/Popup"

const privacyPolicy = [
  // { title, texts, links, spacing }
  {
    texts: [
      "La présente politique de confidentialité a pour objectif d’informer les utilisateurs du site sur la manière dont leurs données personnelles sont collectées, utilisées et protégées, conformément au Règlement Général sur la Protection des Données (RGPD)."
    ],
    spacing: true
  },
  {
    title: 'Responsable du traitement',
    texts: [
      'Pierre Clément',
      'Entreprise Individuelle (994 768 406)',
      '60 rue François Ier, 75008, Paris (FR)'
    ],
    links: [
      { href: 'mailto:pierre.clement.oise@gmail.com', text: 'pierre.clement.oise@gmail.com' },
      { href: 'tel:+330682635025', text: '+33 6 82 63 50 25'},
      { href: 'https://pierre-clement-oise.fr/', text: 'https://pierre-clement-oise.fr/'}
    ]
  },
  {
    title: "Données collectées",
    texts: [
      "Les données personnelles collectées sur ce site sont uniquement celles transmises volontairement par l’utilisateur via le formulaire de contact.",
      "Ces données peuvent inclure :",
      "- Nom ou pseudonyme",
      "- Adresse e-mail",
      "- Contenu du message"
    ]
  },
  {
    title: "Finalité de la collecte",
    texts: [
      "Les données collectées via le formulaire de contact sont utilisées uniquement pour :",
      "- Répondre aux messages et demandes de contact",
      "- Assurer le suivi des échanges professionnels",
      "Aucune donnée n’est utilisée à des fins commerciales, publicitaires ou de profilage."
    ]
  },
  {
    title: "Traitement des données via EmailJS",
    texts: [
      "L’envoi des messages via le formulaire de contact est assuré par le service tiers EmailJS.",
      "À ce titre, certaines données (nom, adresse e-mail, message) sont transmises à EmailJS uniquement dans le but de permettre l’envoi des e-mails.",
      "EmailJS agit en tant que sous-traitant et s’engage à respecter la réglementation en vigueur en matière de protection des données."
    ],
    links: [
      { href: "https://www.emailjs.com/legal/privacy-policy/", text: "Politique de confidentialité EmailJS" }
    ],
    spacing: true
  },
  {
    title: "Durée de conservation",
    texts: [
      "Les données personnelles transmises via le formulaire de contact sont conservées uniquement le temps nécessaire au traitement de la demande et aux échanges qui en découlent.",
      "Elles ne sont pas stockées dans une base de données du site."
    ],
    spacing: true
  },
  {
    title: "Partage des données",
    texts: [
      "Les données personnelles ne sont ni vendues, ni échangées, ni cédées à des tiers.",
      "Elles sont uniquement accessibles au responsable du site et au service EmailJS dans le cadre strict de l’envoi des messages."
    ],
    spacing: true
  },
  {
    title: "Liens vers des sites tiers",
    texts: [
      "Le site peut contenir des liens ou redirections vers des sites internet tiers.",
      "Le responsable du site ne peut être tenu responsable des pratiques de confidentialité ou du contenu de ces sites externes.",
      "Il est recommandé à l’utilisateur de consulter la politique de confidentialité propre à chaque site visité."
    ],
    spacing: true
  },
  {
    title: "Cookies",
    texts: [
      "Ce site n’utilise aucun cookie de suivi ou de mesure d’audience.",
      "Aucun dépôt de cookie n’est effectué lors de la navigation."
    ],
    spacing: true
  },
  {
    title: "Droits des utilisateurs",
    texts: [
      "Conformément à la réglementation en vigueur, l’utilisateur dispose des droits suivants concernant ses données personnelles :",
      "- Droit d’accès",
      "- Droit de rectification",
      "- Droit à l’effacement",
      "- Droit à la limitation du traitement",
      "- Droit d’opposition",
      "Ces droits peuvent être exercés à tout moment en contactant le responsable du site par e-mail."
    ]
  },
  {
    title: "Modification de la politique de confidentialité",
    texts: [
      "Le responsable du site se réserve le droit de modifier la présente politique de confidentialité à tout moment.",
      "Les utilisateurs sont invités à la consulter régulièrement."
    ],
    spacing: true
  }
];

export const PrivacyPolicyPopup = forwardRef(({ onClose }, ref) => {
  return (
    <Popup ref={ref} onClose={onClose} title="Politique de confidentialité" content={privacyPolicy} />
  );
});
