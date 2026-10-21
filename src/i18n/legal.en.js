import { business, legalNotice, privacyPolicy } from "../data/legal.js";

const contactLinks = [
  { href: `mailto:${business.email}`, text: business.email },
  { href: business.phoneHref, text: business.phone },
];

export const englishLegalNotice = [
  { texts: ["Last updated: 21 October 2026."] },
  {
    title: "Website publisher",
    texts: [
      `${business.name} - Sole trader (Entrepreneur individuel, EI)`,
      business.address,
      legalNotice[1].texts[2],
      "Registered with the French National Business Register (Registre national des entreprises, RNE).",
      `APE business activity code: ${business.ape}. EU VAT number: ${business.vat}.`,
      "Activity: IT consulting and custom software development.",
      "This is an administrative domiciliation address. Meeting arrangements are agreed for each assignment.",
    ],
    links: [...contactLinks, { href: business.site, text: business.site }],
  },
  { title: "Publication director", texts: [business.name] },
  {
    title: "Hosting",
    texts: [
      "This website is hosted on GitHub Pages by GitHub, Inc.",
      "88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, United States.",
    ],
    links: [
      { href: "tel:+18774484820", text: "+1 877 448 4820" },
      { href: "https://support.github.com/", text: "Contact GitHub" },
    ],
  },
  {
    title: "Content and third-party rights",
    texts: [
      "Original texts and materials I create are protected insofar as they meet the requirements of copyright law. Their reuse is subject to statutory exceptions and, where applicable, the relevant licence or permission from the rights holder.",
      "Third-party trademarks, logos, screenshots, photographs and other resources remain subject to the rights of their respective holders. Their presentation does not imply that I own these materials or have a commercial partnership with their owners.",
      "Projects are presented with a description of my contributions. Testimonials and associated portraits are published with the agreement of the people concerned. You can send me requests regarding content or its attribution.",
    ],
    links: contactLinks.slice(0, 1),
  },
  {
    title: "Illustrations",
    texts: [
      "The ONTBO illustration is a conceptual visual. It illustrates a software principle and does not depict physical hardware or a contractual technical architecture.",
    ],
  },
  {
    title: "Fonts and icons",
    texts: [
      "The Manrope font is distributed under the SIL Open Font License 1.1. Lucide icons and the GitHub component from React Simple Icons are subject to their respective licences. The LinkedIn, GitHub and Pappers logos remain trademarks of their respective holders.",
    ],
    links: [
      { href: "/fonts/OFL.txt", text: "Manrope font licence" },
      { href: "/licenses/lucide.txt", text: "Lucide licence" },
      {
        href: "/licenses/react-simple-icons.txt",
        text: "React Simple Icons licence",
      },
    ],
  },
];

export const englishPrivacyPolicy = [
  {
    texts: [
      "Last updated: 21 October 2026.",
      "This policy explains the processing of data associated with browsing the portfolio, contact enquiries and appointment booking.",
    ],
  },
  {
    title: "Data controller",
    texts: [
      `${business.name} - Sole trader (Entrepreneur individuel, EI)`,
      `SIREN: ${business.siren}.`,
      business.address,
    ],
    links: contactLinks,
  },
  {
    title: "Contact enquiries",
    texts: [
      "The form asks for your name, email address and message. These fields are required to use the form and receive a reply. You can also write directly by email or call. Please avoid including sensitive data or confidential information that is unnecessary for an initial exchange.",
      "The information is used to respond to your enquiry, understand your needs and prepare a potential service. Where an individual requests a service for themselves, the steps necessary to prepare the contract are based on Article 6(1)(b) of the GDPR. Other enquiries, including those from company representatives, are based on the legitimate interest in managing professional correspondence (Article 6(1)(f)).",
      "The form does not subscribe you to a newsletter. It is not used for targeted advertising or for automated decision-making that produces legal effects concerning you.",
    ],
  },
  {
    title: "Delivery and recipients",
    texts: [
      "When form submission is enabled, your name, email address and message are sent to EmailJS Pte. Ltd. for delivery to my Gmail inbox. EmailJS acts as a processor for message delivery; Google provides the receiving email service and its associated services.",
      "If form submission is not enabled, the “Continue by email” button prepares a draft in your email application. The website does not then send the message to EmailJS: you choose whether to send it through your own email provider.",
      "Data is not sold or used to enrich an advertising database. I have access to it, as do the providers needed to deliver, receive and secure messages. It may also be disclosed where required by law.",
    ],
    links: [
      {
        href: "https://www.emailjs.com/legal/privacy-policy/",
        text: "EmailJS privacy policy",
      },
      {
        href: "https://policies.google.com/privacy?hl=en",
        text: "Google privacy policy",
      },
    ],
  },
  {
    title: "Message retention",
    texts: [
      "Enquiries that do not lead to further action and their correspondence are deleted no later than 12 months after the last exchange, including from the receiving inbox. If a contractual relationship is established, only necessary records are retained in accordance with the obligations and time limits applicable to the contract, accounting or a dispute, with access restricted to those purposes.",
      "The content you enter remains in the page’s memory during your visit. The website does not save it in a database, cookie or your browser’s persistent storage. A successful submission clears the fields; after an error, their contents remain available so you can try again.",
      "EmailJS states in its privacy policy that activity data for active accounts is retained for 30 days. This technical retention is separate from the retention of messages received in Gmail.",
    ],
  },
  {
    title: "Hosting and security",
    texts: [
      "Browsing the website involves sending technical data to the GitHub Pages hosting provider, including the IP address needed for the connection. GitHub states that it logs and retains visitor IP addresses for security purposes.",
      "This processing enables the provision and security of the website. It serves the legitimate interest in protecting the service and preventing abuse. Technical data is retained by the hosting provider according to its obligations and the criteria in its policy, including the need to maintain security and resolve incidents. I do not use these logs to produce individual browsing statistics.",
    ],
    links: [
      {
        href: "https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages",
        text: "About GitHub Pages",
      },
      {
        href: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement",
        text: "GitHub privacy statement",
      },
    ],
  },
  {
    title: "Transfers outside the European Economic Area",
    texts: [
      "EmailJS states that it hosts its services in the United States and safeguards data transfers through the European Commission’s Standard Contractual Clauses. GitHub and Google may also process data outside the European Economic Area, including in the United States.",
      "Their policies describe the applicable mechanisms, including adequacy decisions where applicable or Standard Contractual Clauses. You can contact me for information about the safeguards relevant to your enquiry or consult the providers’ documents below.",
    ],
    links: [
      {
        href: "https://www.emailjs.com/legal/data-protection-agreement/",
        text: "EmailJS data processing agreement and transfer safeguards",
      },
      {
        href: "https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement#international-data-transfers",
        text: "GitHub international data transfers",
      },
      {
        href: "https://policies.google.com/privacy/frameworks?hl=en",
        text: "Google data transfer safeguards",
      },
    ],
  },
  {
    title: "Cookies, analytics and external resources",
    texts: [
      "This version of the website does not include any audience measurement, advertising tracking or session recording tools. The website does not set any analytics or advertising trackers. Old analytics identifiers present in the browser are removed locally when this version opens, without sending data to the previous provider.",
      "The fonts, images and icons displayed are served with the website. Links to LinkedIn, GitHub, Pappers and Calendly are simple links: they do not load tracking widgets or appointment-booking modules embedded in this page.",
    ],
  },
  {
    title: "Appointments and external links",
    texts: [
      "The appointment link opens the Calendly website. If you choose to book a time slot there, the information you provide is processed by Calendly to arrange the appointment with me, according to its privacy policy. Correspondence necessary for your enquiry follows the same legal bases as contact enquiries. To request the deletion of an appointment or the associated data, contact me.",
      "Other websites opened from this portfolio apply their own privacy rules. Opening them is your choice and may lead to cookies being used or other processing on those websites.",
    ],
    links: [
      {
        href: "https://calendly.com/legal/privacy-notice",
        text: "Calendly privacy notice",
      },
    ],
  },
  {
    title: "Published testimonials and references",
    texts: [
      "Testimonials may include the author’s name, professional role, opinion and portrait. Publication is based on the agreement of the people concerned to present my professional references.",
      "These materials remain published as long as they are relevant and the publication agreement is maintained. The author may request a correction or withdraw that agreement by writing to me, without affecting publication prior to withdrawal.",
    ],
  },
  {
    title: "Your rights and how to exercise them",
    texts: [
      "Under the conditions set out in the GDPR, you may request access to your data, its rectification, erasure or restriction of processing. You may object, on grounds relating to your particular situation, to processing based on legitimate interest.",
      "The right to data portability applies to data you have provided where automated processing is based on a contract or consent. If processing is based on your consent, you may withdraw it at any time without affecting earlier processing.",
      "To exercise your rights or ask a question, contact me by email. A response is normally provided within one month. This period may be extended by two months if the request is complex or there are numerous requests; you will then be informed within the first month. Further information about your identity is requested only where there is reasonable doubt.",
      "You may also lodge a complaint with the French data protection authority, the Commission nationale de l’informatique et des libertés (CNIL).",
    ],
    links: [
      {
        href: `mailto:${business.email}`,
        text: "Exercise my rights",
      },
      {
        href: "https://www.cnil.fr/fr/plaintes",
        text: "Lodge a complaint with the CNIL (French)",
      },
    ],
  },
];

// These assertions are also covered by the content tests. Keep the translated
// sections aligned with the source when legal content changes.
if (privacyPolicy.length !== englishPrivacyPolicy.length) {
  throw new Error("Privacy policy translations are out of sync.");
}
