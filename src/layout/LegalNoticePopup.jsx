import { forwardRef } from "react";
import { Popup } from "@/components/Popup";

const legalNotice = [
  // { title, texts, links, spacing }
  {
    texts: ["Conformément à la loi française, voici les informations légales obligatoires pour mon site."],
    spacing: true
  },
  {
    title: 'Éditeur du site',
    texts: [
      'Pierre Clément',
      'Entreprise Individuelle (994 768 406)',
      '60 rue François Ier, 75008, Paris (FR)'
    ],
    links: [
      { href: 'mailto:pierre.clement.oise@gmail.com', text: 'pierre.clement.oise@gmail.com' },
      { href: 'tel:+330682635025', text: '+33 6 82 63 50 25'},
      { href: 'https://pierre-clement-oise.fr', text: 'https://pierre-clement-oise.fr'}
    ]
  },
  {
    title: 'Directeur de la publication',
    texts: ["Pierre Clément"],
    spacing: true
  },
  {
    title: 'Hébergement du site',
    texts: [
      "GitHub, Inc.",
      "88 Colin P. Kelly Jr Street, San Francisco, CA 94107 (US)"
    ],
    links: [
      {href: "https://enterprise.github.com/contact", text: "https://enterprise.github.com/contact"},
      {href: "https://github.com", text: "https://github.com"}
    ]
  },
  {
    title: "Propriété intellectuelle",
    texts: [
      "L’ensemble des contenus présents sur ce site (textes, images, graphismes, logo, icônes, etc.) est, sauf mention contraire, la propriété exclusive de Pierre Clément.",
      "Les images, logos et captures d’écran de sites présentés dans la section « Projets » ou « Témoignages » demeurent la propriété de leurs auteurs ou entreprises respectives et sont utilisés avec leur autorisation ou à titre de référence professionnelle.",
      "Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans l’autorisation écrite préalable de Pierre Clément."
    ],
    spacing: true
  }
]

export const LegalNoticePopup = forwardRef(({ onClose }, ref) => {
  return (
    <Popup ref={ref} onClose={onClose} title="Mentions légales" content={legalNotice} />
  );
});
