export const legalUpdatedAt = "21 octobre 2026";

export const business = {
  name: "Pierre Clément",
  status: "Entrepreneur individuel (EI)",
  siren: "994 768 406",
  siret: "994 768 406 00013",
  ape: "70.22Z",
  vat: "FR29994768406",
  address: "60 rue François Ier, 75008 Paris, France",
  email: "pierre.clement.oise@gmail.com",
  phone: "+33 6 82 63 50 25",
  phoneHref: "tel:+33682635025",
  site: "https://pierre-clement-oise.fr/",
};

const contactLinks = [
  { href: `mailto:${business.email}`, text: business.email },
  { href: business.phoneHref, text: business.phone },
];

export const legalNotice = [
  { texts: [`Dernière mise à jour : ${legalUpdatedAt}.`] },
  {
    title: "Éditeur du site",
    texts: [
      `${business.name} - ${business.status}`,
      business.address,
      [
        "SIREN : ",
        {
          text: business.siren,
          href: "https://www.pappers.fr/entreprise/994768406",
          noWrap: true,
        },
        ". SIRET : ",
        {
          text: business.siret,
          href: "https://www.pappers.fr/entreprise/994768406",
          noWrap: true,
        },
        ".",
      ],
      "Immatriculation au Registre national des entreprises (RNE).",
      `Code APE : ${business.ape}. TVA intracommunautaire : ${business.vat}.`,
      "Activité : conseil IT et développement de logiciels sur mesure.",
      "Cette adresse est une domiciliation administrative. Les modalités de rencontre sont convenues selon la mission.",
    ],
    links: [...contactLinks, { href: business.site, text: business.site }],
  },
  { title: "Directeur de la publication", texts: [business.name] },
  {
    title: "Hébergement",
    texts: [
      "Le site est hébergé sur GitHub Pages par GitHub, Inc.",
      "88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis.",
    ],
    links: [
      { href: "tel:+18774484820", text: "+1 877 448 4820" },
      { href: "https://support.github.com/", text: "Contacter GitHub" },
    ],
  },
  {
    title: "Contenus et droits des tiers",
    texts: [
      "Les textes et éléments originaux que je crée sont protégés dans la mesure où ils remplissent les conditions du droit d’auteur. Leur réutilisation est soumise aux exceptions légales et, le cas échéant, à la licence applicable ou à l’autorisation du titulaire des droits.",
      "Les marques, logos, captures d’écran, photographies et autres ressources de tiers restent soumis aux droits de leurs titulaires respectifs. Leur présentation n’implique pas que j’en suis propriétaire ni qu’il existe un partenariat commercial.",
      "Les projets sont présentés avec une description de mes contributions. Les témoignages et portraits associés sont publiés avec l’accord des personnes concernées. Vous pouvez m’adresser toute demande concernant un contenu ou son attribution.",
    ],
    links: contactLinks.slice(0, 1),
  },
  {
    title: "Illustrations",
    texts: [
      "L’illustration ONTBO est un visuel conceptuel. Elle illustre un principe logiciel et ne représente pas un matériel physique ou une architecture technique contractuelle.",
    ],
  },
  {
    title: "Polices et icônes",
    texts: [
      "La police Manrope est distribuée sous licence SIL Open Font License 1.1. Les icônes Lucide et le composant GitHub de React Simple Icons sont soumis à leurs licences respectives. Les logos LinkedIn, GitHub et Pappers restent des marques de leurs titulaires.",
    ],
    links: [
      { href: "/fonts/OFL.txt", text: "Licence de la police Manrope" },
      { href: "/licenses/lucide.txt", text: "Licence Lucide" },
      {
        href: "/licenses/react-simple-icons.txt",
        text: "Licence React Simple Icons",
      },
    ],
  },
];

export const privacyPolicy = [
  {
    texts: [
      `Dernière mise à jour : ${legalUpdatedAt}.`,
      "Cette politique explique le traitement des données lié à la consultation du portfolio, aux demandes de contact et à la prise de rendez-vous.",
    ],
  },
  {
    title: "Responsable du traitement",
    texts: [
      `${business.name} - ${business.status}`,
      `SIREN : ${business.siren}.`,
      business.address,
    ],
    links: contactLinks,
  },
  {
    title: "Demandes de contact",
    texts: [
      "Le formulaire demande votre nom, votre adresse email et votre message. Ces champs sont obligatoires pour utiliser le formulaire et permettre une réponse. Vous pouvez également écrire directement par email ou téléphoner. Évitez d’inclure des données sensibles ou des informations confidentielles inutiles au premier échange.",
      "Les informations servent à répondre à votre demande, comprendre votre besoin et préparer une éventuelle prestation. Lorsqu’une personne demande une prestation pour elle-même, les démarches nécessaires à la préparation du contrat reposent sur l’article 6, paragraphe 1, point b du RGPD. Les autres demandes, notamment celles des interlocuteurs d’une entreprise, reposent sur l’intérêt légitime à gérer les échanges professionnels (article 6, paragraphe 1, point f).",
      "Le formulaire ne vous inscrit à aucune newsletter. Il n’est utilisé ni pour la publicité ciblée ni pour une décision automatisée produisant des effets juridiques à votre égard.",
    ],
  },
  {
    title: "Envoi et destinataires",
    texts: [
      "Lorsque le formulaire d’envoi est activé, votre nom, votre email et votre message sont transmis à EmailJS Pte. Ltd. pour leur acheminement vers ma boîte Gmail. EmailJS intervient comme sous-traitant de l’envoi ; Google fournit la messagerie de réception et ses services associés.",
      "Si l’envoi par formulaire n’est pas activé, le bouton « Continuer par email » prépare un brouillon dans votre messagerie. Le site ne transmet alors pas le message à EmailJS : vous choisissez de l’envoyer avec votre propre service de messagerie.",
      "Les données ne sont pas vendues ni utilisées pour enrichir un fichier publicitaire. J’y ai accès, ainsi que les prestataires nécessaires à l’acheminement, la réception et la sécurisation des messages. Elles peuvent également être communiquées lorsque la loi l’exige.",
    ],
    links: [
      {
        href: "https://www.emailjs.com/legal/privacy-policy/",
        text: "Confidentialité EmailJS",
      },
      {
        href: "https://policies.google.com/privacy?hl=fr",
        text: "Confidentialité Google",
      },
    ],
  },
  {
    title: "Conservation des messages",
    texts: [
      "Les demandes sans suite et leurs échanges sont supprimés au plus tard 12 mois après le dernier échange, y compris dans la messagerie de réception. Si une relation contractuelle est établie, seules les pièces nécessaires sont conservées selon les obligations et délais applicables au contrat, à la comptabilité ou à un litige, avec un accès limité à ces finalités.",
      "Le contenu saisi reste dans la mémoire de la page pendant votre visite. Il n’est pas enregistré par le site dans une base de données, un cookie ou le stockage persistant de votre navigateur. Un envoi réussi efface les champs ; après une erreur, leur contenu reste disponible pour vous permettre de réessayer.",
      "EmailJS annonce une conservation de 30 jours des données d’activité des comptes actifs dans sa politique de confidentialité. Cette conservation technique est distincte de celle des messages reçus dans Gmail.",
    ],
  },
  {
    title: "Hébergement et sécurité",
    texts: [
      "La consultation du site implique la transmission de données techniques à l’hébergeur GitHub Pages, notamment l’adresse IP nécessaire à la connexion. GitHub indique journaliser et conserver les adresses IP des visiteurs pour des raisons de sécurité.",
      "Ces traitements permettent la fourniture et la sécurisation du site. Ils répondent à l’intérêt légitime de protéger le service et prévenir les abus. Les données techniques sont conservées par l’hébergeur selon ses obligations et les critères de sa politique, notamment la nécessité d’assurer la sécurité et de résoudre les incidents. Je n’exploite pas ces journaux pour établir des statistiques individuelles de navigation.",
    ],
    links: [
      {
        href: "https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages",
        text: "Informations sur GitHub Pages",
      },
      {
        href: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement",
        text: "Confidentialité GitHub",
      },
    ],
  },
  {
    title: "Transferts hors de l’Espace économique européen",
    texts: [
      "EmailJS indique héberger ses services aux États-Unis et encadrer les transferts de données par les clauses contractuelles types de la Commission européenne. GitHub et Google peuvent également traiter des données hors de l’Espace économique européen, notamment aux États-Unis.",
      "Leurs politiques précisent les mécanismes applicables, dont les décisions d’adéquation lorsqu’elles sont applicables ou les clauses contractuelles types. Vous pouvez me contacter pour obtenir des informations sur les garanties pertinentes pour votre demande ou consulter les documents des prestataires ci-dessous.",
    ],
    links: [
      {
        href: "https://www.emailjs.com/legal/data-protection-agreement/",
        text: "Accord de traitement et garanties de transfert EmailJS",
      },
      {
        href: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement#international-data-transfers",
        text: "Transferts internationaux GitHub",
      },
      {
        href: "https://policies.google.com/privacy/frameworks?hl=fr",
        text: "Garanties de transfert Google",
      },
    ],
  },
  {
    title: "Cookies, statistiques et ressources externes",
    texts: [
      "Cette version du site n’intègre aucun outil de mesure d’audience, de suivi publicitaire ou d’enregistrement de session. Aucun traceur statistique ou publicitaire n’est déposé par le site. Les anciens identifiants analytiques présents dans le navigateur sont supprimés localement à l’ouverture de cette version, sans transmission au précédent prestataire.",
      "Les polices, images et icônes affichées sont servies avec le site. Les liens vers LinkedIn, GitHub, Pappers ou Calendly sont de simples liens : ils ne chargent pas de module de suivi ou de prise de rendez-vous intégré à cette page.",
    ],
  },
  {
    title: "Rendez-vous et liens externes",
    texts: [
      "Le lien de prise de rendez-vous ouvre le site Calendly. Si vous choisissez d’y réserver un créneau, les informations que vous y fournissez sont traitées par Calendly pour organiser le rendez-vous avec moi, selon sa politique de confidentialité. Les échanges nécessaires à votre demande suivent les mêmes bases légales que les demandes de contact. Pour demander la suppression d’un rendez-vous ou des données correspondantes, contactez-moi.",
      "Les autres sites ouverts depuis ce portfolio appliquent leurs propres règles de confidentialité. Leur ouverture est à votre initiative et peut entraîner l’utilisation de cookies ou d’autres traitements sur ces sites.",
    ],
    links: [
      {
        href: "https://calendly.com/legal/privacy-notice",
        text: "Confidentialité Calendly",
      },
    ],
  },
  {
    title: "Témoignages et références publiées",
    texts: [
      "Les témoignages peuvent comporter le nom de leur auteur, sa fonction professionnelle, son avis et son portrait. Leur publication repose sur l’accord des personnes concernées pour présenter mes références professionnelles.",
      "Ces éléments restent publiés tant qu’ils sont pertinents et que l’accord de publication est maintenu. Leur auteur peut demander une rectification ou retirer cet accord en m’écrivant, sans remettre en cause les publications antérieures au retrait.",
    ],
  },
  {
    title: "Vos droits et leur exercice",
    texts: [
      "Selon les conditions prévues par le RGPD, vous pouvez demander l’accès à vos données, leur rectification, leur effacement ou la limitation de leur traitement. Vous pouvez vous opposer, pour des raisons tenant à votre situation particulière, aux traitements fondés sur l’intérêt légitime.",
      "Le droit à la portabilité s’applique aux données que vous avez fournies lorsque le traitement automatisé repose sur le contrat ou le consentement. Si un traitement repose sur votre consentement, vous pouvez le retirer à tout moment, sans remettre en cause les opérations antérieures.",
      "Pour exercer vos droits ou poser une question, contactez-moi par email. Une réponse est apportée en principe dans un délai d’un mois. Ce délai peut être prolongé de deux mois si la demande est complexe ou si les demandes sont nombreuses ; vous en êtes alors informé dans le premier mois. Une précision sur votre identité n’est demandée qu’en cas de doute raisonnable.",
      "Vous pouvez également adresser une réclamation à la Commission nationale de l’informatique et des libertés (CNIL).",
    ],
    links: [
      {
        href: `mailto:${business.email}`,
        text: "Exercer mes droits",
      },
      {
        href: "https://www.cnil.fr/fr/plaintes",
        text: "Adresser une réclamation à la CNIL",
      },
    ],
  },
];
